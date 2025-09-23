const express = require("express");

const itemController = require("../controller/itemController");

const router = express.Router();

router.route("/").get(itemController.getItems).post(itemController.addItem);

module.exports = router;
