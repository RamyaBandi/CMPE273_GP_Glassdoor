import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, POST_STUDENT_INTERVIEW } from '../../../../config/routeConstants'

class AddInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interviews: [],
      redirect: null,
    };
  }
  
  onChangeEmployerName = (e) => {
    this.setState({ employerName: e.target.value });
  };
  onChangeOverallExperience = (e) => {
    this.setState({ overallExperience: e.target.value });
  };
  
  
  onSubmitInterview = async (e) => {
    this.interviewData = {   
      employerName: this.state.employerName,
      overallExperience: this.state.overallExperience,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      difficulty : this.state.difficulty,
      offerStatus: this.state.offerStatus,
      company_id: this.props.location.state,
      student_id: "5fb48df63d242fa0842343f3"
    };
    // axios.post(BACKEND_URL + POST_STUDENT_INTERVIEW, this.interviewData)
    //         .then(response => {
    //             console.log("Interview posted successfully");
    //         })          
  };

  render = () => {
    return (
      <div>
        <Container style={{ marginLeft: "35%", width: "50%" }}>
          <Row>
            <p><b>Add an Interview</b></p>
          </Row>
        </Container>
        <Container style={{ marginLeft: "35%", marginTop: "0px", width: "50%" }}>
            <Row>
            <p>Tell us about a recent job interview</p>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="employername">Employer</label>
                <input
                  type="text"
                  onChange={this.onChangeEmployerName}
                  value={this.state.employerName}
                  class="form-control"
                  id="employername"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
          <p>Rate Overall Experience</p>
          </Row>
          <Row>             
          <div class="btn-group btn-group-toggle" data-toggle="buttons" style={{ marginTop: "0px", width: "50%" , marginLeft: "0px", marginRight: "0px" }}>             
            <label class="btn btn-secondary active" for="positive">
            <input type="radio" onChange={this.onChangeOverallExperience} value={this.state.overallExperience} name="overallExperience" id="positive"/> Positive  
            </label>      
            <label class="btn btn-secondary" for="neutral">
            <input type="radio" onChange={this.onChangeOverallExperience} value={this.state.overallExperience} name="overallExperience" id="neutral" checked/> Neutral
            </label>
            <label class="btn btn-secondary" for="negative">
            <input type="radio" onChange={this.onChangeOverallExperience} value={this.state.overallExperience} name="overallExperience" id="negative"/> Negative
            </label>
          </div>
          </Row>
          <Row>
            <form style={{ marginTop: "10px", width: "50%" }}>
              <div class="form-group">
                <label for="jobtitle">Job Title</label>
                <input
                  type="text"
                  onChange={this.onChangeJobTitle}
                  value={this.state.jobTitle}
                  class="form-control"
                  id="jobtitle"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="description">Describe the Interview Process</label>
                <textarea
                  onChange={this.onChangeDescription}
                  value={this.state.description}
                  class="form-control"
                  id="description"
                  required
                ></textarea>
              </div>
            </form>
          </Row>
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "50%" }}
            >
              <Form.Label>Interview Difficulty</Form.Label>
              <Form.Control
                onChange={this.onChangeDifficulty}
                value={this.state.difficulty}
                as="select"
              >
                <option selected>Select</option>
                <option>Easy</option>
                <option>Average</option>
                <option>Difficult</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ width: "50%" }}
            >
              <Form.Label>Offer Status</Form.Label>
              <Form.Control
                onChange={this.onChangeOfferStatus}
                value={this.state.offerStatus}
                as="select"
              >
                <option selected>Select</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </Form.Control>
            </Form.Group>
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
                  <Link to={{pathname: "/interviews", state: this.props.location.state}} className="btn btn-primary" 
                            style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }} onClick={this.onSubmitInterview}>Submit Interview</Link>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>
    );
  };
}

export default AddInterview;
