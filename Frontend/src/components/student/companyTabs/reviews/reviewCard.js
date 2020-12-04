import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { BACKEND_URL, PUT_STUDENT_REVIEW_HELPFUL } from '../../../../config/routeConstants'

export default class ReviewCard extends Component {

  onClickHelpful = async (e) => {
    this.reviewData = {   
      reviewId: this.props._id,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.put(BACKEND_URL + PUT_STUDENT_REVIEW_HELPFUL, this.reviewData)
            .then(response => {
                console.log("review helpful count updated successfully")
                console.log(this.props._id);
            })          
  };

  render = () => {
    //console.log(this.props.reviews);

    let companyOverviewReviewsStyle={

    }
    if(this.props.companyOverview){
      companyOverviewReviewsStyle={
        
      }
    }
    return (
        <Container className="block-example border" style={{ marginTop: "20px", width: "80%",padding:"20px" }}>
          <Col>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                Headline: <b>"{this.props.headline}"</b>
              </p>
            </Row>
            <Row style={{justifyContent:"space-between"}}>
              <Col md="auto">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.props.overallRating}
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
                <p>Overall Rating: {this.props.overallRating}</p>
              </Col>
              <Col md="auto">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.props.recommendedRating}
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
                <p>Recommended to a Friend: {this.props.recommendedRating}</p>
              </Col>
              <Col md="auto">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.props.ceoRating}
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
                <p>CEO approval: {this.props.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>Description: {this.props.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros:</b>
                <br />
                {this.props.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons:</b>
                <br />
                {this.props.cons}
              </p>
            </Row>
            <Row>
              <Button
                style={{ backgroundColor: "#1861bf", marginBottom: "10px" }}
                onClick={this.onClickHelpful}
                className="float-right"
              >
                Helpful ({this.props.helpfulCount})
            </Button>
            </Row>
          </Col>
        </Container>
    );
  };
}

//export default Reviews
