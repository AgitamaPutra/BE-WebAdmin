const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader, "INI AUTH HEADERRRRR")
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  console.log(token, "INI TOKENNNNNNNNNNNNNNN")
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "kodingakademihuhu");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // if (!decodedToken) {
  //   const error = new Error("Not authenticated");
  //   error.statuscode = 401;

  //   throw error;
  // }
  console.log(decodedToken, "TOKENNNNNNNNNNNNNN");
  req.userId = decodedToken.userId;
  next();
};
