import React, { Component } from 'react';

class ApplicationCard extends Component {
    state = {
        applicationtatus: ""
    }
    render() {
        console.log(this.props.props)
        let data = this.props.props
        let date
        if (data.appliedDate) {
            date = data.appliedDate.split('T')[0]
        }
        return (
            <div>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{data.studentId.studentName}</h5>
                        <p className="card-text">{data.studentId.email}</p>
                        <p className="card-text">Applied on : {date}</p>
                        <p className="card-text">Application Status : {data.applicationstatus}</p>
                        <p className="card-text">Resume : {data.resume}</p>


                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationCard;