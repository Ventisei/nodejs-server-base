const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaultController");

router.get("/default", defaultController.defaultRoute);

module.exports = router;