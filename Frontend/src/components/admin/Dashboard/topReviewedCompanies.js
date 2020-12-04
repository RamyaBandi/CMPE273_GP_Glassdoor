import React, { Component } from 'react';
import axios from 'axios'
import Chart from "react-google-charts";
import { BACKEND_URL, GET_TOP_REVIEWED_COMPANIES } from '../../../config/routeConstants'
import './adminAnalytics.css'

class topReviewedCompanies extends Component {
    constructor() {
        super()
        this.state = {
            topReviewedCompanies: [],
            isLoading : true
        }
    }

    // Top 5 most reviewed company.
    componentDidMount() {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_TOP_REVIEWED_COMPANIES )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Top 5 most reviewed company", response.data)
                    this.setState({
                        topReviewedCompanies: response.data,
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
        this.state.topReviewedCompanies.map(async company=>{
            await data.push([company.companyName, company.noOfReviews])
        })
        console.log("Chart Data",...data)
        return (
            <div>
            <h6 class = "chartHeading">Top 5 most reviewed company</h6>
            {this.state.isLoading ? <h6 style={{textAlign: "center" ,color:"#0caa41"}}> Loading......</h6> :<Chart
            // width={300}
            // height={400}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Company Name','Reviews'],
            ...data
            ]}
            options={{
            //   title: 'Top 5 most reviewed company',
              legend: 'none',
              colors : ['#0caa41'],
              chartArea: { width: '70%', height: '80%' },
              hAxis: {
                title: 'Reviews',
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