import React, { Component } from 'react';
import axios from 'axios'
import Chart from "react-google-charts";
import { BACKEND_URL, GET_REVIEWS_PER_DAY } from '../../../config/routeConstants'
import './adminAnalytics.css'

class adminAnalytics extends Component {
    constructor() {
        super()
        this.state = {
            reviewsPerDay: [],
        }
    }

    componentDidMount() {
        console.log("backend url for reviews", BACKEND_URL + GET_REVIEWS_PER_DAY)
        axios.get(BACKEND_URL + GET_REVIEWS_PER_DAY)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Number of reviews per day", response.data)
                    this.setState({
                        reviewsPerDay: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }
    render() {
        let data = []
        this.state.reviewsPerDay.map(async review=>{
            await data.push([review._id, review.count])
        })
        console.log("Chart Data",...data)
        return (
            <div>
            <h6 class = "chartHeading">Number of reviews per day</h6>
            <Chart
            // width={400}
            // height={250}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Day','Reviews'],
            ...data
            ]}
            options={{
            //   title: 'No of reviews per day',
              legend: 'none',
              colors : ['#0caa41'],
              chartArea: { width: '80%', height: '80%' },
              hAxis: {
                title: 'Day',
                minValue: 0,
              },
              vAxis: {
                title: 'Reviews',
                legend: { position: 'none' }
              },
            }}
            legendToggle
          />
            </div>

        )
    }
}

export default adminAnalytics;