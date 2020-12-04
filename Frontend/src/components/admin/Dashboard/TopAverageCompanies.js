import React, { Component } from 'react';
import axios from 'axios'
import { BACKEND_URL, GET_TOP_AVERAGE_RATED_COMPANIES } from '../../../config/routeConstants'
import Chart from "react-google-charts";
import './adminAnalytics.css'

class topReviewedCompanies extends Component {
    constructor() {
        super()
        this.state = {
            topAverageCompanies: [],
            isLoading: true
        }
    }

    // Top 5 company based on average rating

    componentDidMount() {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_TOP_AVERAGE_RATED_COMPANIES)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Top 5 company based on average rating.", response.data)
                    this.setState({
                        topAverageCompanies: response.data,
                        isLoading : false
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }
    render() {
        let data = []
        this.state.topAverageCompanies.map(async company=>{
            await data.push([company.companyName, company.avgRating])
        })
        return (
            <div>
            <h6 class = "chartHeading">Top 5 company based on average rating</h6>
            {this.state.isLoading ? <h6 style={{textAlign: "center" ,color:"#0caa41"}}> Loading......</h6>:<Chart
                    // width={300}
                    // height={400}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Company Name', 'Average Rating'],
                        ...data
                    ]}
                    options={{
                        // title: 'Top 5 company based on average rating.',
                        legend: 'none',
                        colors : ['#0caa41'],
                        chartArea: { width: '70%', height: '80%' },
                        hAxis: {
                            title: 'Average Rating',
                            minValue: 0,
                        },
                        //   vAxis: {
                        //     title: 'Reviews',
                        //     legend: { position: 'none' }
                        //   },
                    }}
                    legendToggle
                />}
            </div>

        )
    }
}

export default topReviewedCompanies;