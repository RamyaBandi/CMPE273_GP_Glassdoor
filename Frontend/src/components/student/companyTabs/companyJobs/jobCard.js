import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import Moment from 'moment';
import { MdFavoriteBorder } from 'react-icons/md';

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postedDate: Moment("{this.props.postedDate}").format('MM-DD-YYYY')
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
                                    {this.props.jobTitle}
                                </Col>
                                <Col md="2">
                                    <MdFavoriteBorder />
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