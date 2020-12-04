import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import Chart from "react-google-charts";
import ReactPaginate from 'react-paginate';
import InterviewCard from "./interviewCard";
import {
  BACKEND_URL,
  GET_COMPANY_INTERVIEWS,
  GET_COMPANY_DETAILS,
  GET_COMPANY_INTERVIEW_STATISTICS,
} from "../../../../config/routeConstants";

class Interviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      interviews: [],
      interviewStatistics: {},
      page : 1,
      limit : 10,
      totalPages : 0,
      redirect: null,
    };
  }
  componentDidMount() {
    //const company_id = "5fb4884acf339e3da0d5c31e";
    this.getInterviewResults();
    const company_id = localStorage.getItem('companyId');
    console.log(company_id);
    // axios
    //   .get(BACKEND_URL + GET_COMPANY_INTERVIEWS + "?companyId=" + company_id)
    //   .then((response) => {
    //     this.setState({ interviews: response.data.interviews });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios
      .get(
        BACKEND_URL +
          GET_COMPANY_INTERVIEW_STATISTICS +
          "?companyId=" +
          company_id
      )
      .then((response) => {
        this.setState({ interviewStatistics: response.data });
        console.log("Interviews Experience Rating in Percentage response");
        console.log(response.data);
        //console.log(this.state.interviewStatistics);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageClick = (e) => {
    // console.log("Page number",e.selected)
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getInterviewResults()
        });
    console.log("Page number",e.selected)
  }

  handleChange = (e) => {
    //  console.log(this.state);
    let { value, id } = e.target;
    this.setState({ [id]: value }, () => this.getInterviewResults());
  
    // console.log(this.state)
  };

  async getInterviewResults(){
    const company_id = this.props.location.state;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.get(BACKEND_URL + GET_COMPANY_INTERVIEWS, {
        params: {
          companyId: company_id,
          page : this.state.page,
          limit : this.state.limit
        }
    })
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("Interviews Data", response.data)
                this.setState({
                    interviews: response.data.interviews
                })
            }
        })
        .catch(error => {
            console.log(error.response.data.msg)
        })
  }

  render = () => {
    return (
      <div>
        {this.state.redirect}
        <Container
          style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }}
          className="block-example border"
        >
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
                  <Link to={{ pathname: "/overview", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Overview</Link>
                  </div>
                  <div class="box-content right">
                    <Link
                      to={{
                        pathname: "/reviews",
                        state: this.state.companyDetails._id,
                      }}
                      style={{ textDecoration: "none", color: "#1861bf" }}
                    >
                      Reviews
                    </Link>
                  </div>
                  <div class="box-content right">
                    <Link
                      to={{
                        pathname: "/jobs",
                        state: this.state.companyDetails._id,
                      }}
                      style={{ textDecoration: "none", color: "#1861bf" }}
                    >
                      Jobs
                    </Link>
                  </div>
                  <div class="box-content right">
                    <Link
                      to={{
                        pathname: "/salaries",
                        state: this.state.companyDetails._id,
                      }}
                      style={{ textDecoration: "none", color: "#1861bf" }}
                    >
                      Salaries
                    </Link>
                  </div>
                  <div class="box-content right">
                    <Link
                      to={{
                        pathname: "/interviews",
                        state: this.state.companyDetails._id,
                      }}
                      style={{ textDecoration: "none", color: "#1861bf" }}
                    >
                      Interviews
                    </Link>
                  </div>
                  <div class="box-content">
                  <Link to={{ pathname: "/photos", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Photos</Link>
                  </div>
                </Nav>
              </div>
            </Col>
            <Col md="4">
              {/* <Button className="float-right" style={{ backgroundColor: "#1861bf" }} onClick = {this.onAddReview}>
                                <p style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }}>+ Add a Review</p>
                            </Button> */}
              <div className="float-right" style={{ paddingRight: "70px" }}>
                <Link
                  to={{
                    pathname: "/addinterview",
                    state: this.state.companyDetails._id,
                  }}
                  className="btn gd-btn-med gd-btn-icon"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#1861bf",
                    marginTop: "5px",
                    marginBottom: "5px",
                    width: "100%",
                  }}
                >
                  + Add an Interview
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        
        <Container style={{ marginBottom: "0px" }}>
        <Row>
        <Col md = "4">
          <Chart
            width={"400px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Experience', 'percentage'],
              ["Positive", this.state.interviewStatistics.positivePercentage],
              ["Neutral", this.state.interviewStatistics.neutralPercentage],
              ["Negative", this.state.interviewStatistics.negativePercentage],
            ]}
            options={{
              title: "Interview Experience Statistics",
              pieHole: 0.5,
            }}
            rootProps={{ "data-testid": "3" }}
          />
        </Col>

        <Col md = "4">
          <Chart
            width={"400px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Experience', 'percentage'],
              ["Accepted", this.state.interviewStatistics.acceptedPercentage],
              ["Rejected", this.state.interviewStatistics.rejectedPercentage],
            ]}
            options={{
              title: "Offer Status Statistics",
              pieHole: 0.5,
            }}
            rootProps={{ "data-testid": "3" }}
          />
        </Col>

        <Col md = "4">
        <Chart
            width={"400px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Difficulty', 'percentage'],
              ["Easy", this.state.interviewStatistics.easyPercentage],
              ["Average", this.state.interviewStatistics.averagePercentage],
              ["Difficult", this.state.interviewStatistics.difficultPercentage],
            ]}
            options={{
              title: "Interview Difficulty Statistics",
              pieHole: 0.5,
            }}
            rootProps={{ "data-testid": "3" }}
          />
        </Col>
        </Row>
        </Container>

        <Row>
          <Container style={{ marginBottom: "30px" }}>
            {this.state.interviews.map((item) => {
              return <InterviewCard {...item} />;
            })}
          </Container>
        </Row>
        <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />

        <div className="input-group"
                            style={{ width: "200px", justifyContent: "space-around" }}
                        >
                            <div className="input-group-prepend">
                                <label  >Page Limit </label>
                            </div>
                            <select className="custom-select" value={this.state.limit} onChange={this.handleChange} id="limit">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
        </div>
      </div>
    );
  };
}

export default Interviews;
