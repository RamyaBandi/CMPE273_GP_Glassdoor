const { response } = require('express');
const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");
var kafka = require('../kafka/client');

module.exports.jobSearch = async (req, res) => {
    console.log("Search", req.query.searchParameter)
    console.log("Search", req.query.page)
    console.log("Search", req.query.limit)
    data = {
        api: "GET_JOB_SEARCH",
        body: req.query
    }
    kafka.make_request('studentsearch', data, function (err, results) {
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
// }
module.exports.companySearch = async (req, res) => {
    data = {
        api: "GET_COMPANY_SEARCH",
        body: req.query
    }

    kafka.make_request('studentsearch', data, function (err, results) {
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

module.exports.salarySearch = async (req, res) => {
    data = {
        api: "GET_SALARY_SEARCH",
        body: req.query
    }

    kafka.make_request('studentsearch', data, function (err, results) {
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

module.exports.interviewSearch = async (req, res) => {
    data = {
        api: "GET_INTERVIEW_SEARCH",
        body: req.query
    }

    kafka.make_request('studentsearch', data, function (err, results) {
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