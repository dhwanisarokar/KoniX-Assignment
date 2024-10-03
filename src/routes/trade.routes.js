const express = require("express");
const multer = require("multer");

const { uploadCSV, getBalance } = require("../controllers/trade.contollers.js");
const ApiError = require("../utils/ApiError.js");

const router = express.Router();

// Multer config to store uploaded files in 'uploads/' directory
const upload = multer({
  dest: "src/uploads/", // Directory where the files will be temporarily stored
  limits: { fileSize: 1024 * 1024 }, // File size limit of 1 MB
  fileFilter: (req, file, cb) => {
    // Only accept .csv files
    if (file.mimetype !== "text/csv") {
      return cb(new ApiError(400, "Only CSV files are allowed!"), false);
    }
    cb(null, true);
  },
});

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/balance", getBalance);

module.exports = router;
