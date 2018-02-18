'use strict';

const Promise = require('bluebird');

const Bytes = require('nyc-bytes');
const proj4 = require('proj4');
const request = require('request');

const { Buildings, sequelize } = require('../db');

/*
	Basic Signature
	proj4(fromProjection[, toProjection, coordinates])
*/

const dataset = Bytes.Pluto;

proj4.defs('EPSG:2263', '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs');

dataset.init()
	.then(() => {
	  	console.log('Dataset ready.');

	  	let buildings = [[]];
		const stream = dataset.stream({ boroughs: ['MN'], sanitize: true });

	  	stream.on('data', ({ Address, NumFloors, XCoord, YCoord, ZipCode, OwnerName, HealthArea, PolicePrct, FireComp } = {}) => {
	  		const numberOfFloors = Math.floor(Number(NumFloors));
	  		if (Address === '655 MADISON AVENUE') ZipCode = 10065;
	  		if (XCoord && YCoord && ZipCode && Address && numberOfFloors > 0) {

	  			// Entry for the db (add zip and district)
	  			const building = {
	  				address: Address.trim(),
	  				numberOfFloors,
	  				xCoord: Number(XCoord),
	  				yCoord: Number(YCoord),
	  				zip: Number(ZipCode),
	  				ownerName: OwnerName,
	  				healthArea: HealthArea,
	  				policePrecinct: PolicePrct,
	  				fireCompany: FireComp
	  			}

	  			if (buildings[buildings.length - 1].length < 500) buildings[buildings.length - 1].push(building);
	  			else buildings.push([ building ]);
	  		}
	  	});

	  	stream.on('end', async () => {
	  		console.log(`\nGot ${buildings.length} batches to insert in DB!`);
	  		buildings = addLatLong(buildings);

	  		await postBuildingsRecursively(buildings);
	  		console.log('\nBuilding seed complete!');
	  	});

	})
	.catch(console.error);

function addLatLong(ddBuildingsArr) {
	return ddBuildingsArr.map(buildingsArr => {
		return buildingsArr.map(building => {
			const [ longitude, latitude ] = proj4('EPSG:2263', 'WGS84', [ building.xCoord, building.yCoord ]);
			// console.log(building.address)
			if (building.address === '655 MADISON AVENUE') console.log('lng', longitude, 'lat', latitude);
			return Object.assign({}, building, { longitude, latitude });
		});
	});
}


async function postBuildingsRecursively(buildings) {

	async function recurseCreate(batches) {
		try {		
			await Buildings.bulkCreate(batches[0]);

			batches = batches.slice(1);
			console.log('batch in! To go:', batches.length);

			if (batches.length) {
				await Promise.delay(200);
				return recurseCreate(batches);
			}
	        console.log('Buildings seed complete!');
			process.exit();
		} catch(err) {
			console.log('Error inserting buildings', err);
			process.exit();
		}

	}

	await Buildings.sync({ force: true });
	recurseCreate(buildings);
}



