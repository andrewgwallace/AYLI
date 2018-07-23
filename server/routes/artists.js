const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artists");

router.get("/", artistsController.index);

module.exports = router;
