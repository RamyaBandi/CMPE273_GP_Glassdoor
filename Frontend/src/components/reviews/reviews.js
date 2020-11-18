import React, { Component } from "react";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ReviewCard from "./reviewCard";
import axios from "axios";
import { BACKEND_URL, GET_COMPANY_REVIEWS } from '../../config/routeConstants'

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
  componentDidMount() {
    const company_id = '5fb4884acf339e3da0d5c31e'
    axios.get(BACKEND_URL + GET_COMPANY_REVIEWS + '?company_id=' +company_id)
      .then(response => {
        this.setState({ reviews: response.data })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render = () => {
    return (
      <div>
          {this.state.redirect}
          
        Reviews tab
        <Row>
          {this.state.reviews.map((item) => {
            return <ReviewCard {...item} />;
          })}
          
        </Row>
        
      </div>
    );
  };
}

export default Reviews;
