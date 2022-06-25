const express = require("express");
const google = require("googleapis");

const router = express.Router();

/* GET users listing. */
router.get("/view", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/", (req, res, next) => {
  res.send({ redirectURL: urlGoogle() });
});

const googleConfig = {
  clientId: process.env.ClientID,
  clientSecret: process.env.ClientSecret,
  redirect: process.env.RedirectURI,
};

const createConnection = () => {
  return new google.google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    acces_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
};

const urlGoogle = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

const getGoogleAccountFromCode = async (code, response) => {
  const auth = createConnection();

  const { tokens } = await auth.getToken(code);

  auth.setCredentials(tokens);
  request(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.id_token}`,
    { json: true },
    (err, res, body) => {
      if (err)
        response
          .status(500)
          .send(`some unexpected/uncaught async exception is thrown ${err}`);
      userData = body;
      response.redirect("/data");
    }
  );
};

module.exports = router;
