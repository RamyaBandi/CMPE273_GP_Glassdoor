import React, { Component } from "react";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ReviewCard from "./reviewCard";
import axios from "axios";
import { BACKEND_URL, GET_COMPANY_REVIEWS } from "../../config/routeConstants";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      redirect: null,
    };
  }
  addReview = async (e) => {
    this.setState({ redirect: <Redirect to="/addReview" /> });
  };
  componentDidMount() {
    const company_id = this.props.location.state;
    //const {data} = this.props.location.state;
    console.log(company_id);
    axios
      .get(BACKEND_URL + GET_COMPANY_REVIEWS + "?company_id=" + company_id)
      .then((response) => {
        console.log("response")
        console.log(response.data.reviews);
        this.setState({ reviews: response.data.reviews });
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render = () => {
    return (
      <div>
        {this.state.redirect}
        <Row>
          <Container >
            {this.state.reviews.map((item) => {
              return <ReviewCard {...item} />;
            })}
          </Container>
        </Row>
      </div>
    );
  };
}

export default Reviews;
