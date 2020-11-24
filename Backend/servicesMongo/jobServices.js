const Jobs = require('../models/Jobs');


module.exports.postJob = (req, res) => {

    console.log("Inside Job POST service");
    console.log(req.body)
    let data = req.body
    let job = Jobs({
        jobTitle: data.jobTitle,
        postedDate: Date.now(),
        industry: data.industry,
        responsibilities: data.responsibilities,
        country: data.country,
        remote: data.remote,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zip: data.zip
    })
    job.save((err, result) => {

        if (err) {
            console.log("Error creating job")
            console.log(err);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            // console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            console.log("Job created Successfully");
            console.log(result);
            res.status(RES_SUCCESS).send(result);
        }
    })
}