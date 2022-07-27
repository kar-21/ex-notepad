const express = require("express");

const loginController = require("../controller/login.controller");

const router = express.Router();

router.get("/", loginController.loginUrl);

router.get("/redirectURI", loginController.getGoogleAccount);

module.exports = router;
