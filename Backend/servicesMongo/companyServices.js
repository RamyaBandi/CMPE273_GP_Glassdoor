const { response } = require('express');
const Company = require('../models/Company');

module.exports.createCompanyProfile = (req, res) => {
    console.log("Inside Company Profile POST service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    let company = Company({
        companyName: data.companyName,
        email: data.email
    })
    company.save((err, result) => {
        if (err) {
            console.log("Error creating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Created Company Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })
}


module.exports.updateCompanyProfile = (req, res) => {
    console.log("Inside Company Profile PUT service");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body

    let company_update = {
        companyName: data.companyName,
        website: data.website,
        companySize: data.companySize,
        companyType: data.companyType,
        revenue: data.revenue,
        headquarters: data.headquarters,
        industry: data.industry,
        mission: data.mission,
        description: data.description,
        ceoName: data.ceoName,
    }
    Company.findByIdAndUpdate({ company_id: data.company_id }, company_update, (err, result) => {
        if (err) {
            console.log("Error updating company profile" + err)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
        }
        else {
            console.log("Update Company Profile : " + JSON.stringify(result))
            res.status(200).end(JSON.stringify(result))
        }
    })



}
