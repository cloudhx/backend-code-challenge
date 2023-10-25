const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city.controller");

router.get("/cities-by-tag", cityController.getByTag);
router.get("/distance", cityController.getDistance);
router.get("/area", cityController.getInAreaTask);
router.get("/area-result/:taskGuid", cityController.getInAreaResult);
router.get("/all-cities", cityController.getAll);

module.exports = router;
