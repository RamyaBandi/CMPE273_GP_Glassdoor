import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_COMPANY_DETAILS, GET_COMPANY_REVIEWS } from '../../../config/routeConstants';
import ReviewCard from "../../reviews/reviewCard";
import Reviews from "../../reviews/reviews";

class CompanyOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetails: [],
            reviews: [],
            redirect: null
        };
    }

    onReview = async (e) => {
        const company_id = "";
        this.setState({ company_id: this.state.companyDetails._id });
        //console.log("company_id in overview "+ this.state.company_id);
    }

    componentDidMount() {
        const company_id = '5fb4884acf339e3da0d5c31e';
        axios.get(BACKEND_URL + GET_COMPANY_DETAILS + '?company_id=' + company_id)
            .then(response => {
                this.setState({ companyDetails: response.data[0] });
                console.log("In componentDidMount");
                console.log(response.data[0]);
                console.log(this.state.companyDetails);
                console.log(this.state.companyDetails.reviews);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        axios
            .get(BACKEND_URL + GET_COMPANY_REVIEWS + "?company_id=" + company_id)
            .then((response) => {
                console.log("response")
                console.log(response.data.reviews);
                this.setState({ reviews: response.data.reviews });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render = () => {
        //const company_id = this.state.companyDetails._id;
        console.log(this.state.companyDetails);
        return (
            <div style={{ backgroundColor: "#eaeaea" }}>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5><b>{this.state.companyDetails.companyName}</b></h5>
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
                                    style={{ color: "#ffffff", backgroundColor: "#1861bf", marginTop: "5px", marginBottom: "5px", width: "370%" }}>+ Add a Review</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5>Company Overview</h5>
                        </Col>
                    </Row>
                    <Container style={{ width: "80%" }}>
                        <Row>
                            <Col md="3">
                                <p>Website:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.website}</p>
                            </Col>
                            <Col md="3">
                                <p>Headquarters:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.headquarters}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Size:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.companySize}</p>
                            </Col>
                            <Col md="3">
                                <p>Founded:</p>
                            </Col>
                            <Col md="3">
                                <p>Founded</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Type:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.companyType}</p>
                            </Col>
                            <Col md="3">
                                <p>Industry:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.industry}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Revenue:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.revenue}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <p>{this.state.companyDetails.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5>Company Reviews</h5>
                        </Col>
                    </Row>
                    <Row style = {{width: "100%"}}>
                        {this.state.reviews.map((item) => {
                            return <ReviewCard {...item} />;
                        })}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CompanyOverview;