const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidG9ybmlrZW1hY2hlIiwiYSI6ImNreG5mdXlmNDBtcXkzMWp2dzZzZmdtNnYifQ._vFO28w98aebbUzdaZdEYg&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response?.body?.features?.length === 0) {
      callback("Unable to find location. try something else", undefined);
    } else {
      const [longitude, latitude] = response.body.features[0].center;
      const location = response.body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;

// const geocodeUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidG9ybmlrZW1hY2hlIiwiYSI6ImNreG5mdXlmNDBtcXkzMWp2dzZzZmdtNnYifQ._vFO28w98aebbUzdaZdEYg&limit=1";
// request({ url: geocodeUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to location services");
//   } else if (response.body.features === 0) {
//     console.log("Unabled to find location, try another search");
//   } else {
//     const [long, lat] = response.body.features[0].center;
//     console.log(`latitude: ${lat}, Long: ${long}`);
//   }
// });
