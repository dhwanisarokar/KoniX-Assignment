const express = require("express");
// const httpStatus = require("http-status");
// const router = require("./routes/v1");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// routes
// app.use("/v1", router);


module.exports = app;