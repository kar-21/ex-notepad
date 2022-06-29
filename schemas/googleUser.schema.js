const { Schema, model } = require("mongoose");

const GoogleUserSchema = new Schema({
  iss: String,
  azp: String,
  aud: String,
  sub: String,
  email: String,
  email_verified: String,
  at_hash: String,
  name: String,
  picture: String,
  given_name: String,
  family_name: String,
  locale: String,
  iat: String,
  exp: String,
  alg: String,
  kid: String,
  typ: String,
});

module.exports = model("google-users", GoogleUserSchema);
