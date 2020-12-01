import React, { Component } from 'react';
import axios from 'axios'
import Chart from "react-google-charts";
import { BACKEND_URL, GET_TOP_STUDENTS_ON_RATING } from '../../../config/routeConstants'
import './adminAnalytics.css'

class TotalAcceptedReviews extends Component {
    constructor() {
        super()
        this.state = {
            totalAcceptedReviews : [],
        }
    }

    // Top 5 students based on total accepted reviews made

    componentDidMount() {
        axios.get(BACKEND_URL + GET_TOP_STUDENTS_ON_RATING )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Top 5 students based on total accepted reviews made", response.data)
                    this.setState({
                        totalAcceptedReviews: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error.response.data.msg)
            })
    }
    render() {
        let data = []
        this.state.totalAcceptedReviews.map(async student=>{
            await data.push([student.studentName, student.noOfReviews])
        })
        return (
            <div>
            <h6 class = "chartHeading">Top 5 students based on total accepted reviews made</h6>
            <Chart
            // width={300}
            // height={400}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Student Name', 'Accepted Reviews'],
                ...data
            ]}
            options={{
                // title: 'Top 5 students based on total accepted reviews made',
                legend: 'none',
                colors : ['#0caa41'],
                chartArea: { width: '70%', height: '80%' },
                hAxis: {
                    title: 'Accepted Reviews',
                    minValue: 0,
                },
                //   vAxis: {
                //     title: 'Reviews',
                //     legend: { position: 'none' }
                //   },
            }}
            legendToggle
        />
            </div>

        )
    }
}

export default TotalAcceptedReviews;