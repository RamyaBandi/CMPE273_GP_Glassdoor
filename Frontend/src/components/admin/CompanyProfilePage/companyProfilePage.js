import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_COMPANY_BY_COMPANYNAME } from './../../../config/routeConstants';

export default class CompanyProfilePage extends Component {
    state = {
        companyDetails: [],
        reviews: [],
        redirect: null
    }

    componentDidMount() {
        const companyName = this.props.location.state;
        axios.get(BACKEND_URL + GET_COMPANY_BY_COMPANYNAME + '?companyName=' + companyName)
            .then(response => {
                //console.log(response.data.company[0]);
                this.setState({ companyDetails: response.data.company[0], reviews: response.data.company[0].reviews });
                console.log(this.state.reviews);
            })
            .catch((error) => {
                console.log(error);
            }
        )
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
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <b>Approved Reviews</b>
                        </Col>
                    </Row>
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <b>Rejected Reviews</b>
                        </Col>
                    </Row>
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5><b>Jobs</b></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}