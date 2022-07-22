const express = require("express");
const googleUserSchema = require("../schemas/googleUser.schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const userFromDB = await googleUserSchema.findOne({ sub: req.query.sub });
  res.send(userFromDB).sendStatus(200);
});

module.exports = router;
