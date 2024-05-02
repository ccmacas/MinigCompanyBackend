const express = require('express');
const dbConnection = require('../database/Config');
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/Registro",AuthController.register)
router.post("/login",AuthController.login)

module.exports = router;