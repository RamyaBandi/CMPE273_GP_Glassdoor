import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, GET_REVIEW_DETAILS } from "../../../config/routeConstants";

export default class Viewreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          review: {},
          redirect: null,
        };
      }
      componentDidMount() {
        //const reviewId = '5fb3d516cc8f5284a4ec2fab';
        const reviewId = this.props.location.state;
        console.log(reviewId);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios
          .get(BACKEND_URL + GET_REVIEW_DETAILS + "?reviewId=" + reviewId)
          .then((response) => {
            // console.log("reviews response");
            // console.log(response.data.reviews);
            this.setState({ review: response.data });
            console.log(this.state.review);
          })
          .catch((error) => {
            console.log(error);
          });
      }


  render = () => {
    //console.log(this.props.reviews);

    return (
      <div>
        <Container className="block-example border" style={{ marginTop: "20px", width: "80%" }}>
          <Col>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                <b>"{this.state.review.headline}"</b>
              </p>
            </Row>
            <Row>
              <Col md="4">
                <p>Overall Rating: {this.state.review.overallRating}</p>
              </Col>
              <Col md="4">
                <p>Recommended to a Friend: {this.state.review.recommendedRating}</p>
              </Col>
              <Col md="4">
                <p>CEO approval: {this.state.review.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>{this.state.review.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros</b>
                <br />
                {this.state.review.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons</b>
                <br />
                {this.state.review.cons}
              </p>
            </Row>
            <Row> 
                Helpful ({this.state.review.helpfulCount})
            </Row>
          </Col>
        </Container>
      </div>
    );
  };
}

//export default Reviews
