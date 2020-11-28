import React, { Component } from "react";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import InterviewCard from "./interviewCard";

class Interviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interviews: [],
      redirect: null,
    };
  }
  componentDidMount() {
    const company_id = this.props.location.state;
    //const {data} = this.props.location.state;
    console.log(company_id);
    // axios
    //   .get(BACKEND_URL + GET_COMPANY_REVIEWS + "?company_id=" + company_id)
    //   .then((response) => {
    //     console.log("response")
    //     console.log(response.data.reviews);
    //     this.setState({ reviews: response.data.reviews });
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render = () => {
    return (
      <div>
        {this.state.redirect}
        <Row>
          <Container >
              Interviews tab
            {this.state.interviews.map((item) => {
              return <InterviewCard {...item} />;
            })}
          </Container>
        </Row>
      </div>
    );
  };
}

export default Interviews;
