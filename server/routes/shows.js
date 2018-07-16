const express = require("express");
const router = express.Router();
const showsController = require("../controllers/shows");

router.get('/', showsController.index);

module.exports = router;