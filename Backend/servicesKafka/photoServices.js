const {
    RES_SUCCESS,
    RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

var kafka = require('../kafka/client');

module.exports.postCompanyPhotos = async (req, res) => {
    console.log("req.body" + JSON.stringify(req.body))
    data = {
        api: "POST_COMPANY_PHOTOS",
        body: req.body
    }
    kafka.make_request('photos', data, function (err, results) {
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

module.exports.getCompanyPhotos = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_COMPANY_PHOTOS",
        body: req.query
    }
    kafka.make_request('photos', data, function (err, results) {
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

module.exports.getAllPhotos = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "GET_ALL_PHOTOS",
        body: req.query
    }
    kafka.make_request('photos', data, function (err, results) {
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

module.exports.putPhotoApprove = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "PUT_PHOTO_APPROVE",
        body: req.body
    }
    kafka.make_request('photos', data, function (err, results) {
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

module.exports.putPhotoReject = (req, res) => {
    console.log("req.body" + JSON.stringify(req.query))
    data = {
        api: "PUT_PHOTO_REJECT",
        body: req.body
    }
    kafka.make_request('photos', data, function (err, results) {
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