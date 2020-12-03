import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, JOB_ROUTE, GET_COMPANY_DETAILS, GET_COMPANY_JOBS, GET_COMPANY_JOB_BY_JOBTITLE_OR_CITY } from '../../../../config/routeConstants';
import JobCard from './jobCard';
import ReactPaginate from 'react-paginate';

class CompanyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetails: [],
            jobs: [],
            limit: 10,
            page:1,
            redirect: null
        };
    }

    findJobs = () => {
        axios.get(BACKEND_URL + GET_COMPANY_JOB_BY_JOBTITLE_OR_CITY + '?jobTitle=')
        .then(response => {
            console.log(response.data);
            this.setState({jobs: response.data.jobs});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    addReview = async (e) => {
        this.setState({ redirect: <Redirect to="/addReview" /> });
    };

    componentDidMount() {
        const companyId = this.props.location.state;
        axios.get(BACKEND_URL + GET_COMPANY_DETAILS + '?companyId=' + companyId)
            .then(response => {
                this.setState({ companyDetails: response.data[0] });
                console.log("In componentDidMount");
                console.log(response.data[0]);
                console.log(this.state.companyDetails);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        //console.log(companyId);
        // axios.get(BACKEND_URL + JOB_ROUTE + GET_COMPANY_JOBS + "?companyId=" + companyId)
        //     .then(response => {
        //         this.setState({ jobs: response.data.jobs });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     }
        // )
        this.getResults();
    }

    handlePageClick = (e) => {
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getResults()
        });
        console.log("Page number", e.selected)
    }

    async getResults() {
        const companyId = this.props.location.state;
        axios.get(BACKEND_URL + JOB_ROUTE + GET_COMPANY_JOBS + "?companyId=" + companyId, {
            params: {
                page : this.state.page,
                limit : this.state.limit
            }
        })
            .then(response => {
                this.setState({ jobs: response.data.jobs });
            })
            .catch((error) => {
                console.log(error);
            }
        )
    }

    handleChange = (e) => {
        let { value, id } = e.target;
        this.setState({ [id]: value }, () => this.getResults());
    };

    render = () => {
        return (
            <div style={{ backgroundColor: "#eaeaea" }}>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h4><b>{this.state.companyDetails.companyName}</b></h4>
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
                                        <Link to="/jobs" style={{ textDecoration: 'none', color: '#1861bf' }}>Jobs</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to="/salaries" style={{ textDecoration: 'none', color: '#1861bf' }}>Salaries</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to="/interviews" style={{ textDecoration: 'none', color: '#1861bf' }}>Interviews</Link>
                                    </div>
                                    <div class="box-content">
                                        <Link to="/photos" style={{ textDecoration: 'none', color: '#1861bf' }}>Photos</Link>
                                    </div>
                                </Nav>
                            </div>
                        </Col>
                        <Col md="4">
                            {/* <Button className="float-right" style={{ backgroundColor: "#1861bf" }} onClick = {this.onAddReview}>
                                <p style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }}>+ Add a Review</p>
                            </Button> */}
                            <div className="float-right" style={{ paddingRight: "70px" }}>
                                <Link to={{ pathname: "/addreview", state: this.state.companyDetails._id }} className="btn gd-btn-med gd-btn-icon"
                                    style={{ color: "#ffffff", backgroundColor: "#1861bf", marginTop: "5px", marginBottom: "5px", width: "100%" }}>+ Add a Review</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container style={{ marginTop: "20px", marginBottom: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <p style={{ fontSize: "20px" }}>{this.state.companyDetails.companyName} Jobs</p>
                        </Col>
                    </Row>
                    <Container style={{ width:"80%" }}>
                        <Row>
                        <Col md="auto">
                            <FormControl style={{ width: "110%", height: "40px" }} type="text" placeholder="Search Job Titles" />
                        </Col>
                        <Col md="auto">
                            <Button style={{ backgroundColor: "#1861bf", height: "40px" }} onClick={this.findJobs}>
                                Find Jobs
                            </Button>
                        </Col>
                        </Row>
                        </Container>
                    
                    {this.state.jobs.map((item) => {
                        return <JobCard {...item} />
                    })}
                </Container>
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
        )
    }
}

export default CompanyJobs;