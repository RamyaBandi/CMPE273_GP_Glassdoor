import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, POST_STUDENT_REVIEW, GET_COMPANY_DETAILS } from '../../../../config/routeConstants'

class AddReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      reviews: [],
      redirect: null,
    };
  }
  
  onChangeOverallRating = (e) => {
    this.setState({ overallRating: e.target.value });
  };
  onChangeRecommendedRating = (e) => {
    this.setState({ recommendedRating: e.target.value });
  };
  onChangeCeoRating = (e) => {
    this.setState({ ceoRating: e.target.value });
  };
  onChangeHeadline = (e) => {
    this.setState({ headline: e.target.value });
  };
  onChangePros = (e) => {
    this.setState({ pros: e.target.value });
  };
  onChangeCons = (e) => {
    this.setState({ cons: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onReviewSave = async (e) => {
    this.reviewData = {   
      overallRating: this.state.overallRating,
      recommendedRating: this.state.recommendedRating,
      ceoRating: this.state.ceoRating,
      headline: this.state.headline,
      pros: this.state.pros,
      cons: this.state.cons,
      description: this.state.description,
      companyId: this.props.location.state,
      studentId: localStorage.getItem('mongoId'),
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(BACKEND_URL + POST_STUDENT_REVIEW, this.reviewData)
            .then(response => {
                console.log("review posted successfully")
            })          
  };

  componentDidMount() {
    const company_id = this.props.location.state;
    console.log(company_id);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios
      .get(BACKEND_URL + GET_COMPANY_DETAILS + "?companyId=" + company_id)
      .then((response) => {
        this.setState({ companyDetails: response.data[0] });
        console.log("company overview response");
        console.log(response.data[0]);
        console.log(this.state.companyDetails);
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
                    </Row>
        </Container>
        <Container style={{ marginTop: "30px", marginLeft: "25%", width: "100%" }}>
        <Container style={{ marginLeft: "0%", width: "42%" }}>
          <Row>
            <b>Rate a Company</b>
          </Row>
          <Row>
            It only takes a minute! And your anonymous review will help other
            job seekers.
          </Row>
        </Container>
        <Container style={{ marginTop: "20px", width: "100%" }}>
          
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "50%" }}
            >
              <Form.Label>Overall Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeOverallRating}
                value={this.state.overallRating}
                as="select"
              >
                <option selected>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "50%" }}
            >
              <Form.Label>Recommended Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeRecommendedRating}
                value={this.state.recommendedRating}
                as="select"
              >
                <option selected>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "50%" }}
            >
              <Form.Label>CEO Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeCeoRating}
                value={this.state.ceoRating}
                as="select"
              >
                <option selected>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="headline">Review Headline</label>
                <input
                  type="text"
                  onChange={this.onChangeHeadline}
                  value={this.state.headline}
                  class="form-control"
                  id="headline"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                  class="form-control"
                  id="description"
                ></textarea>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="pros">Pros</label>
                <textarea
                  onChange={this.onChangePros}
                  value={this.state.pros}
                  class="form-control"
                  id="pros"
                  required
                ></textarea>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="cons">Cons</label>
                <textarea
                  onChange={this.onChangeCons}
                  value={this.state.cons}
                  class="form-control"
                  id="cons"
                  required
                ></textarea>
              </div>
            </form>
          </Row>
          <Row style={{ marginLeft: "0%", width: "42%" }}>
            By submitting I agree to the Glassdoor Terms of Use. This review of
            my experience at my current or former employer is truthful.
          </Row>
          <Row>
            <div
              style={{
                textAlign: "center",
                marginBottom: "50px",
                marginTop: "20px",
              }}
            >
              <Row>
                <Col md={12}>
                  <Link to={{pathname: "/reviews", state: this.props.location.state}} className="btn btn-primary" 
                            style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }} onClick={this.onReviewSave}>Submit Review</Link>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
        </Container>
      </div>
    );
  };
}

export default AddReviews;
