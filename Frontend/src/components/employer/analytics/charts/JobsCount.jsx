import Axios from 'axios';
import React, { Component } from 'react';
import { GET_STATISTICS_APPLICATIONS_COUNT, STATISTICS_ROUTE, BACKEND_URL } from '../../../../config/routeConstants';
import { Pie } from 'react-chartjs-2'

class JobCount extends Component {
    state = {
        jobsLabels: ['Applied', 'Selected', 'Rejected'],
        jobs: null
    }
    componentDidMount() {
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        Axios.get(`${BACKEND_URL}${STATISTICS_ROUTE}${GET_STATISTICS_APPLICATIONS_COUNT}`, {
            params: {
                companyId: localStorage.getItem('mongoId')
            }
        }).then((res) => {
            this.setState({ jobs: res.data });
            console.log(res.data)

        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        //Jobs Plot
        let jobsData = [], jobsVar

        if (this.state.jobs !== null) {
            let temp = this.state.jobs
            Object.keys(temp).map(function (key, index) {
                // console.log(temp[key])
                jobsData.push(temp[key]);
            });
            jobsVar = <div style={{ height: "300px", width: "500px" }}>
                <Pie
                    data={{
                        labels: this.state.jobsLabels,
                        datasets:
                            [{
                                data: jobsData,
                                backgroundColor: ['#7cbdc9', '#003b32', '#d0d0b8']
                            }]
                    }}
                /></div>
        }

        return (
            <div>
                Jobs Analysis
                {jobsVar}


            </div>
        );
    }
}

export default JobCount;