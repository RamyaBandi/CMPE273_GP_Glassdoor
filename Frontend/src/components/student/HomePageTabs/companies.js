import React, { Component } from 'react';
import './Tabs.css'
import default_pic from '../../../images/company_default.jpg'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_COMPANY } from '../../../config/routeConstants'
import axios from 'axios'


class CompaniesTab extends Component {
    constructor() {
        super();
        this.state = {
            companyData: []
        }
    }
    componentDidMount() {
        if (this.props.location.state.detail) {
            let searchParameter = this.props.location.state.detail
            axios.get(BACKEND_URL + GET_SEARCH_COMPANY, {
                params: {
                    searchParameter: this.props.location.state.detail
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
                    console.log(error.response.data.msg)
                })
        }
    }
    render() {
        let company = this.state.companyData
        return (
            <div class="body">
                <div class="card" style={{ width: "50%", left: "25%", right: "25%", height: "500px" }}>
                    <img class="card-img-top" src={default_pic} alt="Card image cap" />
                    <div class="card-body">
                        <div style={{ width: "100%" }}>
                            <div style={{ width: "30%", float: "left" }}>
                                <div style={{ display: "flex", justifyContent: "normal" }}>
                                    <Link to ="/overview" class="companyName"> {company.companyName}</Link>
                                    <p class="companyRating"> {company.averageRating} <i class="fas fa-star"></i></p>
                                </div>
                                <p class="companyLocation"> {company.headquarters}</p>
                            </div>
                            <div style={{ width: "40%", float: "right" }}>
                                <button class="companySite"><Link to = "{company.website}">Visit Website</Link></button>
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
            </div>
        )
    }
}

export default CompaniesTab;