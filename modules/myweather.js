'use strict'

const axios = require('axios');


class Forecast {
  construction(weatherObject) {
    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }
}

async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;

  // let params = {
  //   lat: lat,
  //   lon: lon,
  //   days: 5,
  //   key: process.env.WEATHER_API_KEY,
  //   baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
  // };
  //route request for lat and lon option
  try {
    let weatherData = await axios(config);
    let weatherDataResults = weatherData.data.data.map(item => new Forecast(item));
    response.send(weatherDataResults);
  }
  catch (err) {
    Promise.resolve().then(() => {
      throw new Error(err.message);
    }).catch(next);
  }
}

module.exports = getWeather;