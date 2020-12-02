import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, POST_STUDENT_SALARY, GET_COMPANY_DETAILS } from '../../../../config/routeConstants'

class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
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
      companyId: "5fb4884acf339e3da0d5c31e",
      studentId: "5fb48df63d242fa0842343f3"
    };
    axios.post(BACKEND_URL + POST_STUDENT_SALARY, this.salaryData)
            .then(response => {
                console.log("Salary posted successfully");
            })          
  };

  componentDidMount() {
    const company_id = this.props.location.state;
    console.log(company_id);

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
            <b>Add a Salary</b>
          </Row>
        </Container>
        <Container style={{ marginTop: "20px", width: "100%" }}>
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
        </Container>
      </div>
    );
  };
}

export default AddSalary;
