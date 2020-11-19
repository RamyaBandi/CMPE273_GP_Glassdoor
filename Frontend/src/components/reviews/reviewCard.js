import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import reviewCard from "./reviewCard";
import Axios from "axios";

export default class ReviewCard extends Component {
    

    render = () => {
        return (
            <div>
                Review card
                <Container style = {{marginTop: "20px", width: "45%"}}>
                    container
                    <Row>
                        <p style={{color:"#3f76cc", fontSize:"22px"}}><b>Review headline</b></p>
                    </Row>
                    <Row>
                        <Col md="3">
                        <p>Overall rating</p>
                        </Col>
                        <Col>
                        <p>Recommended to a Friend</p>
                        </Col>
                        <Col>
                        <p>CEO approval</p>
                        </Col>
                    </Row>
                    <Row>
                        <p>
                            Review Description
                        </p>
                    </Row>
                    <Row>
                        <p>
                            Pros
                        </p>
                    </Row>
                    <Row>
                        <p>
                            Cons
                        </p>
                    </Row>
                    <Row>
                    <div style={{ textAlign: "center", marginBottom: "50px", marginTop:"20px"}}>
                                <Row>
                                    <Col md={12} style={{alignContent: "right"}}>
                                        <Button style={{ backgroundColor: "#1861bf"}} onClick={this.onReviewSave} block >Helpful ()</Button>
                                    </Col>
                                </Row>
                                
                    </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

//export default Reviews