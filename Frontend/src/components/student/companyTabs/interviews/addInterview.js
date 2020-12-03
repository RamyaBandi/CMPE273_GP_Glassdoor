import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  BACKEND_URL,
  POST_STUDENT_INTERVIEW,
  GET_COMPANY_DETAILS
} from "../../../../config/routeConstants";

class AddInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
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
  onChangeJobTitle = (e) => {
    this.setState({ jobTitle: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onChangeDifficulty = (e) => {
    this.setState({ difficulty: e.target.value });
  };
  onChangeOfferStatus = (e) => {
    this.setState({ offerStatus: e.target.value });
  };
  onChangeQuestion = (e) => {
    this.setState({ question: e.target.value });
  };
  onChangeAnswer = (e) => {
    this.setState({ answer: e.target.value });
  };

  onSubmitInterview = async (e) => {
    this.interviewData = {
      employerName: this.state.employerName,
      overallExperience: this.state.overallExperience,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      difficulty: this.state.difficulty,
      offerStatus: this.state.offerStatus,
      companyId: this.props.location.state,
      studentId: localStorage.getItem('mongoId'),
      interviewQnA: [
        {
          companyId: "5fb4884acf339e3da0d5c31e",
          studentId: localStorage.getItem('mongoId'),
          question: this.state.question,
          answer: this.state.answer,
        },
      ],
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios
      .post(BACKEND_URL + POST_STUDENT_INTERVIEW, this.interviewData)
      .then((response) => {
        console.log("Interview posted successfully");
      });
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
        <Container style={{ marginLeft: "25%", width: "100%" }}>
        <Container style={{ width: "100%" }}>
          <Row>
            <p>
              <b>Add an Interview</b>
            </p>
          </Row>
        </Container>
        <Container
          style={{ marginTop: "0px", width: "100%" }}
        >
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
            <div
              class="btn-group btn-group-toggle"
              data-toggle="buttons"
              style={{
                marginTop: "0px",
                width: "50%",
                marginLeft: "0px",
                marginRight: "0px",
              }}
            >
              <label class="btn btn-secondary active" for="positive">
                <input
                  type="radio"
                  onChange={this.onChangeOverallExperience}
                  value={this.state.overallExperience}
                  name="overallExperience"
                  id="positive"
                />{" "}
                Positive
              </label>
              <label class="btn btn-secondary" for="neutral">
                <input
                  type="radio"
                  onChange={this.onChangeOverallExperience}
                  value={this.state.overallExperience}
                  name="overallExperience"
                  id="neutral"
                  checked
                />{" "}
                Neutral
              </label>
              <label class="btn btn-secondary" for="negative">
                <input
                  type="radio"
                  onChange={this.onChangeOverallExperience}
                  value={this.state.overallExperience}
                  name="overallExperience"
                  id="negative"
                />{" "}
                Negative
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
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="question">Interview Question</label>
                <textarea
                  onChange={this.onChangeQuestion}
                  value={this.state.question}
                  class="form-control"
                  id="question"
                  required
                ></textarea>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "50%" }}>
              <div class="form-group">
                <label for="answer">Answer</label>
                <textarea
                  onChange={this.onChangeAnswer}
                  value={this.state.answer}
                  class="form-control"
                  id="answer"
                ></textarea>
              </div>
            </form>
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
                  <Link
                    to={{
                      pathname: "/interviews",
                      state: this.props.location.state,
                    }}
                    className="btn btn-primary"
                    style={{
                      color: "#ffffff",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    onClick={this.onSubmitInterview}
                  >
                    Submit Interview
                  </Link>
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

export default AddInterview;
