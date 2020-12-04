import React, { Component } from 'react';
import './Tabs.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_JOBS, GET_JOBS_HOMEPAGE } from '../../../config/routeConstants'
import './Paginate.css'


class JobsTab extends Component {
    constructor() {
        super();
        this.state = {
            jobsData: [],
            isLoading: true,
            page: 1,
            limit: 10,
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.getJobSearchResults = this.getJobSearchResults.bind(this)
    }
    componentDidMount() {
        console.log("Search Parameter", (typeof this.props.location.state.detail !== "undefined") ? this.props.location.state.detail : null)
        // if (this.props.location.state.detail !== "") {
        this.getJobSearchResults();
        // this.handlePageClick();
        // }
    }

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

    // Prepare Data for Pagination

    receivedData() {
        let count = 0
        console.log("Data", this.state.jobsData)
        const slice = this.state.jobsData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((job, i) => <React.Fragment>
            <div class="card tabs-card" key={i} style={{ width: "50%", left: "25%", right: "25%", height: "350px" }}>
                <div class="card-body">
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "30%", float: "left" }}>
                            <div style={{ display: "flex", justifyContent: "normal" }}>
                                <Link to={{
                                    pathname: "/overview",
                                    search: '?query=abc',
                                    state: { companyId: job._id }
                                }}
                                    class="companyName">{job.companyName}</Link>
                                <p class="companyRating">{job.averageRating}<i class="fas fa-star"></i></p>
                            </div>
                            <h6 style={{ "width": "250%" }}> {job.jobTitle}</h6>
                            <p class="companyLocation"> {job.streetAddress},{job.city}, {job.state}, {job.zip}</p>
                        </div>
                        <div style={{ width: "40%", float: "right" }}>
                            <button class="companySite"> Visit Website</button>
                        </div>
                    </div>
                    <div class="companyInsights">
                        <div class="insights">
                            <p class="insightHeading">Job & Company Insights</p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent"> {job.NumberOfReviews}</p></p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews:</p><p class="companyReviewsContent"> {job.salaryReviews}</p></p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews:</p><p class="companyReviewsContent"> {job.interviewReviews}</p></p>
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

    async getJobSearchResults() {
        this.setState({
            jobsData: [],
            isLoading: false
        })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(BACKEND_URL + GET_SEARCH_JOBS, {
            params: {
                searchParameter: this.props.location.state.detail,
                // searchParameter : "Software Engineer",
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Jobs Data", response.data)
                    this.setState({
                        jobsData: response.data
                    }, () => {
                        this.receivedData();
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    render() {
        return (
            <div class="student-tabs-body">
            <h5 style = {{textAlign : "center"}}> Job Search Results</h5>
                {this.state.isLoading ? <h6 style={{ textAlign: "center", color: "#0caa41" }}> Loading......</h6> : this.state.postData}
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

export default JobsTab;