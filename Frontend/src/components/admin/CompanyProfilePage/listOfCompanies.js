import React, { Component } from 'react';
import { Container, Col, Row, Form, FormControl, Button } from 'react-bootstrap';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_ALL_COMPANIES_ADMIN, GET_COMPANY_BY_COMPANYNAME_SEARCH_ADMIN } from './../../../config/routeConstants';
import CompanyCard from './companyCard';
const _ = require('lodash');

export default class ListOfCompanies extends Component {
    state = {
        companies: [],
        filteredCompanies:[],
        redirect: null
    }

    findCompanies = () => {
        axios.get(BACKEND_URL + GET_COMPANY_BY_COMPANYNAME_SEARCH_ADMIN + '?companyName=')
        .then(response => {
            console.log(response.data);
            this.setState({companies: response.data});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        console.log("In componentDidMount");
        axios.get(BACKEND_URL + GET_ALL_COMPANIES_ADMIN)
            .then(response => {
                //console.log(response.data);
                this.setState({ companies: response.data.companies,filteredCompanies:response.data.companies });
                console.log(this.state.companies);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    companySearchHandler=(e) =>{
        let searchTxt = e.target.value;
        let list = this.state.companies;
        let fList = _.filter(list, function (o) { return o.companyName.toLowerCase().includes(searchTxt.toLowerCase()); });
        this.setState({
            filteredCompanies: fList,
            searchTxt: searchTxt
        })
    }

    render = () => {
        return (
            <div style={{ backgroundColor: "#eaeaea" }}>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Container style = {{marginBottom: "30px", marginTop: "30px",width:"80%"}}>
                    <Row>
                        <Col>
                            <h4><b>List Of Companies</b></h4>
                        </Col>
                    </Row>
                    <Row style={{ float: "right", marginTop: "10px" }}>
                        <Col md="auto">
                            <FormControl style={{ width: "100%", height: "40px" }} type="text" placeholder="Search Companies" onChange={this.companySearchHandler}/>
                        </Col>

                    </Row>
                    </Container>
                    <br/>
                    <Container style={{ marginBottom: "30px", marginTop: "30px" }}>
                        {this.state.filteredCompanies.map((item) => {
                            return <CompanyCard {...item} />;
                        })}
                    </Container>
                </Container>
            </div>
        )
    }
}