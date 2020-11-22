import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, POST_STUDENT_REVIEW } from '../../config/routeConstants'

class AddReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      company_id: this.props.location.state,
      student_id: "5fb48df63d242fa0842343f3"
    };
    axios.post(BACKEND_URL + POST_STUDENT_REVIEW, this.reviewData)
            .then(response => {
                console.log("review posted successfully")
            })          
  };

  render = () => {
    return (
      <div>
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
            <form style={{ marginTop: "0px", width: "100%" }}>
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
                  <Link to={{pathname: "/reviews", state: this.props.location.state}} className="btn btn-primary" 
                            style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }} onClick={this.onReviewSave}>Submit Review</Link>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>
    );
  };
}

export default AddReviews;
