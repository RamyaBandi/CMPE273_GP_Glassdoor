import React, { Component } from 'react';
import './Tabs.css'
import default_pic from '../../../images/company_default.jpg'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BACKEND_URL, GET_SEARCH_COMPANY } from '../../../config/routeConstants'
import axios from 'axios'
import './Paginate.css'

class CompaniesTab extends Component {
    constructor() {
        super();
        this.state = {
            companyData: [],
            page: 1,
            limit: 10
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.getCompanySearchResults = this.getCompanySearchResults.bind(this)
    }
    componentDidMount() {
        // if (this.props.location.state.detail) {
            this.getCompanySearchResults()
        // }
    }
    getCompanySearchResults() {
        this.setState({
            companyData : []
        })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_SEARCH_COMPANY, {
            params: {
                searchParameter: this.props.location.state.detail,
                // searchParameter: "Test Company",
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Company Data", response.data)
                    this.setState({
                        companyData: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    handlePageClick = (e) => {
        // console.log("Page number",e.selected)
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getCompanySearchResults()
        });
    }
    render() {
        let company = this.state.companyData
        console.log("Company", company)
        return (
            <div class="student-tabs-body">
                <React.Fragment>
                {company &&
                    <div class="card tabs-card" style={{ width: "50%", left: "25%", right: "25%", height: "500px" }}>
                        <img class="card-img-top" src={default_pic} alt="Card image cap" />
                        <div class="card-body">
                            <div style={{ width: "100%" }}>
                                <div style={{ width: "30%", float: "left" }}>
                                    <div style={{ display: "flex", justifyContent: "normal" }}>
                                    <Link to= {{
                                        pathname: "/overview",
                                        search: '?query=abc',
                                        state: { companyId: company._id }
                                        }}
                                    class="companyName">{company.companyName}</Link>
                                        <p class="companyRating"> {company.averageRating} <i class="fas fa-star"></i></p>
                                    </div>
                                    <p class="companyLocation"> {company.headquarters}</p>
                                </div>
                                <div style={{ width: "40%", float: "right" }}>
                                    <button class="companySite"><Link to="{company.website}">Visit Website</Link></button>
                                </div>
                            </div>
                            <div class="companyInsights">
                                <div class="insights">
                                    <p class="insightHeading">Job & Company Insights</p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of reviews:</p><p class="companyReviewsContent"> {company.NumberOfReviews} </p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews:</p><p class="companyReviewsContent"> {company.salaryReviews}</p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> {company.interviewReviews} </p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                                    }
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

export default CompaniesTab;