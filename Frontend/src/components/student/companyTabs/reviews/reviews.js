import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReviewCard from "./reviewCard";
import axios from "axios";
import {
  BACKEND_URL,
  GET_COMPANY_REVIEWS,
  GET_COMPANY_DETAILS,
  GET_POSITIVE_REVIEW,
  GET_NEGATIVE_REVIEW,
  GET_REVIEW_AVERAGE
} from "../../../../config/routeConstants";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      reviews: [],
      positiveReviews: {},
      negativeReviews: {},
      avgReviews: {},
      redirect: null,
    };
  }
  addReview = async (e) => {
    this.setState({ redirect: <Redirect to="/addReview" /> });
  };
  componentDidMount() {
    const company_id = '5fb4884acf339e3da0d5c31e';
    const student_id = '5fb48df63d242fa0842343f3';
    //const company_id = this.props.location.state;
    //console.log(company_id);
    axios
      .get(BACKEND_URL + GET_COMPANY_REVIEWS + "?companyId=" + company_id + "?studentId=" + student_id)
      .then((response) => {
        // console.log("reviews response");
        // console.log(response.data.reviews);
        this.setState({ reviews: response.data.reviews });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(BACKEND_URL + GET_COMPANY_DETAILS + "?companyId=" + company_id)
      .then((response) => {
        this.setState({ companyDetails: response.data[0] });
        // console.log("company overview response");
        // console.log(response.data[0]);
        // console.log(this.state.companyDetails);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_POSITIVE_REVIEW + "?companyId=" + company_id)
      .then((response) => {
        console.log("positive review");
        this.setState({ positiveReviews: response.data.positiveReviews[0] });
        //console.log(this.state.positiveReviews);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_NEGATIVE_REVIEW + "?companyId=" + company_id)
      .then((response) => {
        console.log("negative review");
        this.setState({ negativeReviews: response.data.negativeReviews[0] });
        //console.log(this.state.negativeReviews);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_REVIEW_AVERAGE + "?companyId=" + company_id)
      .then((response) => {
        console.log("review average");
        this.setState({ avgReviews: response.data.avgReviews[0] });
        console.log(this.state.avgReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render = () => {
    return (
      <div>
        {this.state.redirect}
        <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
          <Row style={{ height: "50px", marginTop: "20px" }}>
            <Col>
              <h5>
                <b>{this.state.companyDetails.companyName}</b>
              </h5>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
                        <Col md="8">
                            <div>
                                <Nav className="mr-auto">
                                    <div className="box-content right">
                                        <Link to="/overview" style={{ textDecoration: 'none', color: '#1861bf' }}>Overview</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/reviews", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Reviews</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/jobs", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Jobs</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/salaries", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Salaries</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/interviews", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Interviews</Link>
                                    </div>
                                    <div class="box-content">
                                        <Link to="/photos" style={{ textDecoration: 'none', color: '#1861bf' }}>Photos</Link>
                                    </div>
                                </Nav>
                            </div>
                        </Col>
                        <Col md="4">
                            {/* <Button className="float-right" style={{ backgroundColor: "#1861bf" }} onClick = {this.onAddReview}>
                                <p style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }}>+ Add a Review</p>
                            </Button> */}
                            <div className="float-right" style={{ paddingRight: "70px" }}>
                                <Link to={{ pathname: "/addreview", state: this.state.companyDetails._id }} className="btn gd-btn-med gd-btn-icon"
                                    style={{ color: "#ffffff", backgroundColor: "#1861bf", marginTop: "5px", marginBottom: "5px", width: "100%" }}>+ Add a Review</Link>
                            </div>
                        </Col>
                    </Row>
        </Container>

        
          <Container style={{ marginTop: "30px", width: "61%" }}>
            <Row>
            <Col md="4">
              Average Overall Rating: {this.state.avgReviews.averageOverallRating}
            </Col>
            <Col md="4">
              Average Recommended Rating: {this.state.avgReviews.averageRecommendedRating}
            </Col>
            <Col md="4">
              Average CEO Rating: {this.state.avgReviews.averageCeoRating}
            </Col>
            </Row>
          </Container>
       

        <Row>
        <Container className="block-example border" style={{ marginTop: "20px", width: "61%" }}>
          <Col>
          <Row>
            <p>Most Positive Review</p>
          </Row>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                <b>{this.state.positiveReviews.headline}</b>
              </p>          
            </Row>
            <Row>
              <Col md="4">
                <p>Overall Rating: {this.state.positiveReviews.overallRating}</p>
              </Col>
              <Col md="4">
                <p>Recommended to a Friend: {this.state.positiveReviews.recommendedRating}</p>
              </Col>
              <Col md="4">
                <p>CEO approval: {this.state.positiveReviews.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>{this.state.positiveReviews.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros</b>
                <br />
                {this.state.positiveReviews.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons</b>
                <br />
                {this.state.positiveReviews.cons}
              </p>
            </Row>
          </Col>
        </Container>

        <Container className="block-example border" style={{ marginTop: "20px", width: "61%" }}>
          <Col>
          <Row>
            <p>Most Negative Review</p>
          </Row>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                <b>{this.state.negativeReviews.headline}</b>
              </p>          
            </Row>
            <Row>
              <Col md="4">
                <p>Overall Rating: {this.state.negativeReviews.overallRating}</p>
              </Col>
              <Col md="4">
                <p>Recommended to a Friend: {this.state.negativeReviews.recommendedRating}</p>
              </Col>
              <Col md="4">
                <p>CEO approval: {this.state.negativeReviews.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>{this.state.negativeReviews.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros</b>
                <br />
                {this.state.negativeReviews.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons</b>
                <br />
                {this.state.negativeReviews.cons}
              </p>
            </Row>
          </Col>
        </Container>

          <Container style={{ marginBottom: "30px" }}>
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
