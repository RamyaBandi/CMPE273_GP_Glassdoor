import React, { Component } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render = () => {
        let companyImage = ""

        if (this.props.imageUrl) {
            console.log(this.props.imageUrl)
            for (let i = 0; i < this.props.imageUrl.length; i++) {
                if (this.props.imageUrl[i] != '?') {
                    companyImage += this.props.imageUrl[i];
                } else {
                    break;
                }
            }
            //console.log(companyImage)
        }
        return (
            <div>
                <Container style={{ marginTop: "20px", width: "80%" }}>
                    <Row style={{ marginTop: "10px" }}>
                        <Col md="2">
                            <Image style={{ height: "100px", width: "100%" }} src={companyImage} thumbnail />
                        </Col>
                        <Col md="10">
                            <Row>
                                <Col md="10">
                                    <Link to={{ pathname: "/jobApplication", state: this.props._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>{this.props.jobTitle}</Link>
                                </Col>
                                <Col md="2">
                                    <FaRegHeart />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="9">
                                    {this.props.companyName} - {this.props.city}, {this.props.state}
                                </Col>
                                <Col md="3" style={{ width: "200px" }}>
                                    <p>{this.props.postedDate.substring(0, 10)}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>
        )
    }
}