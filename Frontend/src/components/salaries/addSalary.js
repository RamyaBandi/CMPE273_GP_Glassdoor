import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, POST_STUDENT_REVIEW } from '../../config/routeConstants'

class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaries: [],
      redirect: null,
    };
  }
  
  onChangeBaseSalary = (e) => {
    this.setState({ baseSalary: e.target.value });
  };
  onChangeBonuses = (e) => {
    this.setState({ bonuses: e.target.value });
  };
  onChangeJobTitle = (e) => {
    this.setState({ jobTitle: e.target.value });
  };
  onChangeYearsOfExperience = (e) => {
    this.setState({ yearsOfExperience: e.target.value });
  };
  onChangeLocation = (e) => {
    this.setState({ location: e.target.value });
  };
  onChangeEmployerName = (e) => {
    this.setState({ employerName: e.target.value });
  };
  
  onSubmitSalary = async (e) => {
    this.salaryData = {   
      baseSalary: this.state.baseSalary,
      bonuses: this.state.bonuses,
      jobTitle: this.state.jobTitle,
      yearsOfExperience: this.state.yearsOfExperience,
      location : this.state.location,
      employerName: this.state.employerName,
      company_id: this.props.location.state,
      student_id: "5fb48df63d242fa0842343f3"
    };
    // axios.post(BACKEND_URL + POST_STUDENT_SALARY, this.salaryData)
    //         .then(response => {
    //             console.log("Salary posted successfully")
    //         })          
  };

  render = () => {
    return (
      <div>
        <Container style={{ marginLeft: "25%", width: "42%" }}>
          <Row>
            <b>Add a Salary</b>
          </Row>
        </Container>
        <Container style={{ marginTop: "20px", width: "45%" }}>
            <Row>
            <p>Salary Details</p>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="basesalary">Base Salary</label>
                <input
                  type="number"
                  onChange={this.onChangeBaseSalary}
                  value={this.state.baseSalary}
                  class="form-control"
                  id="basesalary"
                  min="0"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="bonuses">Bonuses</label>
                <input
                  type="number"
                  onChange={this.onChangeBonuses}
                  value={this.state.bonuses}
                  class="form-control"
                  id="bonuses"
                  min="0"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
              <br></br>
          </Row>
          <Row>
              <p>Job Details</p>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
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
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="yearofexp">Years of Experience</label>
                <input
                  type="number"
                  onChange={this.onChangeYearsOfExperience}
                  value={this.state.yearsOfExperience}
                  class="form-control"
                  id="yearofexp"
                  min="0"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  onChange={this.onChangeLocation}
                  value={this.state.location}
                  class="form-control"
                  id="location"
                  required
                ></input>
              </div>
            </form>
          </Row>
          <Row>
            <form style={{ marginTop: "0px", width: "100%" }}>
              <div class="form-group">
                <label for="employername">Employer Name</label>
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
            <div
              style={{
                textAlign: "center",
                marginBottom: "50px",
                marginTop: "20px",
              }}
            >
              <Row>
                <Col md={12}>
                  <Link to={{pathname: "/salaries", state: this.props.location.state}} className="btn btn-primary" 
                            style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }} onClick={this.onSubmitSalary}>Submit Salary</Link>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>
    );
  };
}

export default AddSalary;
