import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import axios from "axios";
import { BACKEND_URL, POST_REVIEW_STUDENT } from '../../config/routeConstants'

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      redirect: null,
    };
  }
  onChangeCompanyName = (e) => {
    this.setState({ companyName: e.target.value });
  };
  onChangeOverallRating = (e) => {
    this.setState({ overallRating: e.target.value });
  };
  onChangeRecommendedRating = (e) => {
    this.setState({ recommendedRating: e.target.value });
  };
  onChangeCeoRating = (e) => {
    this.setState({ ceoRating: e.target.value });
  };
  onChangeReviewHeadline = (e) => {
    this.setState({ reviewHeadline: e.target.value });
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
      companyName: this.state.companyName,
      overallRating: this.state.overallRating,
      recommendedRating: this.state.recommendedRating,
      ceoRating: this.state.ceoRating,
      reviewHeadline: this.state.reviewHeadline,
      pros: this.state.pros,
      cons: this.state.cons,
      description: this.state.description
    };
    axios.post(BACKEND_URL + POST_REVIEW_STUDENT, this.reviewData)
            .then(response => {
                console.log("review posted successfully")
            })
            
  };

  render = () => {
    return (
      <div>
        Add review
        <Container style={{ marginLeft: "25%", width: "42%" }}>
          <Row>
            <b>Rate a Company</b>
          </Row>
          <Row>
            It only takes a minute! And your anonymous review will help other
            job seekers.
          </Row>
        </Container>
        <Container style={{ marginTop: "20px", width: "45%" }}>
          <Row>
            <form style={{ marginTop: "0px", width: "42%" }}>
              <div class="form-group">
                <label for="companyname">Company</label>
                <input
                  type="text"
                  onChange={this.onChangeCompanyName}
                  value={this.state.companyName}
                  class="form-control"
                  id="company"
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "42%" }}
            >
              <Form.Label>Overall Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeOverallRating}
                value={this.state.overallRating}
                as="select"
              >
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
              style={{ width: "42%" }}
            >
              <Form.Label>Recommended Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeRecommendedRating}
                value={this.state.recommendedRating}
                as="select"
              >
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
              style={{ width: "42%" }}
            >
              <Form.Label>CEO Rating</Form.Label>
              <Form.Control
                onChange={this.onChangeCeoRating}
                value={this.state.ceoRating}
                as="select"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <div class="form-group" style={{ marginTop: "0px", width: "42%" }}>
              <label for="employmentstatus">Employment Status</label>
              <select
                class="form-control"
                id="employmentstatus"
                onChange={this.onChangeEmploymentStatus}
                value={this.state.employmentStatus}
                placeholder="Select"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Intern</option>
                <option>Freelance</option>
              </select>
            </div>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="jobtitle">Your Job Title at this Company</label>
                <input
                  type="text"
                  onChange={this.onChangeJobTitle}
                  value={this.state.jobTitle}
                  class="form-control"
                  id="jobtitle"
                  placeholder="Title"
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="reviewheadline">Review Headline</label>
                <input
                  type="text"
                  onChange={this.onChangeReviewHeadline}
                  value={this.state.reviewHeadline}
                  class="form-control"
                  id="reviewheadline"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
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
            <form style={{ marginTop: "0px", width: "100%" }}>
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
            <form style={{ marginTop: "0px", width: "100%" }}>
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
          <Row>
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
                  <Button onClick={this.onReviewSave} block>
                    Submit Review
                  </Button>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>
    );
  };
}

export default Reviews;
