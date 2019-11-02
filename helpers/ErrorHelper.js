module.exports.CheckErrors = function(query) {
    let err = new Object;
    if (!query.startDate) {
        err.code = -1
        err.msg = "Start date can not be empty."
    }
    else if (query.startDate.toString() === 'Invalid Date') {
        err.code = -2
        err.msg = "Invalid date. Start date must be a date."
    }

    else if (!query.endDate) {
        err.code = -3
        err.msg = "End date can not be empty."
    }
    else if (query.endDate.toString() === 'Invalid Date') {
        err.code = -4
        err.msg = "Invalid date. End date must be a date."
    }

    else if (query.startDate > query.endDate) {
        err.code = -5
        err.msg = "Start date can not be later than end date."
    }

    else if (!query.minCount === null) {
        err.code = -6
        err.msg = "Min count can not be empty."
    }
    else if (!Number.isInteger(query.minCount) | query.minCount < 0) {
        err.code = -7
        err.msg = "Min count must be a positive int or 0."
    }

    else if (!query.maxCount === null) {
        err.code = -8
        err.msg = "Max count can not be empty."
    }
    else if (!Number.isInteger(query.maxCount) | query.maxCount < 0) {
        err.code = -9
        err.msg = "Max count must be a positive int or 0."
    }
        
    else if (query.minCount > query.maxCount) {
        err.code = -10
        err.msg = "Min count can not be greater than max count."
    }

    return err;
}