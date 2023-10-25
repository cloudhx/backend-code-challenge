const dbService = require("./db.service");
const helper = require("../utils/helper.util");

function getCityByGuid(guid) {
  return dbService.getCityByGuid(guid);
}

function getCitiesByTag(tag, isActive = true) {
  return dbService.getCitiesByTag(tag, JSON.parse(isActive));
}

function getDistanceBetweenCities(fromCity, toCity) {
  const distanceWithUnit = helper.calculateDistance(
    fromCity.latitude,
    fromCity.longitude,
    toCity.latitude,
    toCity.longitude
  );

  return distanceWithUnit;
}

function getCitiesInArea(fromCity, distance) {
  const allCities = dbService.getAllCities();
  const citiesInArea = allCities.reduce((accumulator, currentValue) => {
    if (currentValue.guid !== fromCity.guid) {
      const distanceWithUnit = helper.calculateDistance(
        fromCity.latitude,
        fromCity.longitude,
        currentValue.latitude,
        currentValue.longitude
      );
      if (distanceWithUnit.distance <= distance) {
        accumulator.push(currentValue);
      }
    }
    return accumulator;
  }, []);
  return citiesInArea;
}

function getAllCities() {
  return dbService.getAllCities();
}

module.exports = {
  getCityByGuid,
  getCitiesByTag,
  getDistanceBetweenCities,
  getCitiesInArea,
  getAllCities,
};
