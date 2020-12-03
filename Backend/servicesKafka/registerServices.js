const { response } = require('express');

const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");

var kafka = require('../kafka/client');



module.exports.register = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    kafka.make_request('register', req.body, function (err, results) {
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
