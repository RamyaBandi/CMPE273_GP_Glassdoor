import React, { Component } from 'react';
import './Tabs.css'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_SALARY } from '../../../config/routeConstants'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Paginate.css'

class SalariesTab extends Component {
    constructor() {
        super();
        this.state = {
            salaryData: [],
            isLoading: true,
            page: 1,
            limit: 10,
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
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

    // Prepare Data for Pagination

    receivedData() {
        let count = 0
        console.log("Data", this.state.salaryData)
        const slice = this.state.salaryData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((salary, i) => <React.Fragment>
            <div class="card tabs-card" key={i} style={{ width: "50%", left: "25%", right: "25%", height: "400px" }}>
                <div class="card-body">
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "60%", float: "left" }}>
                            <div style={{ display: "flex", justifyContent: "normal" }}>
                                <Link to="/overview" class="companyName"><b>{salary.companyName}</b></Link>
                                <p class="companyRating"> {salary.averageRating} <i class="fas fa-star"></i></p>
                            </div>
                            <h6 style={{ "width": "250%" }}><b>Job:  </b>{salary.jobTitle}</h6>
                            <h6 style={{ "width": "250%" }}><b>Base Salary:</b><CurrencyFormat value={salary.baseSalary} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h6>
                            <p class="companyLocation" style={{ "width": "250%" }}><b>Headquarters: </b> {salary.headquarters} </p>
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
        </React.Fragment>)
        this.setState({
            pageCount: Math.ceil(this.state.salaryData.length / this.state.perPage),

            postData
        })
    }

    getSalarySearchResults() {
        this.setState({
            salaryData: []
        })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
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
                        salaryData: response.data,
                        isLoading: false
                    }, () => {
                        this.receivedData()
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    }

    render() {
        return (
            <div class="student-tabs-body">
            <h5 style = {{textAlign : "center"}}> Company based Salary Search Results</h5>
                {this.state.isLoading ? <h6 style={{ textAlign: "center", color: "#0caa41" }}> Loading......</h6> : this.state.postData}
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