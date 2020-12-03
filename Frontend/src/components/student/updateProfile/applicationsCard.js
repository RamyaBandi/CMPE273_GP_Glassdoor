import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../../employer/jobs/listJobs/JobCard/JobCard.styles.css'
import { BACKEND_URL, APPLICATION_ROUTE, PUT_APPLICATION } from '../../../config/routeConstants';
import Axios from 'axios'

class ApplicationCard extends Component {
    state = {
    }
    componentDidMount() {
        console.log(this.props)
    }
    handleJobDetails = () => {
        localStorage.setItem("jobId", this.props.props.job._id);
        // console.log(this.props.props.props)
        this.props.props.props.history.push(
            {
                pathname: '/employer/jobs/edit',
                state: { job: { ...this.props.props.job } }
            }
        )


    }
    handleChange = (e) => {
        //  console.log(this.state);
        let { value, id } = e.target;
        this.setState({ [id]: value });
        // console.log(this.state)
    };
    handleWithdraw = () => {
        let data = {
            status: "Withdrawn",
            applicationId: this.props.props.app._id
        }
        Axios.put(`${BACKEND_URL}${APPLICATION_ROUTE}${PUT_APPLICATION}`, data)
            .then((res) => {
                console.log("Updated Successfully" + res)
                window.alert("Updated Successfully")
            })
            .catch((err) => {
                console.log("Unable to update")
                window.alert("Unable to update")
            })
    }

    render() {
        let data = this.props.props.app
        let buttonVar
        if (data.jobId && data.jobId.postedDate) {
            data.jobId.postedDate = data.jobId.postedDate.split('T')[0]
        }
        if (data.appliedDate) {
            data.appliedDate = data.appliedDate.split('T')[0]
        }
        if (data.status == "Submitted") {
            buttonVar = <button onClick={this.handleWithdraw} style={{ marginRight: "10px" }} class="btn btn-success">Withdraw</button>

        }
        return (
            <div>
                <div class="card jobCard">
                    <h5 class="card-header">{data.jobId.companyName}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{data.jobId.jobTitle}</h5>
                        <p class="card-text">Industry : {data.jobId.industry}</p>
                        <p class="card-text">Average Salary : {data.jobId.averageSalary}</p>
                        {/* <p class="card-text">Responsibilities : {data.jobId.responsibilities}</p> */}
                        <p class="card-text">Location : {data.jobId.streetAddress},{data.jobId.city},{data.jobId.state},{data.jobId.country},{data.jobId.zip}</p>
                        <p class="card-text">Location :{data.jobId.city},{data.jobId.state},{data.jobId.country}</p>
                        <p class="card-text">Remote : {data.jobId.remote ? "Yes" : "No"}</p>
                        <p class="card-text">Status : {data.applicationstatus}</p>

                        <p class="card-text"><small class="text-muted">Posted On:{data.jobId.postedDate}</small></p>
                        <p class="card-text"><small class="text-muted">Applied On:{data.appliedDate}</small></p>
                        {buttonVar}
                        {/* <button onClick={this.handleViewApplicants} class="btn btn-success">View Applications</button>  */}

                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationCard;