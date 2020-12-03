import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReviewCard from "../../student/companyTabs/reviews/reviewCard";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {
  BACKEND_URL,
  GET_ALL_REVIEWS,
  PUT_REVIEW_APPROVE,
  PUT_REVIEW_REJECT,
} from "../../../config/routeConstants";


class AdminReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      approvedreviews: [],
      rejectedreviews: [],
      addedItem:    {},
      cart:         {},
      addedItem2:    {},
      cart2:         {},
      page : 1,
      limit : 10,
      redirect: null,
    };
    this.handlePageClick = this.handlePageClick.bind(this)
    this.getReviewsResults = this.getReviewsResults.bind(this)

  }

  componentDidMount() {
    //const company_id = '5fb4884acf339e3da0d5c31e';
    //const company_id = this.props.location.state;
    this.getReviewsResults();
    // axios
    //   .get(BACKEND_URL + GET_ALL_REVIEWS)
    //   .then((response) => {
    //     this.setState({ reviews: response.data.reviews });
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    }

    handlePageClick = (e) => {
        // console.log("Page number",e.selected)
            this.setState({
                page: e.selected + 1,
            }, () => {
                this.getReviewsResults()
            });
        console.log("Page number",e.selected)
    }

    async getReviewsResults(){
        await axios.get(BACKEND_URL + GET_ALL_REVIEWS, {
            params: {
                page : this.state.page,
                limit : this.state.limit
            }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Reviews Data", response.data)
                    this.setState({
                        reviews: response.data.reviews
                    })
                }
            })
            .catch(error => {
                console.log(error.response.data.msg)
            })
    }

    handleChange = (e) => {
        //  console.log(this.state);
        let { value, id } = e.target;
        this.setState({ [id]: value }, () => this.getReviewsResults());
  
        // console.log(this.state)
      };

    addApproveItem=(item)=>{
        let temp={...item}
        let added={...this.state.addedItem}
        added[temp._id]=true
        let cart={...this.state.cart}
        cart[item._id]=temp
        this.setState({addedItem:added,cart:cart})
    }

    removeApproveItem=(_id)=>{
        let removed={...this.state.addedItem}
        delete removed[_id]
        let cart={...this.state.cart}
        delete cart[_id]
        this.setState({addedItem:removed,cart:cart})
    }

    addRejectItem=(item)=>{
        let temp2={...item}
        let added2={...this.state.addedItem2}
        added2[temp2._id]=true
        let cart2={...this.state.cart2}
        cart2[item._id]=temp2
        this.setState({addedItem2:added2,cart2:cart2})
    }

    removeRejectItem=(_id)=>{
        let removed2={...this.state.addedItem2}
        delete removed2[_id]
        let cart2={...this.state.cart2}
        delete cart2[_id]
        this.setState({addedItem2:removed2,cart2:cart2})
    }

    onSubmitApproval = async (e) => {
        
        for(let i in this.state.cart){
            this.reviewData = {   
                reviewId: this.state.cart[i]._id
            };
            axios.put(BACKEND_URL + PUT_REVIEW_APPROVE, this.reviewData)
                    .then(response => {
                        console.log("Review approved successfully");
                        window.location.reload();
                        window.alert("Approved!"); 
                    }) 
        }
        //window.location.reload();
        // this.setState({cart: {}, cart2: {}});
                     
      };

      onSubmitRejection = async (e) => {
        for(let i in this.state.cart2){
            this.reviewData2 = {   
                reviewId: this.state.cart2[i]._id
            };
            axios.put(BACKEND_URL + PUT_REVIEW_REJECT, this.reviewData2)
                    .then(response => {
                        console.log("Review rejected successfully");
                        window.location.reload();
                        window.alert("Rejected!");     
                    })  
        }  
                  
      };

  render = () => {
    console.log(this.state.cart)
    console.log(this.state.cart2)
    return (
      <div>
        {this.state.redirect}
        <Row style={{marginBottom:"30px", martinLeft: "20px", marginRight: "20px", marginTop: "20px"}}>
                        {this.state.reviews.map(item=>{
                            return (<Col md={12}>
                                <Row style={{marginRight:"30px", martinLeft: "40px", marginTop: "5px"}}>
                                    <Col md="1">
                                    {/* <Link to={{ pathname: "/viewreview", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item._id}</Link> */}
                                    </Col>
                                    <Col md="3">
                                    <Link to={{ pathname: "/viewreview", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item.headline}</Link>
                                    </Col>
                                    <Col md="2">
                                    <Link to={{ pathname: "/viewreview", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item.approvalstatus}</Link>
                                    </Col>
                                    <Col md="3" >

                                      {this.state.addedItem[item._id]?<Button style={{ backgroundColor: "#2f9c19", border: "1px solid #2f9c19",float:"right" }} size="sm" onClick={()=>{
                                          this.removeApproveItem(item._id)
                                      }}>Selected for Approval</Button>:<Button style={{ backgroundColor: "#2f9c19", border: "1px solid #2f9c19",float:"right" }} size="sm" onClick={()=>{
                                        this.addApproveItem(item)
                                    }}>Approve</Button>}
                                    </Col>
                                    <Col md="3" >

                                      {this.state.addedItem2[item._id]?<Button style={{ backgroundColor: "#f43939", border: "1px solid #d32323",float:"right" }} size="sm" onClick={()=>{
                                          this.removeRejectItem(item._id)
                                      }}>Selected for Rejected</Button>:<Button style={{ backgroundColor: "#f43939", border: "1px solid #d32323",float:"right" }} size="sm" onClick={()=>{
                                        this.addRejectItem(item)
                                    }}>Reject</Button>}
                                    </Col>
                                </Row>
                            </Col>)
                        })}
        </Row>
        <Row>
        <Col md="6">
        </Col>
        <Col md="3" style={{marginTop:"20px"}}>
                        <Col md="12">
                        <Button onClick={this.onSubmitApproval} style={{ backgroundColor: "#2f9c19", border: "1px solid #2f9c19" }} block>Approve selected</Button>
                        </Col>
        </Col>
        <Col md="3" style={{marginTop:"20px"}}>
                        <Col md="12">
                        <Button onClick={this.onSubmitRejection} style={{ backgroundColor: "#f43939", border: "1px solid #d32323" }} block>Reject selected</Button>
                        </Col>
        </Col>
        </Row>
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
    );
  };
}

export default AdminReviews;
