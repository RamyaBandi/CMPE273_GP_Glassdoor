const AWS = require('aws-sdk');
const fs = require('fs');


AWS.config.update({
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    region: process.env.AWS_S3_REGION
})

var s3 = new AWS.S3()

// var createBucket = (bucketName) => {
//     const params = {
//         Bucket: bucketName,
//         ACL: 'public-read',
//         CreateBucketConfiguration: {
//             // Set your region here
//             LocationConstraint: process.env.AWS_S3_REGION
//         }
//     };
//     console.log("CREATING A BUCKET", params)
//     return new Promise((resolve, reject) => {
//         s3.createBucket(params, function (err, data) {
//             if (err) {
//                 console.log("BUCKET ALREADY OWNED BY YOU");
//             }
//             else {
//                 console.log('Bucket Created Successfully', data.Location);
//             }
//             resolve();
//         })
//     });
// }

exports.fileupload = async (bucketName, folderName, fileObj) => {
    // console.log("PARAMS", bucketName, folderName, fileObj)
    // await createBucket(bucketName);
     console.log("in file upload s3")
    const params = {
        Bucket: bucketName,  // Param 1 of the function
        Key: `${folderName}/${String(fileObj.originalname)}`, // Folder Name (Param 2) + Type (param 3) + file obj (param 4)
        ACL: 'public-read', // File name you want to save as in S3
        Body: fs.createReadStream(fileObj.path)
    };
   
    // console.log("PARAMS FOR UPLOADING", params)

    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
                reject();
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        })
            .promise()
            .then(() => {
                var createdURL = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: `${folderName}/${String(fileObj.originalname)}` })
                console.log(`The URL is ${createdURL}`) // Return value of the function
                resolve(createdURL)
            })
    })

}