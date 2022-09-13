const googleUserSchema = require("../schemas/googleUser.schema");

exports.getUserDetails = async (req, res, next) => {
  console.log(">>", req.query.sub);
  if (req.query.sub) {
    const userFromDB = await googleUserSchema.findOne({ sub: req.query.sub });
    if (userFromDB) res.status(200).send(userFromDB);
    else res.status(404).send("User not Found");
  } else res.status(400).send('No Sub found in params');
};
