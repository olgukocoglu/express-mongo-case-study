const mongoose = require('mongoose');
const records = mongoose.model('records');

module.exports.getRecords = function(req, res, next) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var minCount = req.body.minCount;
    var maxCount = req.body.maxCount;
  
    records.aggregate([
      {
        "$addFields": {
          "totalCount": {
            "$reduce": {
              "input": "$counts",
              "initialValue": 0,
              "in": { "$add" : ["$$value", "$$this"] }
            }
          }
        }
      },
      { 
        "$match": { "createdAt": { "$gte": startDate, "$lte": endDate } },
        "$match": { "totalCount": { "$gte": minCount, "$lte": maxCount } }
      }
    ], function (err, record) {
      if(err)
        return res.status(400).send({ message: err.message });
      return res.send(record);
    })
}