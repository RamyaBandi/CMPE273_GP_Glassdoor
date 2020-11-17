import React, { Component } from "react";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import Axios from "axios";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      redirect: null
    };
  }
  addReview = async (e)=> {
    this.setState({ redirect: <Redirect to="/addReview" /> })
  }
  render = () => {
    return (
      <div>
          {this.state.redirect}
        Reviews tab
        <Row>
          {this.state.reviews.map((item) => {
            return <reviewCard {...item} />;
          })}
          
        </Row>
      </div>
    );
  };
}

export default Reviews;
