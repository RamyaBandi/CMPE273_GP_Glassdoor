import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import axios from "axios";
import { BACKEND_URL, PUT_STUDENT_REVIEW_HELPFUL } from '../../../../config/routeConstants'

export default class ReviewCard extends Component {

  onClickHelpful = async (e) => {
    this.reviewData = {   
      reviewId: this.props._id,
    };
    axios.put(BACKEND_URL + PUT_STUDENT_REVIEW_HELPFUL, this.reviewData)
            .then(response => {
                console.log("review helpful count updated successfully")
                console.log(this.props._id);
            })          
  };

  render = () => {
    //console.log(this.props.reviews);

    return (
      <div>
        <Container className="block-example border" style={{ marginTop: "20px", width: "80%" }}>
          <Col>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                <b>"{this.props.headline}"</b>
              </p>
            </Row>
            <Row>
              <Col md="4">
                <p>Overall Rating: {this.props.overallRating}</p>
              </Col>
              <Col md="4">
                <p>Recommended to a Friend: {this.props.recommendedRating}</p>
              </Col>
              <Col md="4">
                <p>CEO approval: {this.props.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>{this.props.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros</b>
                <br />
                {this.props.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons</b>
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
      </div>
    );
  };
}

//export default Reviews
