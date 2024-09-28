const express = require("express");
const multer = require("multer");

const { uploadCSV, getBalance } = require("../controllers/trade.contollers.js");

const router = express.Router();

// Multer config to store uploaded files in 'uploads/' directory
const upload = multer({ dest: 'src/uploads/' });

router.post('/upload', upload.single('file'), uploadCSV);
router.get('/balance', getBalance);

module.exports = router;
