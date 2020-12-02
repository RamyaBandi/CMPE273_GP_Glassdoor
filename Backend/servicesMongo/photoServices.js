const { response } = require('express');
const con = require('../config/mongoConnection');
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
const Company = require('../models/Company');
const Student = require('../models/Student');
const Photos = require('../models/Photos');
const multer = require('multer');
const uploadToS3 = require('./uploadToS3');
const { json } = require('body-parser');
const S3 = require('./S3Operations');
const fs = require('fs');
const path = require('path');

module.exports.postCompanyPhotos = async (req, res) => {
    console.log("Inside POST company photos service");
    console.log("req body" + JSON.stringify(req.body));
    let email_id;
    let filename = `companyphotos_${Date.now()}.jpg`;
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
        }).array('file', 5);

        await upload(req, res, (err) => {
            console.log("In upload" + JSON.stringify(req.body))
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }
            console.log("S3 upload");
            S3.fileupload(process.env.AWS_S3_BUCKET_NAME,"/cmpe273images/companyphotos", req.file).then((url) => {
                console.log(url)
                console.log(req.body)
                Photos.findOneAndUpdate({companyId: req.body.companyId, photoURL: url}, (err, result) => {
                    if (err) {
                        console.log('Error occured while uploading company photos' + err)
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                    }
                    else {
                        // console.log('Image link set' + result)
                        // res.status(RES_SUCCESS).send(result);
                        Company.findByIdAndUpdate(req.body.companyId, { $push: { 'photos': result._id } }, (error, result) => {
                            if (error) {
                                console.log("Error uploading company photos")
                                console.log(error);
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                            }
                            else {
                                // console.log(JSON.stringify(result));
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                console.log("Photos uploaded successfully");
                                console.log(result);
                                res.status(RES_SUCCESS).send(result);
                            }
                        })
                    }
                })
            })
        });
    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }
}

module.exports.getCompanyPhotos = async (req, res) => {
    console.log("Inside Company Photos GET service");
    console.log(req.query);
    let data = req.query;
    try {
        data.page = 1;
        data.limit = 10;
        const photos = await Photos.find({ companyId: data.companyId }).limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Photos.countDocuments({ companyId: data.companyId });
        const result = ({
            photos,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("Company photos fetched successfully from DB");
        res.status(RES_SUCCESS).send(result);
    }
    catch {
        if (err) {
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
    }
}