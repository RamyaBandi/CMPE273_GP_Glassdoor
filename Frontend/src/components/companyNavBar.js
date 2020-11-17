import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
//import Image from 'react-bootstrap/Image';
//import Form from 'react-bootstrap/Form';
//import Navbar from 'react-bootstrap/Navbar';
//import FormControl from 'react-bootstrap/FormControl';
import { Container, Col, Row, Tab, Tabs } from 'react-bootstrap';
//import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';

class NavBar extends Component {

    profile = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', true);
        this.props.onProfile();
    }

    logout = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', false);
        this.props.onLogout();
    }

    render = () => {
        return (
            <div>
                <Container>
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5><b>Company Name</b></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                            <div>
                                <Nav className="mr-auto">
                                    <div class="box-content right">
                                        <Link to="/overview" style={{ textDecoration: 'none', color: '#1861bf' }}>Overview</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to="/reviews" style={{ textDecoration: 'none', color: '#1861bf' }}>Reviews</Link>
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
                                    <div class="box-content right">
                                        <Link to="/photos" style={{ textDecoration: 'none', color: '#1861bf' }}>Photos</Link>
                                    </div>
                                </Nav>
                            </div>
                        </Col>
                        <Col md="4" style = {{alignContent: "right"}}>
                            <Button style={{ backgroundColor: "#1861bf" }}>
                                <p style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }}>+ Add a Review</p>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default NavBar;