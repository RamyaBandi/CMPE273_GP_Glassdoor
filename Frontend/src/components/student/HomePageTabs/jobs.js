import React, { Component } from 'react';
import './Tabs.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_JOBS, GET_JOBS_HOMEPAGE } from '../../../config/routeConstants'

class JobsTab extends Component {
    constructor() {
        super();
        this.state = {
            jobsData: []
        }
    }
    componentDidMount() {
        if (this.props.location.state.detail !== "") {
            let searchParameter = this.props.location.state.detail
            axios.get(BACKEND_URL + GET_SEARCH_JOBS, {
                params: {
                    searchParameter: this.props.location.state.detail
                }
            })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log("Jobs Data", response.data)
                        this.setState({
                            jobsData: response.data
                        })
                    }
                })
                .catch(error => {
                    console.log(error.response.data.msg)
                })
        }
        else if (this.props.location.state.detail === ""){
            axios.get(BACKEND_URL + GET_JOBS_HOMEPAGE)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log("Jobs Data", response.data)
                        this.setState({
                            jobsData: response.data
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
            {this.state.jobsData.map((job, i)=>{
                return <div class="card" key ={i} style={{ width: "50%", left: "25%", right: "25%", height: "400px" }}>
                    <div class="card-body">
                        <div style={{ width: "100%" }}>
                            <div style={{ width: "30%", float: "left" }}>
                                <div style={{ display: "flex", justifyContent: "normal" }}>
                                    <Link to="/overview" class="companyName"> {job.companyName}</Link>
                                    <p class="companyRating">{job.averageRating}<i class="fas fa-star"></i></p>
                                </div>
                                <h2> {job.jobTitle}</h2>
                                <p class="companyLocation"> {job.streetAddress},{job.city}, {job.state}, {job.zip}</p>
                            </div>
                            <div style={{ width: "40%", float: "right" }}>
                                <button class="companySite"> {job.website}</button>
                            </div>
                        </div>
                        <div class="companyInsights">
                            <div class="insights">
                                <p class="insightHeading">Job & Company Insights</p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent"> {job.NumberOfReviews}</p></p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews:</p><p class="companyReviewsContent"> {job.salaryReviews}</p></p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews:</p><p class="companyReviewsContent"> {job.interviewReviews}</p></p>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>})}
            </div>
        )
    }
}

export default JobsTab;