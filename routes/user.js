const express = require("express");
const googleUserSchema = require("../schemas/googleUser.schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const userFromDB = await googleUserSchema.findOne({ sub: req.query.sub });
  res.status(200).send(userFromDB);
});

module.exports = router;
