const Reviews = require('../models/Reviews');
const Company = require('../models/Company')
const Jobs = require('../models/Jobs')
var kafka = require('../kafka/client');

// const { jwtsecret } = require('../config/mysqlinit')

const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");

module.exports.jobsHomePage = async (req, res) => {
    //Salary needs to be present, most rated
    kafka.make_request('jobshomepage', req.query, function (err, results) {
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

