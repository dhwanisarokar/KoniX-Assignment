const express = require("express");

const { uploadCSV, getBalance } = require("../controllers/trade.controllers.js");
const upload = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/balance", getBalance);

module.exports = router;
