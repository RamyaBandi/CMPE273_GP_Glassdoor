import React, { Component } from 'react';
import axios from 'axios'
import Chart from "react-google-charts";
import { BACKEND_URL, GET_TOP_CEO_RATING } from '../../../config/routeConstants'
import './adminAnalytics.css'

class TopCeo extends Component {
    constructor() {
        super()
        this.state = {
            topCeo : [],
        }
    }

    // Top 10 CEO’s based on rating.

    componentDidMount() {
        axios.get(BACKEND_URL + GET_TOP_CEO_RATING )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Top 10 CEO’s based on rating", response.data)
                    this.setState({
                        topCeo: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }
    render() {
        let data = []
        this.state.topCeo.map(async company=>{
            await data.push([company.companyName+', ' + company.ceoName,company.averageCeoRating])
        })
        return (
            <div>
            <h6 class = "chartHeading">Top 10 CEO’s based on rating.</h6>
            <Chart
            // width={300}
            // height={400}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['CEO Name', 'Rating'],
                ...data
            ]}
            options={{
                // title: 'Top 10 CEO’s based on rating',
                legend: 'none',
                colors : ['#0caa41'],
                chartArea: { width: '70%', height: '80%' },
                hAxis: {
                    title: 'Ratings',
                    minValue: 0,
                },
                //   vAxis: {
                    // title: 'Reviews',
                //     legend: { position: 'none' }
                //   },
            }}
            legendToggle
        />
            </div>

        )
    }
}

export default TopCeo;