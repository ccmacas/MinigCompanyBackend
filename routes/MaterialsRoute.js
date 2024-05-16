const express = require('express');
const dbConnection = require('../database/Config');
const MaterialController = require("../controllers/MaterialController");

const router = express.Router();

router.get("/Materiales/",MaterialController.materiales)
router.get("/MaterialCategoria/:categoria",MaterialController.materialesCategoria)
router.get("/Material/:material_ID",MaterialController.materialID)
router.post("/AddMaterial",MaterialController.addMaterial)
router.put("/UpdateMaterial",MaterialController.UpdateMaterial)
router.delete("/DeleteMaterial/:id",MaterialController.destroyMaterial)
router.post("/AddSalida",MaterialController.AddMaterialSalida)
router.get("/AllEntradas/:material_ID",MaterialController.allInputs)
router.post("/AllSalidas/:material_ID",MaterialController.allOutputs)

module.exports = router;