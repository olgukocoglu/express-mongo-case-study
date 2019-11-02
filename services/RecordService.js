const mongoose = require('mongoose');
const records = mongoose.model('records');

module.exports.GetRecords = function(query) {
    return new Promise(function(resolve){
        records.aggregate([
            {
                $addFields: {
                    totalCount: {
                        $reduce: {
                            input: "$counts",
                            initialValue: 0,
                            in: { $add : ["$$value", "$$this"] }
                        }
                    }
                }
            },
            { 
                $match: {
                    $and: [
                        { createdAt: { $gte: query.startDate, $lte: query.endDate } },
                        { totalCount: { $gte: query.minCount, $lte: query.maxCount } }
                    ]
                }
            },
            { 
                $project: {
                    _id: 0,
                    value: 0,
                    counts: 0
                }
            },
        ], function (err, records) {
            if(err)
                resolve({ code: -100, msg: "Unknown Error: " + err.message });
            resolve({ code: 0, msg: "Success", records });
        })
    })
}