import React, { Component } from 'react';
import './EmployerHome.styles.css'

class EmployerHomePage extends Component {
    render() {
        console.log(this.props)
        console.log("HomePage")
        return (
            <div>
                <div className="homeLayout">
                    <div className="homeGrid">
                        <div className="sq zoom">
                            <h4 ><a href="/employer/jobs" className="Glasslink">Jobs</a></h4>
                        </div>
                        {/* <div className="sq zoom">
                            <h4 >  <a href="/employer/candidates" className="Glasslink">Candidates</a></h4>
                        </div> */}
                        <div className="sq zoom">
                            <h4>  <a className="Glasslink" href="/company/profile">Employer Profile</a></h4>
                        </div>
                        <div className="sq zoom">
                            <h4 > <a href="/employer/analytics" className="Glasslink">Analytics</a></h4>
                        </div>
                        <div className="sq zoom">
                            <h4 ><a href="/employer/reviews" className="Glasslink">Reviews</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployerHomePage;