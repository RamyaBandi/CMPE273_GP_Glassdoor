import React, { Component } from 'react';
import './Tabs.css'
import default_pic from '../../../images/company_default.jpg'
import { Link } from 'react-router-dom';


class CompaniesTab extends Component {
    render() {
        return (
            <div class="body">
                <div class="card" style={{ width: "50%", left: "25%", right: "25%", height: "500px" }}>
                    <img class="card-img-top" src={default_pic} alt="Card image cap" />
                    <div class="card-body">
                        <div style={{ width: "100%" }}>
                            <div style={{ width: "30%", float: "left" }}>
                                <div style={{ display: "flex", justifyContent: "normal" }}>
                                    <Link to ="#" class="companyName"> Company Name</Link>
                                    <p class="companyRating"> 4.3 <i class="fas fa-star"></i></p>
                                </div>
                                <p class="companyLocation"> location</p>
                            </div>
                            <div style={{ width: "40%", float: "right" }}>
                                <button class="companySite"> Visit Website</button>
                            </div>
                        </div>
                        <div class="companyInsights">
                            <div class="insights">
                                <p class="insightHeading">Job & Company Insights</p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent"> 100,000</p></p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews: </p><p class="companyReviewsContent"> 100,000</p></p>
                                <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> 100,000</p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompaniesTab;