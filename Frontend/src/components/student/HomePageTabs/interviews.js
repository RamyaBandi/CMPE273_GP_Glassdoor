import React, { Component } from 'react';
import './Tabs.css'
import { Link } from 'react-router-dom';
import { BACKEND_URL, GET_SEARCH_INTERVIEW } from '../../../config/routeConstants'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Paginate.css'

class InterviewsTab extends Component {
    constructor() {
        super();
        this.state = {
            interviewData: [],
            isLoading: true,
            page: 1,
            limit: 10,
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.getInterviewSearchResults = this.getInterviewSearchResults.bind(this)
    }
    componentDidMount() {
        // if (this.props.location.state.detail) {
        this.getInterviewSearchResults()
    }

    getInterviewSearchResults() {
        this.setState({
            interviewData: []
        })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_SEARCH_INTERVIEW, {
            params: {
                searchParameter: this.props.location.state.detail,
                // searchParameter: "Test Company",
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Company Data", response.data)
                    this.setState({
                        interviewData: response.data,
                        isLoading: false
                    }, () => {
                        this.receivedData()
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    // Prepare Data for Pagination

    receivedData() {
        let count = 0
        console.log("Data", this.state.interviewData)
        const slice = this.state.interviewData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((interview, i) => <React.Fragment>
            <div class="card tabs-card" style={{ width: "50%", left: "25%", right: "25%", height: "400px" }}>
                <div class="card-body">
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "30%", float: "left" }}>
                            <div style={{ display: "flex", justifyContent: "normal" }}>
                            <Link to={{
                                pathname: "/overview",
                                state: { companyId: interview._id }
                            }}
                            onClick={()=>{localStorage.setItem('companyId',interview._id)}} class="companyName">{interview.companyName}</Link>
                                <p class="companyRating"> {interview.averageRating} <i class="fas fa-star"></i></p>
                            </div>
                            <p class="companyLocation"> {interview.headquarters}</p>
                        </div>
                        <div style={{ width: "40%", float: "right" }}>
                            <button class="companySite"> Visit Website</button>
                        </div>
                    </div>
                    <div class="companyInsights">
                        <div class="insights">
                            <p class="insightHeading">Job & Company Insights</p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of reviews: </p><p class="companyReviewsContent"> {interview.NumberOfReviews}</p></p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews: </p><p class="companyReviewsContent"> {interview.interviewReviews}</p></p>
                            <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> {interview.interviewReviews}</p></p>
                        </div>
                        <div>
                            <p class="insightHeading">Interview Experience</p>
                            <p class="card-text"><p class="companyReviewsHeading"> Job :  </p><p class="companyReviewsContent"> {interview.jobTitle}</p></p>
                            <p class="card-text"><p class="companyReviewsHeading"> Experience :  </p><p class="companyReviewsContent"> {interview.description}</p></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.interviewData.length / this.state.perPage),

            postData
        })
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

    render() {
        return (
            <div class="student-tabs-body">
            <h5 style = {{textAlign : "center"}}> Company based Interview Search Results</h5>
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

export default InterviewsTab;