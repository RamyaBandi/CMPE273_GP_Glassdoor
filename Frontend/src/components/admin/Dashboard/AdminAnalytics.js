import React, { Component } from 'react';
import './adminAnalytics.css'
import ReviewsPerDay from './ReviewsPerDay'
import TopReviewedCompanies from './topReviewedCompanies'
import TopAverageCompanies from './TopAverageCompanies'
import TotalAcceptedReviews from './TotalAcceptedReviews'
import TopCEO from './TopCEO'
import TopViewedCompanies from './TopViewedCompanies'

class adminAnalytics extends Component {
    render() {
        return (
            <table class="admin-table">
                <tr class="admin-row">
                    <td class="column1">
                        <ReviewsPerDay />
                    </td>
                    <td class="column2">
                        <TopReviewedCompanies />
                    </td>
                    <td class="column3">
                        <TopAverageCompanies />
                    </td>
                </tr>
                <tr class="admin-row">
                    <td class="column1">
                        <TotalAcceptedReviews />
                    </td>
                    <td class="column2">
                        <TopCEO />
                    </td>
                    <td class="column3">
                        <TopViewedCompanies />
                    </td>
                </tr>
            </table>
            // <div class="container">
            //     <div class="row">
            //         <div class="column1">
            //             <ReviewsPerDay />
            //         </div>
            //         <div class="column2">
            //             <TopReviewedCompanies />
            //         </div>
            //         <div class="column3">
            //             <TopAverageCompanies />
            //         </div>
            //     </div>
            //     <div class="row">
            //         <div class="column1">
            //             <TotalAcceptedReviews />
            //         </div>
            //         <div class="column2">
            //             <TopCEO />
            //         </div>
            //         <div class="column3">
            //             <TopViewedCompanies />
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default adminAnalytics;