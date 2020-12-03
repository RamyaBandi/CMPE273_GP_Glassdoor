import React, { Component } from 'react';
import { BACKEND_URL, APPLICATION_ROUTE, PUT_APPLICATION } from '../../../../../config/routeConstants';
import Axios from 'axios'
import './ApplicationCard.styles.css'
class ApplicationCard extends Component {
    state = {
        status: ""
    }
    handleChange = (e) => {
        //  console.log(this.state);
        let { value, id } = e.target;
        this.setState({ [id]: value });
        // console.log(this.state)
    };
    componentDidMount() {
        this.setState({ status: this.props.props.status })
    }
    handleClick = () => {
        let data = {
            status: this.state.status,
            applicationId: this.props.props._id
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
        // console.log(this.props.props)
        let data = this.props.props
        let date
        if (data.appliedDate) {
            date = data.appliedDate.split('T')[0]
        }
        return (
            <div>
                <div className="card applicationCard" >
                    <div className="card-body">
                        <a style={{ textDecoration: "none" }} href="/employer/student/profile"> <h5 className="card-title">{data.studentId.studentName}</h5></a>
                        <p className="card-text">{data.studentId.email}</p>
                        <p className="card-text">Applied on : {date}</p>
                        {/* <p className="card-text">{data.applicationstatus}</p> */}
                        <div className="input-group " style={{ width: "50%" }}>
                            <div className="input-group-prepend">
                                <label  >Application Status : </label>
                            </div>
                            <select className="custom-select" value={this.state.status} onChange={this.handleChange} id="status">
                                <option value="Submitted">Submitted</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Initial Screening">Initial Screening</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>

                            </select>
                        </div>
                        <p className="card-text">Resume : {data.resume}</p>

                        <button className="btn btn-success" onClick={this.handleClick}>Update Status</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationCard;