import React, { Component } from 'react';

class JobsHome extends Component {
    state = {}
    render() {
        return (
            <div>
                <h2>Jobs Home</h2>
                <a href="/employer/jobs/post">Post Job</a>
                <a href="/employer/jobs/list">List Jobs</a>
                {/* <a href="/employer/jobs/post">Post Job</a> */}

            </div>
        );
    }
}

export default JobsHome;