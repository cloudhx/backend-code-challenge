const jsonData = require("../data/addresses.json");

function getCityByGuid(guid) {
  return jsonData.find((item) => item.guid === guid);
}

function getCitiesByTag(tag, isActive) {
  return jsonData.filter(
    (item) => item.tags.includes(tag) && item.isActive === isActive
  );
}

function getCityByGuid(guid) {
  return jsonData.find((item) => item.guid === guid);
}

function getAllCities() {
  return jsonData;
}

module.exports = { getCityByGuid, getCitiesByTag, getCityByGuid, getAllCities };
