const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a021d913c0ce6e7bc61b70b25d809b7d&query=${longitude},${latitude}&units=m`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } =
        response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;

// request({ url, json: true }, (error, response) => {
//   if (error) {
//     console.log(error.code);
//   } else if (response.body.error) {
//     console.log("Unabled to find location");
//   } else {
//     const { temperature, feelslike, weather_descriptions } =
//       response.body.current;
//     console.log(
//       `${weather_descriptions[0]} It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
//     );
//   }
// });
