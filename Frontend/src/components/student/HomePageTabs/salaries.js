import React, { Component } from 'react';
import './Tabs.css'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_SALARY } from '../../../config/routeConstants'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Paginate.css'

class SalariesTab extends Component {
    constructor() {
        super();
        this.state = {
            salaryData: [],
            page: 1,
            limit: 10
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.getSalarySearchResults = this.getSalarySearchResults.bind(this)
    }
    componentDidMount() {
        // if (this.props.location.state.detail) {
        //     // let searchParameter = this.props.location.state.detail

        // }
        this.getSalarySearchResults()
    }

    getSalarySearchResults(){
        axios.get(BACKEND_URL + GET_SEARCH_SALARY, {
            params: {
                searchParameter: this.props.location.state.detail,
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Company Data", response.data)
                    this.setState({
                        salaryData: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response.data.msg)
            })
    }

    handlePageClick = (e) => {
        // console.log("Page number",e.selected)
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getSalarySearchResults()
        });
    }

    render() {
        return (
            <div class="body">
            <React.Fragment>
                {this.state.salaryData.map((salary, i) => {
                    return <div class="card" key={i} style={{ width: "50%", left: "25%", right: "25%", height: "400px" }}>
                        <div class="card-body">
                            <div style={{ width: "100%" }}>
                                <div style={{ width: "30%", float: "left" }}>
                                    <div style={{ display: "flex", justifyContent: "normal" }}>
                                        <Link to="/overview" class="companyName"> {salary.companyName}</Link>
                                        <p class="companyRating"> {salary.averageRating} <i class="fas fa-star"></i></p>
                                    </div>
                                    <h6 style={{"width": "250%"}}> {salary.jobTitle}</h6>
                                    <h6 style={{"width": "250%"}}> {salary.baseSalary}</h6>
                                    <p class="companyLocation"> {salary.headquarters} </p>
                                </div>
                                <div style={{ width: "40%", float: "right" }}>
                                    <button class="companySite"> Visit Website</button>
                                </div>
                            </div>
                            <div class="companyInsights">
                                <div class="insights">
                                    <p class="insightHeading">Job & Company Insights</p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent">{salary.NumberOfReviews}</p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews: </p><p class="companyReviewsContent"> {salary.salaryReviews}</p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> {salary.interviewReviews}</p></p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                })}
                </React.Fragment>
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
            </div>
        )
    }
}

export default SalariesTab;