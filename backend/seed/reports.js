'use strict';

const Promise = require('bluebird');

const { Reports, sequelize } = require('../db');

const reports = [{
    "emergency": true,
    "latitude": "40.800542",
    "longitude": "-73.956676",
    "building": "225 WEST 110 STREET",
    "floor": 5,
    "resource": "police",
    "issue": "theft",
    "details": "wallet gone from my desk.",
    "status": "resolved",
    "mobile": "6467778888",
    "name": "Marsha No-Wallet"
},
{
    "emergency": true,
    "latitude": "40.768568",
    "longitude": "-73.960491",
    "building": "211 EAST 70 STREET",
    "floor": 15,
    "resource": "police",
    "issue": "fight",
    "details": "the IT guys are fighting again!",
    "status": "resolved",
    "mobile": "6467779999",
    "name": "Ivanna B'Cool"
},
{
    "emergency": true,
    "latitude": "40.767351",
    "longitude": "-73.983301",
    "building": "309 WEST 57 STREET",
    "floor": 0,
    "resource": "police",
    "issue": "fight",
    "details": "fight in the lobby",
    "status": "pending",
    "mobile": "6468889999",
    "name": "Susan O'Notsafe"
},
{
    "emergency": true,
    "latitude": "40.804031",
    "longitude": "-73.967930",
    "building": "311 WEST 109 STREET",
    "floor": 2,
    "resource": "fire",
    "issue": "Hot",
    "details": "it is smokey i'm passing out now bye.",
    "status": "resolved",
    "mobile": "0987654321",
    "name": "Barbara McHottoes"
},
{
    "emergency": true,
    "latitude": "40.867641",
    "longitude": "-73.929092",
    "building": "269 DYCKMAN STREET",
    "floor": 1,
    "resource": "fire",
    "issue": "smoke",
    "details": "my dog is in there",
    "status": "pending",
    "mobile": "9187098963",
    "name": "Gloria Sunrise"
},
{
    "emergency": true,
    "latitude": "40.757390",
    "longitude": "-73.981246",
    "building": "59 WEST 46 STREET",
    "floor": 21,
    "resource": "medical",
    "issue": "coronary",
    "details": "my moms having a heart attack room 204",
    "status": "resolved",
    "mobile": "5554890010",
    "name": "Mark Thisspot"
},{
    "emergency": true,
    "latitude": "40.758129",
    "longitude": "-73.972245",
    "building": "345 PARK AVENUE",
    "floor": 34,
    "resource": "medical",
    "issue": "accident",
    "details": "burn from burst pipe in boiler room",
    "status": "dispatched",
    "mobile": "6197852893",
    "name": "Bill Lange"
},
{
    "emergency": true,
    "latitude": "40.741135",
    "longitude": "-74.008047",
    "building": "848 WASHINGTON STREET",
    "floor": 18,
    "resource": "medical",
    "issue": "stroke",
    "details": "husband cant feel left side. hurry room 1848",
    "status": "dispatched",
    "mobile": "2122225533",
    "name": "Tara Tactyl"
},
{
    "emergency": true,
    "latitude": "40.741135",
    "longitude": "-74.008047",
    "building": "848 WASHINGTON STREET",
    "floor": 18,
    "resource": "medical",
    "issue": "stroke",
    "details": "i think my husband is having a stroke",
    "status": "resolved",
    "mobile": "2122225533",
    "name": "Tara Tactyl"
},
{
    "emergency": true,
    "latitude": "40.758048",
    "longitude": "-73.986395",
    "building": "1515 BROADWAY",
    "floor": 0,
    "resource": "medical",
    "issue": "accident",
    "details": "guy bleeding on sidewalk outside front entrance",
    "status": "pending",
    "mobile": "7184659826",
    "name": "Al Goodman"
}];

sequelize.sync()
	.then(() => console.log('DB synced.'))
	.then(() => postReportsRecursively(reports))
	.then(() => Reports.findAll())
	.then(reports => console.log(`${reports.length} created. Ex: ${reports[0].get()}`))
	.catch(err => console.log(`Error creating reports: ${err}`));


async function postReportsRecursively(reports) {

	async function recurseCreate(reports) {
		await Reports.create(reports[0]);

		reports = reports.slice(1);
		console.log('batch in! To go:', reports.length);

		if (reports.length) {
			await Promise.delay(200);
			return recurseCreate(reports);
		}
        console.log('Reports seed complete!');
		process.exit();

	}

	await Reports.truncate();
	recurseCreate(reports);
}

