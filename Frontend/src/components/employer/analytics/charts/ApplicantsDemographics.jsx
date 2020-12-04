import React, { Component } from 'react';
import Axios from 'axios';
import { GET_STATISTICS_APPLICANT_DEMOGRAPHICS, STATISTICS_ROUTE } from '../../../../config/routeConstants'
import { BACKEND_URL } from '../../../../config/routeConstants';
import { Pie } from 'react-chartjs-2'
class ApplicantDemographics extends Component {
    state = {
        raceLabels: [
            'American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Hispanic or Latino', 'Do not wish to Disclose'
        ],
        genderLabels: ['Male', 'Female', 'Other', 'Do not wish to Disclose'],
        veteranLabels: ['Not a Veteran', 'Veteran', 'Do not wish to Disclose'],
        disabilityLabels: ['Have a Disability', 'Do not have a Disability', 'Do not wish to Disclose'],

        race: null,
        disability: null,
        veteranStatus: null,
        gender: null

    }
    componentDidMount = async () => {
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await Axios.get(`${BACKEND_URL}${STATISTICS_ROUTE}${GET_STATISTICS_APPLICANT_DEMOGRAPHICS}`, {
            params: {
                companyId: localStorage.getItem('mongoId')
            }
        }).then((res) => {
            this.setState({ ...res.data });
            console.log(this.state)

        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        //Race Plot
        let raceData = [], raceVar

        if (this.state.race !== null) {
            let temp = this.state.race
            Object.keys(temp).map(function (key, index) {
                // console.log(temp[key])

                raceData.push(temp[key]);
            });
            raceVar = <div style={{ height: "300px", width: "500px" }}>
                <Pie
                    data={{
                        labels: this.state.raceLabels,
                        datasets:
                            [{
                                data: raceData,
                                backgroundColor: ['#6e9a44', '#bad072', '#d5e2ed', '#3d9690', '#d6f58e', '#5c8a03', '#2d6b22']
                            }]
                    }}
                /></div>
        }

        //Gender Plot
        let genderData = [], genderVar

        if (this.state.gender !== null) {
            let temp = this.state.gender
            Object.keys(temp).map(function (key, index) {
                // console.log(temp[key])

                genderData.push(temp[key]);
            });
            genderVar = <div style={{ height: "300px", width: "500px" }}>
                <Pie
                    data={{
                        labels: this.state.genderLabels,
                        datasets:
                            [{
                                data: genderData,
                                backgroundColor: ['#6e9a44', '#bad072', '#d5e2ed', '#3d9690']
                            }]
                    }}
                /></div>
        }

        //Veteran Plot
        let veteranData = [], veteranVar

        if (this.state.veteranStatus !== null) {
            let temp = this.state.veteranStatus
            Object.keys(temp).map(function (key, index) {
                // console.log(temp[key])

                veteranData.push(temp[key]);
            });
            veteranVar = <div style={{ height: "300px", width: "500px" }}>
                <Pie
                    data={{
                        labels: this.state.veteranLabels,
                        datasets:
                            [{
                                data: veteranData,
                                backgroundColor: ['#bad072', '#d5e2ed', '#3d9690']
                            }]
                    }}
                /></div>
        }
        //Disability Plot
        let disabilityData = [], disabilityVar

        if (this.state.disability !== null) {
            let temp = this.state.disability
            Object.keys(temp).map(function (key, index) {
                // console.log(temp[key])

                disabilityData.push(temp[key]);
            });
            disabilityVar = <div style={{ height: "300px", width: "500px" }}>
                <Pie
                    data={{
                        labels: this.state.disabilityLabels,
                        datasets:
                            [{
                                data: disabilityData,
                                backgroundColor: ['#2d6b22', '#d5e2ed', '#3d9690']
                            }]
                    }}
                /></div>
        }
        return (
            <div >
                <div style={{ display: "flex" }} >
                    <div>
                        Race
                        {raceVar}
                        Gender
                        {genderVar}
                    </div>
                    <div>
                        Veteran Status
                        {veteranVar}
                        Disability Status
                        {disabilityVar}
                    </div>
                </div>
            </div>

        );
    }
}

export default ApplicantDemographics;