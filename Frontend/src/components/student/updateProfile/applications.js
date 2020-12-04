import Axios from 'axios';
import React, { Component } from 'react';
import { BACKEND_URL, APPLICATION_ROUTE, GET_APPLICATIONS_STUDENTID } from '../../../config/routeConstants';
import ApplicationCard from './applicationsCard'
import ReactPaginate from 'react-paginate';

class Applications extends Component {
    state = {
        appsList: [],
        limit: 10,
        page: 1,
        totalPages: 0
    }
    componentDidMount() {
        this.updatePageList();

    }
    updatePageList() {
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        // console.log(`${BACKEND_URL}${APPLICATION_ROUTE}${GET_APPLICATIONS_STUDENTID}`)
        Axios.get(`${BACKEND_URL}${APPLICATION_ROUTE}${GET_APPLICATIONS_STUDENTID}`, {
            params: {
                studentId: localStorage.getItem('mongoId'),
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({
                appsList: res.data.results,
                totalPages: res.data.totalPages,
                page: res.data.page
            })
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
        if (this.state.appsList.length > 0) {
            renderVar = this.state.appsList.map((job, key) => {
                return <ApplicationCard props={{ app: job, props: this.props }} key={key} />
            })
        }
        return (
            <div className="containerList">
                <div className="applicationsList">
                    <div className="applicationsHeader">
                        <h4> Jobs Applied</h4>
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

export default Applications;