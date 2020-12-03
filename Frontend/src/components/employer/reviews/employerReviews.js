import React, { Component } from 'react';
import axios from 'axios'
import Reviewcard from './reviewCard'
import routeConstants from "../../../config/routeConstants";
import ReactPaginate from 'react-paginate';


class EmployerReview extends Component {

    state = {
        reviews: [],
        limit: 10,
        page: 1,
        totalPages: 0
    }

    componentDidMount() {
        this.updatePageList()

    }

    updatePageList() {
        let company_id = localStorage.getItem('mongoId')
        //let company_id="5fb4884acf339e3da0d5c31e"
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(`${routeConstants.BACKEND_URL}${routeConstants.GET_COMPANY_REVIEWS}`,
            {
                params: {
                    companyId: company_id,
                    page: this.state.page,
                    limit: this.state.limit

                }
            }).then((res) => {
                // console.log(res)
                this.setState({
                    reviews: res.data.reviews,
                    totalPages: res.data.totalPages,
                    currentPage: res.data.currentPage
                }, () => {
                    console.log(res.data)
                    console.log(this.state);
                });



        }).catch((err) => {
            console.log(err);
            window.alert("Failed to display reviews");
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
       //  console.log(this.state.reviews.length)
        let reviews = [];
        if (this.state.reviews && this.state.reviews.length > 0) {
            this.state.reviews.map((review) => {
                reviews.push(<Reviewcard reviewitem={review} />)
            })
        }
        else {
            reviews.push(<h4>No reviews added yet!!</h4>)
        }
        // console.log(reviews)

        return (
            //console.log("employer reviews")
            // <h4>Reviews</h4>
            <div>
                <div className="applicationsHeader">
                    <h4> Company Reviews</h4>
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
                <div>

                    {reviews}

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

        );
    }
}

export default EmployerReview;