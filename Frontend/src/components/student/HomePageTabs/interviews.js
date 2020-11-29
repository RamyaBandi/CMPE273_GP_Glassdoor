import React, { Component } from 'react';
import './Tabs.css'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_INTERVIEW } from '../../../config/routeConstants'
import axios from 'axios'


class InterviewsTab extends Component {
    constructor() {
        super();
        this.state = {
            interviewData: []
        }
    }
    componentDidMount() {
        if (this.props.location.state.detail) {
            let searchParameter = this.props.location.state.detail
            axios.get(BACKEND_URL + GET_SEARCH_INTERVIEW, {
                params: {
                    searchParameter: this.props.location.state.detail
                }
            })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log("Company Data", response.data)
                        this.setState({
                            interviewData: response.data
                        })
                    }
                })
                .catch(error => {
                    console.log(error.response.data.msg)
                })
        }
    }
    render() {
        return (
            <div class="body">
                {this.state.interviewData.map((interview, i) => {
                    return <div class="card" style={{ width: "50%", left: "25%", right: "25%", height: "400px" }}>
                        <div class="card-body">
                            <div style={{ width: "100%" }}>
                                <div style={{ width: "30%", float: "left" }}>
                                    <div style={{ display: "flex", justifyContent: "normal" }}>
                                        <Link to="/overview" class="companyName"> {interview.companyName}</Link>
                                        <p class="companyRating"> {interview.averageRating} <i class="fas fa-star"></i></p>
                                    </div>
                                    <p class="companyLocation"> {interview.headquarters}</p>
                                </div>
                                <div style={{ width: "40%", float: "right" }}>
                                    <button class="companySite"> Visit Website</button>
                                </div>
                            </div>
                            <div class="companyInsights">
                                <div class="insights">
                                    <p class="insightHeading">Job & Company Insights</p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent"> {interview.NumberOfReviews}</p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews: </p><p class="companyReviewsContent"> {interview.interviewReviews}</p></p>
                                    <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> {interview.interviewReviews}</p></p>
                                </div>
                                <div>
                                <p class="insightHeading">Interview Experience</p>
                                <p class="card-text"><p class="companyReviewsHeading"> Job :  </p><p class="companyReviewsContent"> {interview.jobTitle}</p></p>
                                <p class="card-text"><p class="companyReviewsHeading"> Experience :  </p><p class="companyReviewsContent"> {interview.description}</p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

export default InterviewsTab;