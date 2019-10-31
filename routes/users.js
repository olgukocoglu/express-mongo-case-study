var express = require('express');
var router = express.Router();

const request = mongoose.model('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  debugger;
  const surveys = Survey.find();
  
});

module.exports = router;
