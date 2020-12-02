import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class CompanyCard extends Component {
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
                        <Col md="2">
                            Company Image
                        </Col>
                        <Col md="10">
                            <Row>
                                <Col md="9">
                                    <Link to={{ pathname: "/companyProfilePage", state: this.props.companyName }} style={{ textDecoration: 'none', color: '#1861bf' }}>{this.props.companyName}</Link>
                                </Col>
                                <Col md="3">
                                    {this.props.headquarters}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.props.website}
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