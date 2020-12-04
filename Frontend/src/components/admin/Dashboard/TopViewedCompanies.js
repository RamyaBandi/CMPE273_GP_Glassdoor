import React, { Component } from 'react';
import axios from 'axios'
import { BACKEND_URL, GET_TOP_COMPANY_VIEWS } from '../../../config/routeConstants'
import Chart from "react-google-charts";
import './adminAnalytics.css'

class TopViewedCompanies extends Component {
    constructor() {
        super()
        this.state = {
            Date: null,
            topViewedCompanies: [],
        }
        this.handledChange = this.handledChange.bind(this)
        this.getTopViewedCompanies = this.getTopViewedCompanies.bind(this)
    }

    handledChange(event) {
        event.preventDefault();
        this.setState({
            Date: event.target.value
        }, () => {
            this.getTopViewedCompanies()
        })
    }

    // Top 10 Viewed Companies’s based on rating.

    async getTopViewedCompanies() {
        console.log("Date", this.state.Date)
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(BACKEND_URL + GET_TOP_COMPANY_VIEWS, {
            params: {
                date: this.state.Date,
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Top 10 Viewed Companies’s based on rating", response.data)
                    this.setState({
                        topViewedCompanies: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }
    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    componentDidMount() {
        this.setState({
            Date:this.formatDate()
        }, ()=>{
            console.log("Loading Date", this.state.Date)
            this.getTopViewedCompanies();
        })
    }
    render() {
        console.log("Date1",this.formatDate())
        let data = []
        this.state.topViewedCompanies.map(async company => {
            await data.push([company._id.companyName, company.count])
        })
        return (
            <div>
                <h6 class="chartHeading">Top 10 Viewed Companies for Date : {this.state.Date}</h6>
                {data.length > 0 && <Chart
                    // width={300}
                    // height={400}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Company Name', 'Views per Day'],
                        ...data
                    ]}
                    options={{
                        // title: 'Top 5 students based on total accepted reviews made',
                        legend: 'none',
                        colors : ['#0caa41'],
                        chartArea: { width: '70%', height: '70%', top:'10%' },
                        hAxis: {
                            title: 'Company Name',
                            minValue: 0,
                        },
                          vAxis: {
                            title: 'Views Per Day',
                            legend: { position: 'none' }
                          },
                    }}
                    legendToggle
                /> }
                <div style={{"display": "flex", "padding": "20px", "justifyContent": "center"}}>
                <p>Pick a Date : </p>
                <input type="date"  class="form-control" name="Date" value={this.state.Date} onChange={this.handledChange} placeholder="Pick a Date"></input>
                </div>
            </div>

        )
    }
}

export default TopViewedCompanies;