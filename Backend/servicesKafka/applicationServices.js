const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

var kafka = require('../kafka/client');

module.exports.getApplicationsByJobId = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_APPLICATIONS_JOBID",
        body: req.query
    }
    kafka.make_request('applications', data, function (err, results) {
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



module.exports.putApplications = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    data = {
        api: "PUT_APPLICATION",
        body: req.body
    }
    kafka.make_request('applications', data, function (err, results) {
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


module.exports.postApplication = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    data = {
        api: "POST_APPLICATION",
        body: req.body
    }
    kafka.make_request('applications', data, function (err, results) {
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