const config = require("../config/config");

// Send response on errors
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    status: 'error',
    statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
