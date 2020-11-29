import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import interviewCard from "./interviewCard";
import Axios from "axios";

export default class InterviewCard extends Component {
  render = () => {
    console.log(this.props.interviews);
    return (
      <div>
        <Container className= "block-example border" style={{ marginTop: "20px", width: "80%" }}>
            <Col>
          <Row>
            <p style={{ color: "#3f76cc", fontSize: "22px" }}>
              <b>"{this.props.jobTitle}"</b>
            </p>
          </Row>
          <Row>
            <Col md="4">
              <p>Offer Status: {this.props.offerStatus}</p>
            </Col>
            <Col md="4">
              <p>Interview Experience: {this.props.overallExperience}</p>
            </Col>
            <Col md="4">
              <p>Difficulty: {this.props.difficulty}</p>
            </Col>
          </Row>
          <Row>
              <p>Interview</p>
          </Row>
          <Row>
            <p>{this.props.description}</p>
          </Row>
          </Col>
        </Container>
      </div>
    );
  };
}

//export default Reviews
