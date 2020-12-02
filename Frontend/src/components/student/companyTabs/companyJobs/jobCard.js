import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render = () => {
        return (
            <div>
                <Container style={{ marginTop: "20px", width: "80%" }}>
                    <Row style = {{marginTop: "10px", marginLeft: "10px"}}>
                        <Col md="2">
                            Company Image
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
                                <Col md="3" style = {{width: "200px"}}>
                                    <p>{this.props.postedDate.substring(0, 10)}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            </div>
        )
    }
}