const httpStatus = require("http-status");
const {
  readCSVFile,
  getAssetWiseBalance,
} = require("../service/trade.service.js");
const catachAsync = require("../utils/catchAsync.js");
const ApiError = require("../utils/ApiError.js");

const uploadCSV = catachAsync(async function (req, res) {
  const path = req.file?.path;

  if (!path) {
    res.status(httpStatus.NOT_FOUND).send("CSV file is required");
  }
  readCSVFile(path);

  res
    .status(httpStatus.CREATED)
    .json({ message: "CSV data successfully uploaded and stored" });
});

const getBalance = catachAsync(async (req, res) => {
  const { timestamp } = req.query;
   
  const balance = await getAssetWiseBalance(timestamp);

  res.status(httpStatus.OK).send(balance);
});

module.exports = {
  uploadCSV,
  getBalance,
};
