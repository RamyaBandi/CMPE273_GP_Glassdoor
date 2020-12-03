import React, { Component } from 'react';
import axios from 'axios'
import Reviewcard from './reviewCard'
import routeConstants from "../../../config/routeConstants";
import ReactPaginate from 'react-paginate';

class EmployerReview extends Component {
    state = { 
        reviews:[],
        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0,
     }

    componentWillMount(){
        //let company_id=localStorage.getItem('mongoId')
        let company_id='5fb4884acf339e3da0d5c31e'
        //5fbd383a20ebc710c11cad02
        //5fb4884acf339e3da0d5c31e
        console.log(company_id)
        axios.get(`${routeConstants.BACKEND_URL}${routeConstants.GET_COMPANY_REVIEWS}`,
        {
            params: {
                companyId: company_id
            }
        }).then((res) => {
            console.log(res)
            this.setState({reviews: res.data.reviews
                }, () => {
                    //console.log(res.data);
                });
                console.log(this.state);


            }).catch((err) => {
                console.log(err);
                window.alert("Failed to display reviews");
            })
    }
    receivedData = () => {
        // console.log("hitting pagination")
        const slice = this.props.eventsList.slice(this.state.offset, this.state.offset + this.state.perPage);
        let dList = slice.map(
            (res) => {

                return {
                    res: res,
                    props: this.props
                }
            }
        )
        // console.log(dList)
        this.props.setPaginatedEventsList({ paginatedEvents: [...dList] });
        this.setState({
            pageCount: Math.ceil(this.props.eventsList.length / this.state.perPage)
        });

    }
    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };
    render() { 
        console.log(this.state.reviews.length)
        let reviews=[];
        // {this.props.paginatedEvents.map((res, key) => {
        //     return <EventCard key={key} props={res} />
        // })}
        if(this.state.reviews.length>0){
            this.state.reviews.map((review)=>{
                reviews.push(<Reviewcard reviewitem={review}/>)
            })
        }
        else{
            reviews.push(<h4>No reviews added yet!!</h4>)
        }
        console.log(reviews)

        return (  
            //console.log("employer reviews")
            // <h4>Reviews</h4>
            <div>
                <div>
                <button className='btn btn-danger' onClick={this.sortHandler}>Toggle Date Sort</button>
                
                    {reviews}
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
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
                </div>
           
        );
    }
}
 
export default EmployerReview;