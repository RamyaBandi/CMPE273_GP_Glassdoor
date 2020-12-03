const {
	CONTENT_TYPE,
	APP_JSON,
	RES_SUCCESS,
	RES_BAD_REQUEST,
	RES_NOT_FOUND,
	RES_DUPLICATE_RESOURCE,
	TEXT_PLAIN,
	RES_INTERNAL_SERVER_ERROR,
    POST_IMAGE_USER_PROFILE,
    POST_IMAGE_STUDENT_PROFILE

} = require("../config/routeConstants");


var kafka = require('../kafka/client');
const multer = require('multer');
const uploadToS3 = require('./../servicesMongo/uploadToS3');
const { json } = require('body-parser');
const S3 = require('./../servicesMongo/S3Operations')
const fs = require('fs')
const path = require('path');

module.exports.uploadCompanyProfileImage = (req, res) => {
    console.log("Inside POST company profile picture service");
    console.log("req body" + JSON.stringify(req.body));
    let filename = `companyprofile_${Date.now()}.jpg`;
    let pathname = '/cmpe273images/'
    let userRequestObject = req.body;
    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './assets');
            },
            filename(req, file, cb) {
                console.log(JSON.stringify(req.body))
                cb(null, `${filename}`);
            },
        });

        const upload = multer({
            storage
        }).single('file');

        upload(req, res, (err) => {
            console.log("In upload" + JSON.stringify(req.body))
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }
            console.log("S3 upload")
            S3.fileupload(process.env.AWS_S3_BUCKET_NAME,"cmpe273images/companyprofilepicture", req.file).then((url) => {
                console.log(url)
                console.log(req.body)
                Company.findByIdAndUpdate(req.body.companyId, { imageUrl: url}, (err, result) => {
                    if (err) {
                        console.log('Error occured while updating Profile image link' + err)
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                    }
                    else {
                        console.log('Image link set' + result)
                        res.status(RES_SUCCESS).send(result);
                    }
                })
            })


        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "POST_IMAGE_USER_PROFILE",
		body: req.body
	}
	kafka.make_request('images', data, function (err, results) {
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

module.exports.uploadStudentProfileImage = (req, res) => {
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "POST_IMAGE_STUDENT_PROFILE",
		body: req.body
	}
	kafka.make_request('images', data, function (err, results) {
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
