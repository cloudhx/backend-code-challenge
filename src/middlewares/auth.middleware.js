const API_TOKEN = "dGhlc2VjcmV0dG9rZW4=";

function extractToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

function verifyToken(req, res, next) {
  if (req.token === API_TOKEN) {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = [extractToken, verifyToken];
