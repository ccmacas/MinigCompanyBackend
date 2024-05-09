const express = require('express');
const dbConnection = require('../database/Config');
const MaterialController = require("../controllers/MaterialController");

const router = express.Router();

router.get("/Materiales/",MaterialController.materiales)
router.post("/AddMaterial",MaterialController.addMaterial)
router.put("/UpdateMaterial",MaterialController.UpdateMaterial)
router.delete("/DeleteMaterial/:id",MaterialController.destroyMaterial)
module.exports = router;