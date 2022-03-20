const ApiError = require("../response_models/api_error");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const tokenString = req.headers.authorization;

  if (tokenString === undefined) {
    return next(ApiError.unauthorized());
  }

  const start = tokenString.split(" ")[0];
  const token = tokenString.split(" ")[1];

  if (start != "Bearer") {
    return next(ApiError.unauthorized());
  }

  if (token === undefined) {
    return next(ApiError.unauthorized());
  }

  const customer = jwt.verify(token, process.env.JWT_SECRET);

  if (customer === null || customer === undefined) {
    return next(ApiError.unauthorized());
  }

  delete customer.iat

  req.customer = customer;

  next();
};
