import React, { Component } from 'react';
import routeConstants from '../../../../../config/routeConstants';
import Axios from 'axios'

class StudentProfile extends Component {
    state = {}
    componentDidMount() {
        console.log(this.props)
        Axios.get(`${routeConstants.BACKEND_URL}/student${routeConstants.GET_STUDENT_SIGNUP}`,
            {
                params: {
                    studentId: this.props.location.state.studentId
                }
            }).then((res) => {
                this.setState({ ...res.data[0] })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        let data = this.state
        return (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div class="card jobCard" style={{ width: "500px", textAlign: "center" }}>
                    <h5 class="card-header">{data.studentName}</h5>
                    <div class="card-body" style={{ display: "flex", flexDirection: "column", left: "200px", }}>
                        <h5 class="card-title">{data.email}</h5>
                        <p class="card-text">Education : {data.education}</p>
                        <p class="card-text">Degree : {data.degree}</p>
                        <p class="card-text">Website : {data.website}</p>
                        <p class="card-text">Years Of Experience : {data.yearsOfExperience}</p>
                        <p class="card-text">Experience : {data.experience}</p>

                        <p class="card-text">Industry Preference : {data.industryPreference}</p>
                        <p class="card-text">Interested Job Title : {data.interestedJobtitle}</p>
                        <p class="card-text">Job Search Status : {data.jobSearchStatus}</p>
                        <p class="card-text">Race : {data.race}</p>
                        <p class="card-text">Veteran : {data.veteranStatus}</p>
                        <p class="card-text">Degree : {data.degree}</p>






                    </div>
                </div>
            </div>
        );
    }
}

export default StudentProfile;