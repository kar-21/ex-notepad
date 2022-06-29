const express = require("express");
const { google } = require("googleapis");
const request = require("request");
const jwt = require("jsonwebtoken");

const googleUserSchema = require("../schemas/googleUser.schema");

const router = express.Router();

router.get("/view", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/", (req, res, next) => {
  res.send({ redirectURL: urlGoogle() });
});

router.get("/redirectURI", (req, res, next) => {
  getGoogleAccountFromCode(req.query.code, res);
});

const createConnection = () => {
  return new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
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
    async (err, res, body) => {
      if (err)
        response
          .status(500)
          .send(`some unexpected/uncaught async exception is thrown ${err}`);
      console.log(">>> userData", body);
      let token;
      const userFromDB = await googleUserSchema.findOne({ sub: body.sub });
      if (!userFromDB) {
        const userInfo = new googleUserSchema({ ...body });
        await userInfo.save();
        token = jwt.sign(
          { userId: body.sub, givenName: body.givenName },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
      } else {
        console.log(">>> user found");
        token = jwt.sign(
          { userId: userFromDB.sub, givenName: userFromDB.givenName },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
      }
      console.log(">>>", process.env.NODE_ENV === "development");
      response.redirect(
        process.env.NODE_ENV === "development"
          ? `${process.env.FRONTEND_API_LOCAL}/token/?token=${token}`
          : `${process.env.FRONTEND_API_PROD}/token/?token=${token}`
      );
    }
  );
};

module.exports = router;
