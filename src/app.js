const express = require("express");
const { errorHandler } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError.js");
const httpStatus = require("http-status");
const router = require("./routes/trade.routes.js");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/trades", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// golab Error Middleware
app.use(errorHandler);


module.exports = app;
