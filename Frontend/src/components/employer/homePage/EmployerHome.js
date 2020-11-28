import React, { Component } from 'react';


class EmployerHomePage extends Component {
    render() {
        console.log(this.props)
        console.log("HomePage")
        return (
            <div>
                <h2> employer Home Page</h2>
                <a href="/employer/jobs">Jobs</a>
                <a href="/employer/candidates">Candidates</a>
                <a href="/company/profile">Employer Profile</a>
                <a href="/employer/analytics">Analytics</a>

            </div>
        )
    }
}

export default EmployerHomePage;