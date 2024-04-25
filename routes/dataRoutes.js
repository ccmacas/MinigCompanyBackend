const express = require('express');
const dbConnection = require('./../database/Config');
const MaterialController = require("../controllers/MaterialController");

const router = express.Router();

router.get("/Materiales/",MaterialController.materiales)
router.post("/AddMaterial",MaterialController.addMaterial)


module.exports = router;