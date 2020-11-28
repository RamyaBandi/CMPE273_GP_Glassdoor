import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class JobCard extends Component {
    state = {
        redirect: false
    }
    componentDidMount() {
        console.log(this.props)
    }
    handleClick = () => {
        localStorage.setItem("jobId", this.props.props.job._id);
        // console.log(this.props.props.props)
        this.props.props.props.history.push(
            {
                pathname: '/employer/jobs/edit',
                state: { job: { ...this.props.props.job } }
            }
        )
        // this.setState({
        //     redirect: true
        // })

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/employer/jobs/edit' />
        }
    }
    render() {
        let data = this.props.props.job

        if (data.postedDate) {
            data.postedDate = data.postedDate.split('T')[0]
        }
        return (
            <div>
                {this.renderRedirect()}
                <div class="card">
                    <h5 class="card-header">{data.companyName}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{data.jobTitle}</h5>
                        <p class="card-text">Industry : {data.industry}</p>
                        {/* <p class="card-text">Responsibilities : {data.responsibilities}</p> */}
                        {/* <p class="card-text">Location : {data.streetAddress},{data.city},{data.state},{data.country},{data.zip}</p> */}
                        <p class="card-text">Location :{data.city},{data.state},{data.country}</p>

                        <p class="card-text">Remote : {data.remote ? "Yes" : "No"}</p>
                        <p class="card-text"><small class="text-muted">{data.postedDate}</small></p>


                        <button onClick={this.handleClick} class="btn btn-success">Edit Job</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobCard;