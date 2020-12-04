import React, { Component } from 'react';
import '../student/HomePageTabs/Tabs.css'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BACKEND_URL, GET_COMPANY_HOMETAB } from './../../config/routeConstants'
import axios from 'axios'
import '../student/HomePageTabs/Paginate.css'

class CompaniesHomePage extends Component {
    constructor() {
        super();
        this.state = {
            companyData: [],
            isLoading: true,
            page: 1,
            limit: 10,
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.getCompanySearchResults = this.getCompanySearchResults.bind(this)
    }
    componentDidMount() {
        // if (this.props.location.state.detail) {
        this.getCompanySearchResults()
        // }
    }
    getCompanySearchResults() {
        this.setState({
            companyData: []
        })
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_COMPANY_HOMETAB, {
            params: {
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
                        companyData: response.data,
                        isLoading: false
                    },()=>{
                        this.receivedData();
                    })
                }
            })
            .catch(error => {
                console.log("Error")
            })
    }

    receivedData() {
        let count = 0
        console.log("Data", this.state.companyData)
        const slice = this.state.companyData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((company, i) =>                 <React.Fragment>
        <div class="card tabs-card" style={{ width: "50%", left: "25%", right: "25%", height: "300px" }}>
            {/*<img class="card-img-top" src={default_pic} alt="Card image cap" />*/}
            <div class="card-body">
                <div style={{ width: "100%" }}>
                    <div style={{ width: "30%", float: "left" }}>
                        <div style={{ display: "flex", justifyContent: "normal" }}>
                            <Link to={{
                                pathname: "/overview",
                                state: { companyId: company._id }
                            }}
                                class="companyName">{company.companyName}</Link>
                            <p class="companyRating"> {company.averageRating} <i class="fas fa-star"></i></p>
                        </div>
                        <p class="companyLocation"> <b>Headquarters: </b> {company.headquarters}</p>
                    </div>
                    <div style={{ width: "40%", float: "right" }}>
                        <button class="companySite"><Link to="{company.website}">Visit Website</Link></button>
                    </div>
                </div>
                <div class="companyInsights">
                    <div class="insights">
                        <p class="insightHeading">Job & Company Insights</p>
                        <p class="card-text"><p class="companyReviewsHeading"> No. of reviews:</p><p class="companyReviewsContent"> {company.NumberOfReviews} </p></p>
                        <p class="card-text"><p class="companyReviewsHeading"> No. of Salary reviews:</p><p class="companyReviewsContent"> {company.salaryReviews}</p></p>
                        <p class="card-text"><p class="companyReviewsHeading"> No. of Interview reviews: </p><p class="companyReviewsContent"> {company.interviewReviews} </p></p>
                    </div>
                </div>
            </div>
        </div>
</React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.companyData.length / this.state.perPage),

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
        let company = this.state.companyData
        console.log("Company", company)
        return (
            <div class="student-tabs-body">
                <h5 style = {{textAlign : "center"}}> Company Search Results</h5>
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

export default CompaniesHomePage;