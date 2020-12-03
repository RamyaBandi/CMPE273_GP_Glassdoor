const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

var kafka = require('../kafka/client');

module.exports.getAllCompanies = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_ALL_COMPANIES_ADMIN",
        body: req.query
    }
    kafka.make_request('company', data, function (err, results) {
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

module.exports.getCompanyByCompanyName = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_BY_COMPANYNAME_ADMIN",
        body: req.query
    }
    kafka.make_request('company', data, function (err, results) {
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

module.exports.getCompanyReviews = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_REVIEWS_ADMIN",
        body: req.query
    }
    kafka.make_request('reviews', data, function (err, results) {
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