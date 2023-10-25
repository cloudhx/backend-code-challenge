const cityService = require("../services/city.service");
const taskService = require("../services/task.service");
const { Readable } = require("stream");

function getByTag(req, res, next) {
  try {
    res.json({
      cities: cityService.getCitiesByTag(req.query.tag, req.query.isActive),
    });
  } catch (err) {
    next(err);
  }
}

function getDistance(req, res, next) {
  try {
    const fromCity = cityService.getCityByGuid(req.query.from);
    const toCity = cityService.getCityByGuid(req.query.to);
    const distanceWithUnit = cityService.getDistanceBetweenCities(
      fromCity,
      toCity
    );
    res.json({
      from: fromCity,
      to: toCity,
      ...distanceWithUnit,
      distance: Number(distanceWithUnit.distance.toFixed(2)),
    });
  } catch (err) {
    next(err);
  }
}

function getInAreaTask(req, res, next) {
  try {
    const fromCity = cityService.getCityByGuid(req.query.from);
    const task = taskService.createTask(
      cityService.getCitiesInArea,
      fromCity,
      req.query.distance
    );

    const protocol = req.protocol;
    const host = req.get("host");
    const serverUrl = `${protocol}://${host}`;

    res
      .status(202)
      .json({ resultsUrl: `${serverUrl}/area-result/${task.guid}` });
  } catch (err) {
    next(err);
  }
}

function getInAreaResult(req, res, next) {
  try {
    const task = taskService.getTask(req.params.taskGuid);
    if (task) {
      if (task.completed) {
        res.json({ cities: task.result });
      } else {
        res.sendStatus(202);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
}

function getAll(req, res, next) {
  try {
    const jsonData = cityService.getAllCities();
    const jsonStream = new Readable();
    jsonStream._read = function () {
      this.push(JSON.stringify(jsonData));
      this.push(null);
    };
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
    jsonStream.pipe(res);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getByTag,
  getDistance,
  getInAreaTask,
  getInAreaResult,
  getAll,
};
