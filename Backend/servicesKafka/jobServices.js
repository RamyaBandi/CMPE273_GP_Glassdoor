const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

var kafka = require('../kafka/client');

module.exports.postCompanyJob = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    data = {
        api: "POST_COMPANY_JOB",
        body: req.body
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.updateCompanyJob = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    data = {
        api: "PUT_COMPANY_JOB",
        body: req.body
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.getCompanyJobs = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_JOBS",
        body: req.query
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.getCompanyJobsByJobId = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_JOBS_BY_JOBID",
        body: req.query
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.getCompanyJobsByJobTitle = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_JOBS_BY_JOBTITLE",
        body: req.query
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.getCompanyJobsByCity = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_JOBS_BY_CITY",
        body: req.query
    }
    kafka.make_request('jobs', data, function (err, results) {
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

module.exports.getAllJobs = (req, res) => {
    console.log("req.query" + JSON.stringify(req.query))
    data = {
        api: "GET_ALL_JOBS",
        body: req.query
    }
    kafka.make_request('jobs', data, function (err, results) {
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