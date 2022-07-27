const googleUserSchema = require("../schemas/googleUser.schema");

exports.getUserDetails = async (req, res, next) => {
  const userFromDB = await googleUserSchema.findOne({ sub: req.query.sub });
  res.status(200).send(userFromDB);
};
