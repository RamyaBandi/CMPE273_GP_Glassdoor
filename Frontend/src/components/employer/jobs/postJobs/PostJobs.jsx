import React, { Component } from 'react';
import './PostJobs.styles.css'
import Axios from 'axios'
import routeConstants from '../../../../config/routeConstants';
class PostJobs extends Component {
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
        const { value, id } = e.target;
        this.setState({ [id]: value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            ...this.state,
            companyId: localStorage.getItem('mongoId'),
            companyName: localStorage.getItem('name'),
        }
        if (this.state.remote) {
            data.remote = true;
        }
        else {
            data.remote = false;
        }
        console.log(data);
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        Axios.post(`${routeConstants.BACKEND_URL}${routeConstants.JOB_ROUTE}${routeConstants.POST_COMPANY_JOB}`, data).then((res) => {
            console.log(res);
            window.alert("Job created Successfully")
            this.props.history.push('/employer/jobs/list')
        }).catch((err) => {
            console.log("Error Posting Job");
            window.alert("Error posting job")
        })
    }
    render() {
        return (
            <div className="postJobContainer">
                <div className="postJobs">
                    <h2>Post Jobs</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label >Title</label>
                                <input type="text" className="form-control" id="jobTitle" placeholder="" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Industry</label>
                                <input type="text" className="form-control" id="industry" placeholder="" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Responsibilities</label>
                            <textarea type="text" className="form-control" id="responsibilities" placeholder="" onChange={this.handleChange} />
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
                                <input type="text" className="form-control" id="country" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-4">
                                <label >State</label>
                                <input type="text" className="form-control" id="state" onChange={this.handleChange} />

                            </div>
                            <div className="form-group col-md-2">
                                <label >Zip</label>
                                <input type="text" className="form-control" id="zip" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="remote" onChange={this.handleChange} />
                                <label className="form-check-label" >
                                    Remote?
      </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Post Job</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostJobs;