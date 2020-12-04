import React, { Component } from 'react';
import { MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBCol, MDBCardImage, MDBInput } from "mdbreact"
import axios from 'axios'
import routeConstants from "../../../config/routeConstants";
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";
class reviewCard extends Component {
  state = {
    reply: ''
  }


  handlefeatured = (e) => {
    // console.log("handle featured")
    // console.log(this.props)
    let req = {
      companyId: this.props.reviewitem.companyId,
      featuredId: this.props.reviewitem._id
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
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
  replyinput = (e) => {
    console.log("reply input")
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  submithandle = () => {
    console.log("submit reply")
    let req = {
      reviewId: this.props.reviewitem._id,
      reply: this.state.reply
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
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
    let review = this.props.reviewitem
    let reply = this.props.reviewitem.reply
    var replytime = ""
    if (this.props.reviewitem.replyTimeStamp) {
      //console.log("reply time")
      var replytime = this.props.reviewitem.replyTimeStamp.split('T')[0]
      //console.log(replytime)
    }


    return (
      <MDBRow>
        <MDBCol md="4" lg="10">
          <MDBCard news className="my-7">
            <MDBCardBody>
              <div className="content">
                <div className="right-side-meta">{review.reviewDate.split('T')[0]}
                  <h3><StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={review.overallRating}
                    starColor="#D4AF37"
                    renderStarIcon={(index, value) => {
                      return (
                        <div className="color-of-star">
                          <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                        </div>
                      );
                    }}
                    renderStarIconHalf={() => (
                      <div className="color-of-star">
                        <span className="position-absolute"><i className={"far fa-star"} /></span>
                        <span><i className={"fas fa-star-half"} /></span>
                      </div>
                    )}
                  />
                  </h3>
                  <p>Rating : {review.overallRating}</p>
                </div>
                <h3>
                  <Link
                    className="Link"
                    to={{
                      pathname: `/viewreview`,
                      state: review._id
                    }}
                    style={{ color: "black" }}
                  >{review.headline} </Link></h3>
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
                    <label autocomplete="off"></label>Mark as featured
  </button>
                </div>
              </div>
              <hr />

              <div className="right-side-meta">{replytime}</div>
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