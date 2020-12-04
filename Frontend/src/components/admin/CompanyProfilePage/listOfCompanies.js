import React, { Component } from 'react';
import { Container, Col, Row, Form, FormControl, Button } from 'react-bootstrap';
import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_ALL_COMPANIES_ADMIN, GET_COMPANY_BY_COMPANYNAME_SEARCH_ADMIN } from './../../../config/routeConstants';
import CompanyCard from './companyCard';
import ReactPaginate from 'react-paginate';
const _ = require('lodash');

export default class ListOfCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            filteredCompanies: [],
            page: 1,
            limit: 10,
            totalPages: 0,
            redirect: null
        }
        
    }

    findCompanies = () => {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_COMPANY_BY_COMPANYNAME_SEARCH_ADMIN + '?companyName=')
            .then(response => {
                console.log(response.data);
                this.setState({ companies: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        // console.log("In componentDidMount");
        // axios.get(BACKEND_URL + GET_ALL_COMPANIES_ADMIN)
        //     .then(response => {
        //         //console.log(response.data);
        //         this.setState({ companies: response.data.companies, filteredCompanies: response.data.companies });
        //         console.log(this.state.companies);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     }
        // )
        this.getResults();
    }

    handlePageClick = (e) => {
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getResults()
        });
        console.log("Page number", e.selected)
    }

    async getResults() {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(BACKEND_URL + GET_ALL_COMPANIES_ADMIN, {
            params: {
                page : this.state.page,
                limit : this.state.limit
            }
        })
            .then(response => {
                //console.log(response.data);
                this.setState({ companies: response.data.companies, filteredCompanies: response.data.companies, totalPages: response.data.totalPages });
                console.log(this.state.companies);
            })
            .catch((error) => {
                console.log(error);
            }
        )
    }

    handleChange = (e) => {
        let { value, id } = e.target;
        this.setState({ [id]: value }, () => this.getResults());
    };

    companySearchHandler = (e) => {
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
                    <Container style={{ marginBottom: "30px", marginTop: "30px", width: "80%" }}>
                        <Row>
                            <Col>
                                <h4><b>List Of Companies</b></h4>
                            </Col>
                        </Row>
                        <Row style={{ float: "right", marginTop: "10px" }}>
                            <Col md="auto">
                                <FormControl style={{ width: "100%", height: "40px" }} type="text" placeholder="Search Companies" onChange={this.companySearchHandler} />
                            </Col>

                        </Row>
                    </Container>
                    <br />
                    <Container style={{ marginBottom: "30px", marginTop: "30px" }}>
                        {this.state.filteredCompanies.map((item) => {
                            return <CompanyCard {...item} />;
                        })}
                    </Container>
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />

                    <div className="input-group"
                        style={{ width: "200px", justifyContent: "space-around" }}
                    >
                        <div className="input-group-prepend">
                            <label  >Page Limit </label>
                        </div>
                        <select className="custom-select" value={this.state.limit} onChange={this.handleChange} id="limit">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </Container>
            </div >
        )
    }
}