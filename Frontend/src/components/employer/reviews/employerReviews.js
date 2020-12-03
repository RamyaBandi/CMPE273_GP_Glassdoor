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
        //let company_id = localStorage.getItem('mongoId')
        let company_id='5fb4884acf339e3da0d5c31e'
        //5fbd383a20ebc710c11cad02
        //5fb4884acf339e3da0d5c31e
        console.log(company_id)
        axios.get(`${routeConstants.BACKEND_URL}${routeConstants.GET_COMPANY_REVIEWS}`,
        {
            params: {
                companyId: company_id,
                limit: this.state.limit,
                page: this.state.page
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                reviews: res.data.reviews
            }, () => {
                //console.log(res.data);
            });
            console.log(this.state);


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

    render() {
         console.log(this.state.reviews.length)
        let reviews = [];
        if (this.state.reviews && this.state.reviews.length > 0) {
            this.state.reviews.map((review) => {
                reviews.push(<Reviewcard reviewitem={review} />)
            })
        }
        else {
            reviews.push(<h4>No reviews added yet!!</h4>)
        }
        console.log(reviews)

        return (
            //console.log("employer reviews")
            // <h4>Reviews</h4>
            <div>
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