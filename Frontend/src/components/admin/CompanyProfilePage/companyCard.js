import React, { Component } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class CompanyCard extends Component {
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
            console.log(companyImage)
        }

        return (
            <div>
                <Container style={{ marginTop: "20px", marginBottom: "20px", width: "80%", padding: "20px" }} className="block-example border">
                    <Row style={{ marginBottom: "10px" }}>
                        <Col md="12">
                            <h3><Link to={{ pathname: "/companyProfilePage/" + this.props._id, state: this.props.companyName }} style={{ textDecoration: 'none', color: '#1861bf' }}>{this.props.companyName}</Link></h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Image style={{ height: "100px", width: "100%" }} src={companyImage} thumbnail />
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="12">
                                    <b>HeadQuarters :</b> {this.props.headquarters}
                                </Col>
                                <Col md="12">
                                    <b>Website : </b> {this.props.website}
                                </Col>
                                <Col md="12">
                                    <b>CEO Name : </b> {this.props.ceoName}
                                </Col>
                            </Row>
                            {/* <Row>

                                
                                <Col md="12">
                                    {this.props.headquarters}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.props.website}
                                </Col>
                            </Row> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}