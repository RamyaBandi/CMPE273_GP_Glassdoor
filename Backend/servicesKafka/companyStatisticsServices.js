const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");


var kafka = require('../kafka/client');

module.exports.getJobsCount = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_STATISTICS_APPLICATIONS_COUNT",
        body: req.query
    }
    kafka.make_request('companyStatistics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}

module.exports.getApplicantsCount = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_STATISTICS_APPLICATIONS_COUNT",
        body: req.query
    }
    kafka.make_request('companyStatistics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}


module.exports.getApplicationDemographics = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_STATISTICS_APPLICANT_DEMOGRAPHICS",
        body: req.query
    }
    kafka.make_request('companyStatistics', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("In error");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        } else {
            console.log("In else");
            res.status(RES_SUCCESS).send(JSON.stringify(results));
        }

    });
}