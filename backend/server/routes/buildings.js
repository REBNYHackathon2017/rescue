const router = require('express').Router();
const proj4 = require('proj4');

const { Buildings } = require('../../db');
const { 
	communication: { getNearestZipcodes },
	helpers: { getDistanceBetween }
} = require('../../modules');

proj4.defs('EPSG:2263', '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs');

// 335 Madison is 40.753760, -73.978064
router.get('/near', (req, res, next) => {
	let { lat, lng } = req.query;
	lat = Number(lat);
	lng = Number(lng);
	const [ x1, y1 ] = proj4('WGS84', 'EPSG:2263', [ lng, lat ]);

	getNearestZipcodes(lat, lng)
		.then(zipCodes => Buildings.findAllWithinZips(zipCodes))
		.then(buildings => {
			// add distance from given location to building object
			return buildings.map(b => {
				b.distance = getDistanceBetween(x1, y1, b.xCoord, b.yCoord)  // x1, y1, x2, y2
				return b;
			});
		})
		.then(buildings => buildings.sort((a, b) => a.distance - b.distance))
		.then(sortedByDistance => sortedByDistance.slice(0, 10))
		.then(closestTen => res.status(200).json(closestTen))
		.catch(next);
});


module.exports = router;
