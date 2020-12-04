import React, { Component } from 'react';
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
import {Link} from 'react-router-dom'
import AWS from "aws-sdk";
//require('dotenv').config({ path: __dirname + '/.env' })
class ResumeList extends Component {
    state = { 

     }
    handledelete=(e)=>{
        console.log("delete handle")
        const req={
            params:{
            resumeId: this.props.resumeitem._id,
            studentId: this.props.resumeitem.studentId
            }
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios
            .delete(`${routeConstants.BACKEND_URL}/student${routeConstants.DELETE_STUDENT_RESUME}`, req)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    window.alert("Deleted Successfully");
                }
            }).catch((err) => {
                window.alert("Unable to delete resume");
            });
    }
    handledownload=(e)=>{
        console.log("handle download")
        //this.props.history.props(this.props.resumeitem.uploadLink)
        let uploadlink=this.props.resumeitem.uploadLink
        console.log(process.env.AWS_S3_ACCESSKEYID)
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESSKEYID,
            secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
          });
          s3.getObject({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: "cmpe273images/studentresume"   }, function (
            error,
            data
          ) {
            if (error != null) {
              alert("Object retrival was a failure");
            } else {
              let blob = new Blob([data.Body], { type: data.ContentType });
              let link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = uploadlink;
              link.click();
            }
          });

    }
    handleprimaryresume=(e)=>{
        console.log(this.props.resumeitem._id)
        let req={
            resumeId: this.props.resumeitem._id,
            studentId: this.props.resumeitem.studentId
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios
            .put(`${routeConstants.BACKEND_URL}/student${routeConstants.PUT_PRIMARY_RESUME}`, req)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    window.alert("Primary Resume Selected");
                }
            }).catch((err) => {
                window.alert("Unable to select primary resume");
            });
    }
    render() { 
        console.log(this.props.resumeitem)
        let resumedetails=this.props.resumeitem.uploadLink.split('?')[0]
        var uploaddate=""
        var uploadtime=""
        if(this.props.resumeitem.uploadDate){
          //console.log("reply time")
          var uploaddate=this.props.resumeitem.uploadDate.split('T')[0]
          var uploadtime=this.props.resumeitem.uploadDate.split('T')[1].split('Z')[0]
          //console.log(replytime)
        }
        return ( 
            <div class="card w-75">
            <div class="card-body">
              <h5 class="card-title">{resumedetails.uploadFileName}</h5>
        <p class="card-text">Date:{uploaddate}<br></br>Time:{uploadtime}</p>
       <Link to="/https://cmpe273glassdoor.s3.us-west-1.amazonaws.com/cmpe273images/studentresume/11.22toastmaster14%20%281%29.pdf" replace download>
        <button class="btn btn-success"><i class="fa fa-download"></i> Download</button>
        </Link>
    
              <button href="" class="btn btn-success" onClick={this.handledelete}>Delete</button>
              <br></br>
              <br></br>
              <button href="#" class="btn btn-success" onClick={this.handleprimaryresume}>Make it primary resume!!</button>
              
            </div>
          </div>
         );
    }
}
 
export default ResumeList;