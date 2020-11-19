import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import Axios from "axios";

export default class ReviewCard extends Component {
  render = () => {
    //console.log(this.props.reviews);
    return (
      <div>
        <Container style={{ marginTop: "20px", width: "100%" }}>
          <Row>
            <p style={{ color: "#3f76cc", fontSize: "22px" }}>
              <b>"{this.props.headline}"</b>
            </p>
          </Row>
          <Row>
            <Col md="3">
              <p>Overall Rating: {this.props.overallRating}</p>
            </Col>
            <Col md="3">
              <p>Recommended to a Friend: {this.props.recommendedRating}</p>
            </Col>
            <Col md="3">
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
              style={{ backgroundColor: "#1861bf" }}
              onClick={this.onReviewSave}
              block
              className="float-right"
            >
              Helpful (0)
            </Button>
          </Row>
        </Container>
      </div>
    );
  };
}

//export default Reviews
