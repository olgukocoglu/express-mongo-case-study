const errorHelper = require('../helpers/ErrorHelper');
const recordService = require('../services/RecordService');

module.exports.GetRecords = function(req, res) {
    let query = new Object;
    if (req.body.startDate)
      query.startDate = new Date(req.body.startDate);
    if (req.body.endDate)
      query.endDate = new Date(req.body.endDate);
    query.minCount = req.body.minCount;
    query.maxCount = req.body.maxCount;

    let error = errorHelper.CheckErrors(query)
    if (error.code)
      return res.status(400).send({ code: error.code, msg: error.msg });
    
    recordService.GetRecords(query).then((response) => {
      if(response.code == -100)
        return res.status(400).send(response);
      return res.send(response);
    }) ;
}