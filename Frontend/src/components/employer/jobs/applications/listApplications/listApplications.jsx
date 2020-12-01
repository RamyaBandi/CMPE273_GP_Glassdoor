import Axios from 'axios';
import React, { Component } from 'react';
import { GET_APPLICATIONS_JOBID, BACKEND_URL, APPLICATION_ROUTE } from '../../../../../config/routeConstants';
import ApplicationCard from './ApplicationCard';
import './listApplications.styles.css'
class ListApplications extends Component {
    state = {
        apps: [],
        limit: 10,
        page: 1
    }
    componentDidMount() {
        console.log(this.props)
        Axios.get(`${BACKEND_URL}${APPLICATION_ROUTE}${GET_APPLICATIONS_JOBID}`, {
            params: {
                jobId: localStorage.getItem('jobId'),
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res);
            this.setState({ apps: [...res.data.results] })
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let renderVar
        if (this.state.apps.length > 0) {
            renderVar = this.state.apps.map((app, key) => {
                return <ApplicationCard props={app} key={key} />
            })
        }
        return (
            <div className="containerList">
                <div className="applicationsList">
                    <h4>
                        Applications for {this.props.location.state.job.jobTitle}
                    </h4>
                    {/* <div class="card-deck"> */}
                    {renderVar}
                    {/* </div> */}
                </div>
            </div>
        );
    }
}

export default ListApplications;