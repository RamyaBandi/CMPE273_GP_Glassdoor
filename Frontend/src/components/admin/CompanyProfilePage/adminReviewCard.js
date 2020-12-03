import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render = () => {
        return(
            <div>
                <Container style={{ marginTop: "20px", width: "80%" }}>
                    <Row style = {{marginTop: "10px", marginLeft: "10px"}}>
                        {/* <Col md="2">
                        </Col> */}
                        <Col>
                            <Row>
                                <Col md="8">
                                    <h4><b>{this.props.headline}</b></h4>
                                </Col>
                                <Col md="4">
                                    {this.props.approvalstatus === "Approved" ? (<p style = {{color: "green"}}>Approval Status: <b>{this.props.approvalstatus}</b></p>)
                                    : (<p style = {{color: "red"}}>Approval Status: <b>{this.props.approvalstatus}</b></p>)}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="9">
                                    {this.props.description}
                                </Col>
                                <Col md="3">
                                <p>{this.props.reviewDate.substring(0, 10)}</p>
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