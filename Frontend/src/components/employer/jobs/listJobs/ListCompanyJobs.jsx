import React, { Component } from 'react';
import Axios from 'axios'
import { BACKEND_URL, JOB_ROUTE, GET_COMPANY_JOBS } from '../../../../config/routeConstants'
import JobCard from './JobCard/JobCard';
import ReactPaginate from 'react-paginate';
import './ListJobs.styles.css'

class ListCompanyJobs extends Component {
    state = {
        jobsList: [],
        limit: 10,
        page: 1,
        totalPages: 0

    }
    componentDidMount = () => {
        // console.log(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOBS}`)
        this.updatePageList()
    }
    updatePageList() {
        Axios.get(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOBS}`, {
            params: {
                companyId: localStorage.getItem('mongoId'),
                limit: this.state.limit,
                page: this.state.page
            }
        })
            .then((res) => {
                this.setState({ jobsList: [...res.data.jobs], totalPages: res.data.totalPages })
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    handlePageClick = (data) => {
        let selected = data.selected + 1;
        // let offset = Math.ceil(selected * this.props.perPage);
        console.log(data)
        this.setState({ page: selected }, () => {
            this.updatePageList()
        })

    };
    handleChange = (e) => {
        //  console.log(this.state);
        let { value, id } = e.target;
        this.setState({ [id]: value }, () => this.updatePageList());

        // console.log(this.state)
    };
    render() {
        let renderVar
        if (this.state.jobsList.length > 0) {
            renderVar = this.state.jobsList.map((job, key) => {
                return <JobCard props={{ job: job, props: this.props }} key={key} />
            })
        }
        return (
            <div className="containerList">
                <div className="applicationsList">
                    <div className="applicationsHeader">
                        <h4> Jobs Posted</h4>
                        <div className="input-group"
                            style={{ width: "200px", justifyContent: "space-around" }}
                        >
                            <div className="input-group-prepend">
                                <label  >Page Limit </label>
                            </div>
                            <select className="custom-select" value={this.state.limit} onChange={this.handleChange} id="limit">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-deck jobsList">

                        {renderVar}
                    </div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

export default ListCompanyJobs;