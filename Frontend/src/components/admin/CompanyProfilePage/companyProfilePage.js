import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_COMPANY_BY_COMPANYNAME_ADMIN, GET_COMPANY_REVIEWS_ADMIN } from './../../../config/routeConstants';
import AdminReviewCard from './adminReviewCard';
import ApplicantDemographics from './Statistics/charts/ApplicantsDemographics';
import JobCount from './Statistics/charts/JobsCount';
//import '.'

export default class CompanyProfilePage extends Component {
    state = {
        companyDetails: [],
        reviews: [],
        redirect: null,
        approvedReviews: [],
        rejectedReviews: []
    }

    componentDidMount = async () => {
        const companyName = this.props.location.state;
        await axios.get(BACKEND_URL + GET_COMPANY_BY_COMPANYNAME_ADMIN + '?companyName=' + companyName)
            .then(response => {
                //console.log(response.data.company[0]);
                this.setState({ companyDetails: response.data.company[0], reviews: response.data.company[0].reviews });
                console.log(this.state.reviews);
            })
            .catch((error) => {
                console.log(error);
            }
            )

        //axios to get approved
        await axios.get(BACKEND_URL + GET_COMPANY_REVIEWS_ADMIN + '?companyId=' + this.state.companyDetails._id + '&approvalstatus=Approved')
            .then(response => {
                this.setState({ approvedReviews: response.data.reviews });
                console.log(response.data.reviews);
            })
            .catch((error) => {
                console.log(error);
            })

        //axios to get rejected
        await axios.get(BACKEND_URL + GET_COMPANY_REVIEWS_ADMIN + '?companyId=' + this.state.companyDetails._id + '&approvalstatus=Rejected')
            .then(response => {
                this.setState({ rejectedReviews: response.data.reviews });
                console.log(this.state.rejectedReviews);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render = () => {
        return (
            <div>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h4><b>{this.state.companyDetails.companyName}</b></h4>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <h5 style={{color: "green"}}><b>Approved Reviews</b></h5>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            {this.state.approvedReviews.map((item) => {
                                return <AdminReviewCard {...item} />
                            })}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                        <h5 style={{color: "red"}}><b>Rejected Reviews</b></h5>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            {this.state.rejectedReviews.map((item) => {
                                return <AdminReviewCard {...item} />
                            })}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <h5><b>Jobs</b></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="analyticsHome">
                                <div>
                                    <JobCount />
                                    <ApplicantDemographics />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}