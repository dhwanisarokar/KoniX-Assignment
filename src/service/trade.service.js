const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Trade = require("../models/trade.model.js");
const ApiError = require("../utils/ApiError.js");
const httpStatus = require("http-status");

const readCSVFile = (filePath) => {
  
  const fileRows = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const [baseCoin, quoteCoin] = row["Market"].split("/");
      fileRows.push({
        utcTime: new Date(row["UTC_Time"]),
        operation: row["Operation"],
        baseCoin,
        quoteCoin,
        amount: parseFloat(row["Buy/Sell Amount"]),
        price: parseFloat(row["Price"]),
      });
    })
    .on("end", async () => {
      try {
        await Trade.insertMany(fileRows);
        fs.unlinkSync(filePath); // Clean up the uploaded file
      } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to store data in DB")
      }
    });
};

const getAssetWiseBalance = async (timestamp) => {
  try {
    const trades = await Trade.find({
      utcTime: { $lte: new Date(timestamp) },
    });
    if(!trades) {
      throw new ApiError(httpStatus.NOT_FOUND, "No trades found for this timestamp.")
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch trades.")
  }

  const balance = trades.reduce((acc, trade) => {
    const sign = trade.operation.toLowerCase() === 'buy' ? 1 : -1;  // 'buy' adds, 'sell' subtracts
    if (!acc[trade.baseCoin]) acc[trade.baseCoin] = 0;
    acc[trade.baseCoin] += sign * trade.amount;  // Add/subtract based on the operation type
    return acc;
  }, {});

  return balance;
};

module.exports = {
  readCSVFile,
  getAssetWiseBalance,
};
