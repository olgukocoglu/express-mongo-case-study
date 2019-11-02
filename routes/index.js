const express = require('express');
const router = express.Router();
const recordController = require("../controllers/RecordController");

router.post('/GetRecords', recordController.GetRecords);

module.exports = router;
