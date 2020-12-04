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

const fs = require('fs');
const path = require('path');

const AWS = require('aws-sdk');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

AWS.config.update({
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    region: process.env.AWS_S3_REGION
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

module.exports.postCompanyPhotos = async (req, res) => {
    console.log("Inside Photos POST service");
    const id = req.query.id;
    const studentId = req.query.studentId;
    //console.log(req.query)
    const form = new multiparty.Form();
    //find count

    const count = await Photos.countDocuments({ companyId: id, studentId: studentId });
    console.log(count);
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            //console.log(files);
            //return res.status(200).send("done");
            for (var key in files) {
                const { path, fieldName } = files[key][0];
                const buffer = fs.readFileSync(path);
                const type = await fileType.fromBuffer(buffer)
                //const timestamp = Date.now().toString();
                const fileName = `companyPhotos/${id}/${(parseInt(fieldName)+count).toString()}`;
                console.log(fileName)
                const data = await uploadFile(buffer, fileName, type);
                console.log(data.Location)
                //insert into db
                let inData = req.body;
                let photos = Photos({
                    studentId: studentId,
                    companyId: id,
                    photoURL:data.Location ,
                    approvalStatus: 'Under Review',
                    uploadDate: Date.now(),
                    //fileName: inData.fileName
                })

                await photos.save((err, result) => {
                    if (err) {
                        console.log("Error posting photos")
                        console.log(err);
                        //res.setHeader(CONTENT_TYPE, APP_JSON);
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
                    }
                    else {
                        Company.findOneAndUpdate({ _id: inData.companyId }, { $push: { 'photos': result._id } }, (error, results) => {
                            if (error) {
                                console.log("Error Updating Company with photos id")
                                console.log(error);
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                            }
                            else {
                                // console.log(JSON.stringify(result));
                                //res.setHeader(CONTENT_TYPE, APP_JSON);
                                console.log("Photos created successfully");
                                console.log(result);
                                //res.status(RES_SUCCESS).send(result);
                            }
                        })
                    }
                })
            }

        //    const temp = await Photos.find({companyId: id}).skip(0).limit(12).exec();
            return res.send("upload done").status(200);

        } catch (err) {
            console.log(err)
            return res.status(400).send(err);
        }
    });
}

module.exports.getCompanyPhotos = async (req, res) => {
    
    const studentId=req.query.studentId;
    console.log(req.query)
    let data = req.query;
    try {
        // data.page = 1;
        // data.limit = 20;
        const photos = await Photos.find({ companyId: data.companyId ,approvalStatus:{$in:['Approved','Under Review']}})
        .limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Photos.countDocuments({ companyId: data.companyId ,approvalStatus:{$in:['Approved','Under Review']}});
        // let formattedPhotos=[]
        // for(let i of photos){
        //     if(i.approvalStatus==="Rejected"){
        //         continue;
        //     }
        //     else if (i.approvalStatus==="Under Review"){
                
        //         if (i.studentId.toString()===studentId){
        //             //console.log("***********")
        //             formattedPhotos.push({
        //                 id:formattedPhotos.length,
        //                 image:i.photoURL,
        //                 name:i._id,
        //                 approvalStatus:i.approvalStatus
        //             })
        //         }
        //     }else{
        //         formattedPhotos.push({
        //             id:formattedPhotos.length,
        //             image:i.photoURL,
        //             name:i._id,
        //             approvalStatus:i.approvalStatus
        //         })
        //     }
        // }
        const result = ({
            formattedPhotos:photos,
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

module.exports.getAllPhotos = async (req, res) => {
    console.log("Inside All Photos GET service");
    console.log(req.query);
    let data = req.query;
    try {
        // data.page = 1;
        // data.limit = 10;
        const photos = await Photos.find().limit(data.limit * 1).skip((data.page - 1) * data.limit).exec();
        const count = await Photos.countDocuments({ companyId: data.companyId });
        const result = ({
            photos,
            totalPages: Math.ceil(count / data.limit),
            currentPage: data.page
        });
        console.log("All photos fetched successfully from DB");
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

module.exports.putPhotoApprove = (req, res) => {
    console.log("Inside Approve Photo PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    Photos.findByIdAndUpdate(data.photoId, { approvalStatus: "Approved" }, (err, result) => {
        if (err) {
            console.log("Error updating photo" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Approval status for a Photo to Approved: " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}

module.exports.putPhotoReject = (req, res) => {
    console.log("Inside Reject Photo PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    Photos.findByIdAndUpdate(data.photoId, { approvalStatus: "Rejected" }, (err, result) => {
        if (err) {
            console.log("Error updating photo" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Approval status for a Photo to Rejected : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}