import React, { Component } from 'react';
import routeConstants from '../../../../config/routeConstants'
import Axios from 'axios'
class EditJobs extends Component {
    state = {
        companyId: "",
        companyName: "",
        jobTitle: "",
        industry: "",
        responsibilities: "",
        country: "",
        remote: false,
        streetAddress: "",
        city: "",
        state: "",
        zip: 0,
        averageSalary: ""
    }
    handleChange = (e) => {
        //  console.log(this.state);
        let { value, id } = e.target;

        value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [id]: value });
    };
    componentDidMount() {
        this.setState({
            ...this.props.location.state.job,
            // remote: this.props.location.state.job ? "on" : "off"
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            ...this.state,
            jobId: localStorage.getItem('jobId'),

        }
        // if (this.state.remote === "Yes") {
        //     data.remote = true;
        // }
        // else {
        //     data.remote = false;
        // }
        console.log(data);
        Axios.put(`${routeConstants.BACKEND_URL}${routeConstants.JOB_ROUTE}${routeConstants.PUT_COMPANY_JOB}`, data).then((res) => {
            console.log(res);
            window.alert("Job Updated Successfully")
            this.props.history.push('/employer/jobs/list')
        }).catch((err) => {
            console.log("Error Updating Job");
            window.alert("Error Updating job")
        })
    }
    render() {
        // console.log(this.props.location.state)
        let data = this.props.location.state.job
        return (
            <div>
                <div className="postJobContainer">
                    <div className="postJobs">
                        <h2>Post Jobs</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >Title</label>
                                    <input type="text" className="form-control" id="jobTitle" value={this.state.jobTitle} placeholder="" onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >Industry</label>
                                    <input type="text" className="form-control" id="industry" value={this.state.industry} placeholder="" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Responsibilities</label>
                                <textarea type="text" className="form-control" id="responsibilities" value={this.state.responsibilities} placeholder="" onChange={this.handleChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group  col-md-3">
                                    <label >Average Salary</label>
                                    <input type="number" className="form-control" id="averageSalary" placeholder="" onChange={this.handleChange} />
                                </div>
                                <div className="form-group  col-md-5">
                                    <label >Street Address</label>
                                    <input type="text" className="form-control" id="streetAddress" value={this.state.streetAddress} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label >City</label>
                                    <input type="text" className="form-control" id="city" value={this.state.city} onChange={this.handleChange} />
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Country</label>
                                    <input type="text" className="form-control" id="country" value={this.state.country} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label >State</label>
                                    <input type="text" className="form-control" id="state" value={this.state.state} onChange={this.handleChange} />

                                </div>
                                <div className="form-group col-md-2">
                                    <label >Zip</label>
                                    <input type="text" className="form-control" id="zip" value={this.state.zip} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="remote" checked={this.state.remote} onChange={this.handleChange} />
                                    <label className="form-check-label" >
                                        Remote?
      </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Update Job Details</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditJobs;