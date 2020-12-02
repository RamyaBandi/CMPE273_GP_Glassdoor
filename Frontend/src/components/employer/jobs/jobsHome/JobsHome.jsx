import React, { Component } from 'react';

class JobsHome extends Component {
    state = {}
    render() {
        return (
            <div>
                {/* <h2>Jobs Home</h2> */}
                <div className="homeLayout">
                    <div className="homeGrid">
                        <div className="sq zoom">
                            <h4 ><a href="/employer/jobs/post" className="Glasslink">Post Job</a></h4>
                        </div>
                        <div className="sq zoom">
                            <h4 >  <a href="/employer/jobs/list" className="Glasslink">List Jobs</a></h4>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default JobsHome;