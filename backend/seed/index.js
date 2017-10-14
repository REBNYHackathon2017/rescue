const Bytes = require('nyc-bytes');
const proj4 = require('proj4');
const request = require('request');

const { Buildings, sequelize } = require('../db');
const { helpers: { delay } } = require('../modules');

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
	  		if (Address === '335 MADISON AVENUE') console.log('ITTT', Address, NumFloors, XCoord, YCoord, ZipCode, OwnerName, HealthArea, PolicePrct, FireComp);
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

	  	stream.on('end', () => {
	  		console.log(`\nGot ${buildings.length} buildings!`);
	  		buildings = addLatLong(buildings);

	  		postBuildingsRecursively(buildings)
	  			.then(() => console.log('\nDone!'))
	  			.catch(err => console.log('Error POSTing buildings to db: ', err));
	  	});

	})
	.catch(console.error);

function addLatLong(ddBuildingsArr) {
	return ddBuildingsArr.map(buildingsArr => {
		return buildingsArr.map(building => {
			const [ longitude, latitude ] = proj4('EPSG:2263', 'WGS84', [ building.xCoord, building.yCoord ]);
			building.latitude = latitude;
			building.longitude = longitude;
			return building;
		});
	});
}

function postBuildingsRecursively(buildings) {

	function recurseCreate(batches) {
		Buildings.bulkCreate(batches[0])
			.then(() => {
				console.log('batch in! To go:', batches.length - 1);
				batches = batches.slice(1);
				if (batches.length) {
					return delay(200)
						.then(() => recurseCreate(batches));
				}
				return Promise.resolve();
			});
	}

	return Buildings.sync({ force: true })
		.then(() => recurseCreate(buildings));
}



