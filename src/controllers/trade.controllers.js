const httpStatus = require("http-status");
const path = require("path");

const {
  readCSVFile,
  getAssetWiseBalance,
} = require("../service/trade.service.js");
const catachAsync = require("../utils/catchAsync.js");

const uploadCSV = catachAsync(async function (req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded. Please upload a CSV file." });
  }

  const filePath = path.join(__dirname, "../../", req.file?.path);
  readCSVFile(filePath);

  res
    .status(httpStatus.CREATED)
    .json({ message: "CSV data successfully uploaded and stored" });
});

const getBalance = catachAsync(async (req, res) => {
  const { timestamp } = req.query;
  if (!timestamp) {
    return res.status(400).json({ message: "timestamp is required" });
  }
  const balance = await getAssetWiseBalance(timestamp);

  res.status(httpStatus.OK).send(balance);
});

module.exports = {
  uploadCSV,
  getBalance,
};
