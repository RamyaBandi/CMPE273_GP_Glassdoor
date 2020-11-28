import React, { Component } from 'react';
import Axios from 'axios'
import { BACKEND_URL, JOB_ROUTE, GET_COMPANY_JOBS } from '../../../../config/routeConstants'
import JobCard from './JobCard/JobCard';

class ListCompanyJobs extends Component {
    state = {
        jobsList: [],
        limit: 10,
        page: 1,
    }
    componentDidMount = () => {
        console.log(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOBS}`)
        Axios.get(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOBS}`, {
            params: {
                companyId: localStorage.getItem('mongoId'),
                limit: this.state.limit,
                page: this.state.page
            }
        })
            .then((res) => {
                this.setState({ jobsList: [...res.data.jobs] })
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        let renderVar
        if (this.state.jobsList.length > 0) {
            renderVar = this.state.jobsList.map((job, key) => {
                return <JobCard props={{ job: job, props: this.props }} key={key} />
            })
        }
        return (
            <div>
                <div class="card-deck">

                    {renderVar}
                </div>
            </div>
        );
    }
}

export default ListCompanyJobs;