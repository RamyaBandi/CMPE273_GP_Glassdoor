import React, { Component } from 'react';
import {   MDBRow,  MDBCard, MDBCardBody, MDBIcon, MDBCol, MDBCardImage, MDBInput } from "mdbreact"
import axios from 'axios'
import routeConstants from "../../../config/routeConstants";
class reviewCard extends Component {
  state={
    reply:''
  }
    

handlefeatured=(e)=>{
        console.log("handle featured")
        console.log(this.props)
        let req={
            companyId: this.props.reviewitem.companyId,
            featuredId: this.props.reviewitem._id
        }
        axios
        .put(`${routeConstants.BACKEND_URL}/company${routeConstants.PUT_FEATURED_REVIEWS}`, req)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                window.alert("Changes Updated Successfully");
            }
        }).catch((err) => {
            window.alert("Unable to add featured review");
        });

    };
  replyinput=(e)=>{
    console.log("reply input")
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  submithandle=()=>{
    console.log("submit reply")
    let req={
        reviewId:this.props.reviewitem._id,
        reply: this.state.reply
    }
    axios
        .put(`${routeConstants.BACKEND_URL}/review${routeConstants.PUT_COMPANY_REPLY}`, req)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                window.alert("Changes Updated Successfully");
            }
        }).catch((err) => {
            window.alert("Unable to post reply");
        });
  }

    render() { 
        console.log(this.props.reviewitem)
        let review=this.props.reviewitem
        let reply=this.props.reviewitem.reply

        return (
            <MDBRow>
      <MDBCol md="4" lg="10">
        <MDBCard news className="my-7">
          <MDBCardBody>
            <div className="content">
        <div className="right-side-meta">{review.reviewDate.split('T')[0]}</div>
              <img
                
                alt=""
                className="rounded-circle avatar-img z-depth-1-half"
              />
              <h1>{review.headline} </h1>
              <p>{review.description} </p>
            </div>
          </MDBCardBody>

          <MDBCardBody>
            <div className="social-meta">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-success active">
            <MDBIcon icon="heart" />
            <button name="favorite" id="option1" autocomplete="off" checked></button>Mark as favorite
  </label>
  <button class="btn btn-success active" onClick={this.handlefeatured}>
            <MDBIcon icon="flag" />
            <label  autocomplete="off"></label>Mark as featured
  </button>
            </div>             
            </div>
            <hr />     
            
            <div className="left-side-meta">{review.replyTimeStamp.split('T')[0]}</div>    
                <h5 className="font-italic">{reply}</h5>          
            <MDBInput far icon="comment" name="reply" onChange={this.replyinput} hint="Add Comment..." />
            <button class="btn btn-success" onClick={this.submithandle}>Reply</button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      </MDBRow>
          );
    }
}
 
export default reviewCard;