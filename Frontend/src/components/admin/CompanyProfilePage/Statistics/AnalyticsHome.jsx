import React, { Component } from 'react';
import ApplicantDemographics from './charts/ApplicantsDemographics';
import JobCount from './charts/JobsCount';
import './AnalyticsHome.styles.css'

class AnalyticsHome extends Component {
    state = {}
    render() {
        return (
            <div className="analyticsHome">
                <div>
                    <JobCount />
                    <ApplicantDemographics />
                </div>
            </div>
        );
    }
}

export default AnalyticsHome;