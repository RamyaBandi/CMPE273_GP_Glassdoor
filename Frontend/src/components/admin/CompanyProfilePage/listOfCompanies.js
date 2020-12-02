import React, { Component } from 'react';
import { Container, Col, Row, Form, FormControl } from 'react-bootstrap';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_ALL_COMPANIES } from './../../../config/routeConstants';
import CompanyCard from './companyCard';

export default class ListOfCompanies extends Component {
    state = {
        companies: [],
        redirect: null
    }

    componentDidMount() {
        console.log("In componentDidMount");
        axios.get(BACKEND_URL + GET_ALL_COMPANIES)
        .then(response => {
            //console.log(response.data);
            this.setState({companies: response.data.companies});
            console.log(this.state.companies);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render = () => {
        return (
            <div style={{ backgroundColor: "#eaeaea" }}>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Container style={{ marginBottom: "30px" }}>
                        {this.state.companies.map((item) => {
                            return <CompanyCard {...item} />;
                        })}
                    </Container>
                </Container>
            </div>
        )
    }
}