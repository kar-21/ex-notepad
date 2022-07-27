const express = require("express");

const notepadController = require("../controller/notepad.controller");

const router = express.Router();

router.post("/:userId", notepadController.postNote);

router.patch("/:userId", notepadController.patchNote);

router.get("/:userId", notepadController.getNotes);

module.exports = router;
