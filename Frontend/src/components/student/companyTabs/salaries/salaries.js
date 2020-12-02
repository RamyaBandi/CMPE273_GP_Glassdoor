import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import SalaryCard from "./salaryCard";
import { BACKEND_URL, GET_COMPANY_SALARIES, GET_COMPANY_DETAILS } from "../../../../config/routeConstants";

class Salaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      salaries: [],
      redirect: null,
    };
  }
  componentDidMount() {
    const company_id = this.props.location.state;
    //const {data} = this.props.location.state;
    console.log(company_id);
    axios
      .get(BACKEND_URL + GET_COMPANY_SALARIES + "?companyId=" + company_id)
      .then((response) => {
        console.log("response")
        console.log(response.data.salaries);
        this.setState({ salaries: response.data.salaries });
        
      })
      .catch((error) => {
        console.log(error);
      });

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
                        <Col md="4">
                            <div className="float-right" style={{ paddingRight: "70px" }}>
                                <Link to={{ pathname: "/addsalary", state: this.state.companyDetails._id }} className="btn gd-btn-med gd-btn-icon"
                                    style={{ color: "#ffffff", backgroundColor: "#1861bf", marginTop: "5px", marginBottom: "5px", width: "100%" }}>+ Add a Salary</Link>
                            </div>
                        </Col>
                    </Row>
        </Container>
        <Row>
          <Container style={{ marginBottom: "30px" }}>
            {this.state.salaries.map((item) => {
              return <SalaryCard {...item} />;
            })}
          </Container>
        </Row>
      </div>
    );
  };
}

export default Salaries;
