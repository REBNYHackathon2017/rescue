'use strict';

const request = require('request');
const fs = require('fs');


exports.rp = options => {
    return new Promise((resolve, reject) => {
        request(options, (err, { body } = {}) => {
            if (err) return reject(err);
            
            let toResolve;
            try {
                toResolve = typeof body === 'object' ? body : JSON.parse(body);
            } catch(err) {
                console.log(`Failed to JSON Parse API response body: ${body} with error: ${err}`);
            }
            resolve(toResolve);
        });
    });
};



exports.getNearestZipcodes = async (lat, lng) => {
    try {
        const data = await exports.rp({
            method : 'GET',
            uri : `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lng}&radius=1&maxRows=3&username=willzj`
        });
        return data.postalCodes.map(({ postalCode }) => Number(postalCode))
    } catch (err) {
        console.log('Err getting nearest zipcodes', err)
    }
};


