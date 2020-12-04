import React, { Component } from 'react';
import './HomePageTabs/Tabs.css'
import '../landingPage/loggedInNav.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_STUDENTS_JOBS_HOMEPAGE } from './../../config/routeConstants'
import './HomePageTabs/Paginate.css'



class studentHomePage extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            jobsData: [],
            originaljobsData: [],
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0,
            salaryRange: "Salary Range",
            location: "Location",
            locationFilter: null,
            jobTypeFilter: null,
            jobType: "Job Type",
            salaryFilter: ["less than $100,000", "$100,000-$150,000", "$150,000-$200,000", "$200,000-$250,000", "Greater than $250,000"]

        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.getJobSearchResults = this.getJobSearchResults.bind(this)
        this.getRatingsBasedJobResults = this.getRatingsBasedJobResults.bind(this)
        this.getDateBasedJobResults = this.getDateBasedJobResults.bind(this)
    }


    async componentDidMount() {

        await this.getJobSearchResults()

        await this.setState({
            originaljobsData: this.state.jobsData,
            locationFilter: this.state.jobsData.map(item => item.city)
                .filter((value, index, self) => self.indexOf(value) === index),
            jobTypeFilter: this.state.jobsData.map(item => item.industry)
                .filter((value, index, self) => self.indexOf(value) === index)

        })
        console.log("Job Type", this.state.jobTypeFilter)
        this.receivedData()
    }

    // Prepare Data for Pagination

    receivedData() {
        let count = 0
        console.log("Data", this.state.jobsData)
        const slice = this.state.jobsData.slice(this.state.offset, this.state.offset + this.state.perPage)

        const postData = slice.map((job, i) => <React.Fragment>
            <div class="card tabs-card" key={i} style={{ width: "55%", left: "25%", right: "25%", height: "200px" }}>
                <div class="card-body">
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "100%", float: "left" }}>
                            <div style={{ width: "100%"}}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Link to={{
                                        pathname: "/overview",
                                        search: '?query=abc',
                                        state: { companyId: job._id }
                                    }}
                                        class="companyName"><b>{job.companyName}</b></Link>
                                    <p class="companyRating">{job.averageRating}<i class="fas fa-star"></i></p>
                                    <p class="companyName"> <b>Job Type: </b>{job.industry}</p>
                                </div>
                            </div>
                            <h6>Job Title: <Link to={{
                                pathname: "/jobApplication",
                                search: '?query=abc',
                                state: job.jobId
                            }}
                                style={{ "width": "250%" }}>{job.jobTitle}</Link></h6>

                            {/*<h6 style={{ "width": "250%" }}> Job Title: {job.jobTitle}</h6>*/}
                            <div style={{ width: "100%"}}>
                            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                <p>Ratings: {job.mostRated}</p>
                                <p>Date Posted: {this.formatDate(job.postedDate)}</p>
                                <p> Base Salary: <CurrencyFormat value={job.averageSalary} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                            </div>
                            </div>
                            <p class="companyLocation"> Location: {job.streetAddress},{job.city}, {job.state}, {job.zip}</p>
                        </div>
                        <div style={{ width: "40%", float: "right" }}>
                            
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.jobsData.length / this.state.perPage),

            postData
        })
    }

    // Capture change in select options and filter results accordingly

    handleCategoryChange(event) {
        event.preventDefault();
        if (event.target.name === "salaryRange") {
            this.setState({
                salaryRange: event.target.value
            }, () => {
                console.log("Salary Range", this.state.salaryRange)
                if (this.state.salaryRange === "less than $100,000") {
                    this.setState({
                        jobsData: this.state.originaljobsData.filter(job => { return job.averageSalary < 100000 })
                    }, () => {
                        this.receivedData()
                    })
                }
                else if (this.state.salaryRange === "$100,000-$150,000") {
                    this.setState({
                        jobsData: this.state.originaljobsData.filter(job => { return job.averageSalary >= 100000 && job.averageSalary < 150000 })
                    }, () => {
                        this.receivedData()
                    })
                }
                else if (this.state.salaryRange === "$150,000-$200,000") {
                    this.setState({
                        jobsData: this.state.originaljobsData.filter(job => { return job.averageSalary >= 150000 && job.averageSalary < 200000 })
                    }, () => {
                        this.receivedData()
                    })
                }
                else if (this.state.salaryRange === "$200,000-$250,000") {
                    this.setState({
                        jobsData: this.state.originaljobsData.filter(job => { return job.averageSalary >= 200000 && job.averageSalary < 250000 })
                    }, () => {
                        this.receivedData()
                    })
                }
                else if (this.state.salaryRange === "Greater than $250,000") {
                    this.setState({
                        jobsData: this.state.originaljobsData.filter(job => { return job.averageSalary >= 250000 })
                    }, () => {
                        this.receivedData()
                    })
                }
            })
        }
        else if (event.target.name === "location") {
            this.setState({
                location: event.target.value
            }, () => {
                this.setState({
                    jobsData: this.state.originaljobsData.filter(job => { return job.city === this.state.location })
                }, () => {
                    this.receivedData()
                })
            })
        }
        else if (event.target.name === "jobType") {
            console.log(event.target.name)
            this.setState({
                jobType: event.target.value
            }, () => {
                this.setState({
                    jobsData: this.state.originaljobsData.filter(job => { return job.industry === this.state.jobType })
                }, () => {
                    this.receivedData()
                })
            })
        }

    }

    // Function to handle change in data when a different page is clicked

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    }

    // Initial function to get the jobs result from the backend

    async getJobSearchResults() {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(BACKEND_URL + GET_STUDENTS_JOBS_HOMEPAGE,
        )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Jobs Data", response.data)
                    this.setState({
                        jobsData: response.data,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    //Filter the jobs based on the most recent date

    getDateBasedJobResults = (event) => {
        event.preventDefault();
        this.setState({
            jobsData: this.state.originaljobsData
        }, () => {
            return this.receivedData();
        })
    }

    //Filter the jobs based on the most Rated Job

    getRatingsBasedJobResults = (event) => {
        event.preventDefault();
        this.setState({
            jobsData: this.state.originaljobsData.sort(function (a, b) { return b.mostRated - a.mostRated; })
        }, () => {
            return this.receivedData()
        })
    }

    //Convert Date to the format YYYY-MM-DD

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    render() {
        return (
            <div class="jobsHomePageBody">
                <h4 style={{ "textAlign": "center", "lineHeight": "50px" }}>Jobs Home Page</h4>
                <div style={{ "textAlign": "center", lineHeight: "50px", paddingBottom: "25px" }}>
                    <form>
                        <button type="submit" onClick={this.getDateBasedJobResults} class="inputSearch" style={{ width: "12%", marginLeft: "15px", backgroundColor: "white" }} > Most Recent Jobs </button>
                        <button type="submit" onClick={this.getRatingsBasedJobResults} class="inputSearch" style={{ width: "12%", marginLeft: "15px", backgroundColor: "white" }}> Most Rated Jobs </button>
                        <select class="inputSearch" name="salaryRange" value={this.state.salaryRange} style={{ width: "15%", marginLeft: "15px" }} onChange={this.handleCategoryChange} id="cars">
                            <option name="salaryRange" >Salary Range</option>
                            {this.state.salaryFilter.map(salary => {
                                return <option name="salaryRange" value={salary}>{salary}</option>
                            })}

                        </select>
                        <select class="inputSearch" name="location" value={this.state.location} style={{ width: "12%", marginLeft: "15px" }} onChange={this.handleCategoryChange} id="cars">
                            <option name="location" >Location</option>
                            {this.state.locationFilter && this.state.locationFilter.map(location => {
                                return <option name="location" value={location}>{location}</option>
                            })}
                        </select>
                        <select class="inputSearch" name="jobType" value={this.state.jobType} style={{ width: "12%", marginLeft: "15px" }} onChange={this.handleCategoryChange} id="cars">
                            <option name="jobType" >Job Type</option>
                            {this.state.jobTypeFilter && this.state.jobTypeFilter.map(jobType => {
                                return <option name="jobType" value={jobType}>{jobType}</option>
                            })}
                        </select>
                    </form>
                </div>
                {this.state.isLoading ? <h5 style={{ textAlign: "center", color: " #0caa41" }}>Loading...........</h5> : this.state.postData}
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>

        )
    }
}

export default studentHomePage;