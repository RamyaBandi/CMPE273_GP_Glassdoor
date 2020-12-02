import React, { Component } from 'react';
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
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
    handleprimaryresume=(e)=>{
        console.log(this.props.resumeitem._id)
        let req={
            resumeId: this.props.resumeitem._id,
            studentId: this.props.resumeitem.studentId
        }
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
        let resumedetails=this.props.resumeitem
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
              <button href="#" class="btn btn-success" onClick={this.handledelete}>Delete</button>
              <br></br>
              <br></br>
              <button href="#" class="btn btn-success" onClick={this.handleprimaryresume}>Make it primary resume!!</button>
             
            </div>
          </div>
         );
    }
}
 
export default ResumeList;