import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import Axios from "axios";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }
  render = () => {
    return (
      <div>
        Add review
        <Container style = {{width: "45%"}}>
          <Row>
            <b>Rate a Company</b>
          </Row>
          <Row>
            It only takes a minute! And your anonymous review will help other
            job seekers.
          </Row>
          <Row>
            <br></br>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width:"42%"}}>
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
            <Form.Group controlId="exampleForm.ControlSelect1" style={{ width:"42%"}}>
              <Form.Label>Overall Rating</Form.Label>
              <Form.Control onChange={this.changeRating} as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <form style={{ marginTop: "0px"}}>
              <div class="form-group">
                <label for="iscurrentemployee">
                  Are you a current or former employee?
                </label>
                <input
                  type="text"
                  onChange={this.onChangeIsCurrentEmp}
                  value={this.state.isCurrentEmp}
                  class="form-control"
                  id="iscurrentemployee"
                  width="40%"
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <div class="form-group" style={{ marginTop: "0px", width:"42%" }}>
              <label for="lastyearatemployer">Last Year at Employer</label>
              <select class="form-control" id="lastyearatemployer" onChange={this.onChangeLastYearAtEmployer}
                  value={this.state.lastYearAtEmployer} placeholder="Select">
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
              </select>
            </div>
          </Row>         
          <Row>
            <div class="form-group" style={{ marginTop: "0px", width:"42%" }}>
              <label for="employmentstatus">Employment Status</label>
              <select class="form-control" id="employmentstatus" onChange={this.onChangeEmploymentStatus}
                  value={this.state.employmentStatus} placeholder="Select">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Intern</option>
                <option>Freelance</option>
              </select>
            </div>
          </Row>
          <Row>
            <form style={{ marginTop: "0px" }}>
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
            <form style={{ marginTop: "0px" }}>
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
            <form style={{ marginTop: "0px" }}>
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
            <form style={{ marginTop: "0px" }}>
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
            <form style={{ marginTop: "0px" }}>
              <div class="form-group">
                <label for="advicetomanagement">Advice to Management</label>
                <textarea
                  onChange={this.onChangeAdviseToManagement}
                  value={this.state.adviseToManagement}
                  class="form-control"
                  id="advicetomanagement"
                ></textarea>
              </div>
            </form>
          </Row>
          <Row>
            By submitting I agree to the Glassdoor Terms of Use. This review of my experience at my current or former employer is truthful.
          </Row>
        </Container>
      </div>
    );
  };
}

export default Reviews;
