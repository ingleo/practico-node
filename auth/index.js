const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error("No puedes hacer esto", 401);
    }
  },
  logged: function (req) {
    decodeHeader(req);
  },
};

const getToken = (auth) => {
  if (!auth) {
    throw error("No viene token", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("Formato inválido", 400);
  }
  let token = auth.replace("Bearer ", "");

  return token;
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
};

module.exports = {
  sign,
  check,
};
