const config = require("../config/config");

// Send response on errors
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  console.error(err);

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
