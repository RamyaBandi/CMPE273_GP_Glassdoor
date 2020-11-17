const { response } = require('express');
const company = require("../models/Company");




module.exports.updatecompanyprofile = (req, res) => {
    console.log("Inside Login POST service");
    console.log("req body" + JSON.stringify(req.body));

    let company_update={
        companyName: req.body.companyName,
        website: req.body.website,
        companySize: req.body.companySize,
        companyType: req.body.companyType,
        revenue: req.body.revenue,
        headquarters: req.body.headquarters,
        industry: req.body.industry,
        mission: req.body.mission,
        description: req.body.description,
        ceoName: req.body.ceoName,
        

    }
    company.findByIdAndUpdate({company_id:req.body.company_id},company_update,(err,result)=>{
        if(err){
            callback(err,'Error')
        }
        else{
            res.status(200).end(JSON.stringify(result))
        }
    })



}
