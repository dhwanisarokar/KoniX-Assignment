const httpStatus = require("http-status");
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

  const path = req.file?.path;
  const filePath = path.join(__dirname, "../../", path);
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
