import Axios from 'axios';
import React, { Component } from 'react';
import { GET_APPLICATIONS_JOBID, BACKEND_URL, APPLICATION_ROUTE } from '../../../../../config/routeConstants';
import ApplicationCard from './ApplicationCard';
import './listApplications.styles.css'
import ReactPaginate from 'react-paginate';

class ListApplications extends Component {
    state = {
        apps: [],
        limit: 10,
        page: 1,
        totalPages: 0
    }
    componentWillMount() {
        console.log(this.props)
        this.updatePageList()
    }
    updatePageList() {
        Axios.get(`${BACKEND_URL}${APPLICATION_ROUTE}${GET_APPLICATIONS_JOBID}`, {
            params: {
                jobId: localStorage.getItem('jobId'),
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res);
            this.setState({ apps: [...res.data.results], totalPages: res.data.totalPages })
        }).catch((err) => {
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
        if (this.state.apps.length > 0) {
            renderVar = this.state.apps.map((app, key) => {
                return <ApplicationCard props={app} key={key} />
            })
        }
        return (
            <div className="containerList">
                <div className="applicationsList">
                    <div className="applicationsHeader">
                        <h4>
                            Applications for {this.props.location.state.job.jobTitle}
                        </h4>
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
                    <div className="card-deck" style={{ justifyContent: "space-evenly" }}>
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

export default ListApplications;