import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReviewCard from "./reviewCard";
import ReactPaginate from 'react-paginate';
import StarRatingComponent from 'react-star-rating-component';
import Chart from "react-google-charts";
import axios from "axios";
import {
  BACKEND_URL,
  GET_APPROVED_COMPANY_REVIEWS,
  GET_COMPANY_DETAILS,
  GET_POSITIVE_REVIEW,
  GET_NEGATIVE_REVIEW,
  GET_REVIEW_AVERAGE
} from "../../../../config/routeConstants";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      reviews: [],
      positiveReviews: {},
      negativeReviews: {},
      avgReviews: {},
      redirect: null,
      limit: 10,
      page: 1,
      totalPages: 0
    };
  }
  addReview = async (e) => {
    this.setState({ redirect: <Redirect to="/addReview" /> });
  };
  componentDidMount() {
    const company_id = '5fb4884acf339e3da0d5c31e';
    const student_id = localStorage.getItem('mongoId');
    //const company_id = this.props.location.state;
    //console.log(company_id);

    // axios
    //   .get( BACKEND_URL + GET_APPROVED_COMPANY_REVIEWS + "?companyId=" + company_id + "&studentId="+ student_id + "&page=" + this.state.page + "&limit=" + this.state.limit)
    //   .then((response) => {
    //     this.setState({ reviews: response.data.reviews });
    //     console.log("reviews response")
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    this.updatePageList();

    axios
      .get(BACKEND_URL + GET_COMPANY_DETAILS + "?companyId=" + company_id)
      .then((response) => {
        this.setState({ companyDetails: response.data[0] });
        // console.log("company overview response");
        // console.log(response.data[0]);
        // console.log(this.state.companyDetails);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_POSITIVE_REVIEW + "?companyId=" + company_id)
      .then((response) => {
        //console.log("positive review");
        this.setState({ positiveReviews: response.data.positiveReviews[0] });
        //console.log(this.state.positiveReviews);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_NEGATIVE_REVIEW + "?companyId=" + company_id)
      .then((response) => {
        //console.log("negative review");
        this.setState({ negativeReviews: response.data.negativeReviews[0] });
        //console.log(this.state.negativeReviews);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(BACKEND_URL + GET_REVIEW_AVERAGE + "?companyId=" + company_id)
      .then((response) => {
        //console.log("review average");
        this.setState({ avgReviews: response.data });
        //console.log(this.state.avgReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatePageList() {
    console.log("in update page list");
    const company_id = '5fb4884acf339e3da0d5c31e';
    const student_id = localStorage.getItem('mongoId');
    axios.get(BACKEND_URL + GET_APPROVED_COMPANY_REVIEWS, {
        params: {
            companyId: company_id,
            studentId: student_id,
            limit: this.state.limit,
            page: this.state.page
        }
        })
        .then((res) => {
            this.setState({ reviews: [...res.data.reviews], totalPages: res.data.totalPages })
            console.log("reviews list")
            console.log(this.state.reviews);
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        
}

handlePageClick = (data) => {
  let selected = data.selected + 1;
  // let offset = Math.ceil(selected * this.props.perPage);
  //console.log(data)
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

  render = () => {
    return (
      <div>
        {this.state.redirect}
        <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
          <Row style={{ height: "50px", marginTop: "20px" }}>
            <Col>
              <h5>
                <b>{this.state.companyDetails.companyName}</b>
              </h5>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
                        <Col md="8">
                            <div>
                                <Nav className="mr-auto">
                                    <div className="box-content right">
                                        <Link to="/overview" style={{ textDecoration: 'none', color: '#1861bf' }}>Overview</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/reviews", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Reviews</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/jobs", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Jobs</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/salaries", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Salaries</Link>
                                    </div>
                                    <div class="box-content right">
                                        <Link to={{ pathname: "/interviews", state: this.state.companyDetails._id }} style={{ textDecoration: 'none', color: '#1861bf' }}>Interviews</Link>
                                    </div>
                                    <div class="box-content">
                                        <Link to="/photos" style={{ textDecoration: 'none', color: '#1861bf' }}>Photos</Link>
                                    </div>
                                </Nav>
                            </div>
                        </Col>
                        <Col md="4">
                            {/* <Button className="float-right" style={{ backgroundColor: "#1861bf" }} onClick = {this.onAddReview}>
                                <p style={{ color: "#ffffff", marginTop: "5px", marginBottom: "5px" }}>+ Add a Review</p>
                            </Button> */}
                            <div className="float-right" style={{ paddingRight: "70px" }}>
                                <Link to={{ pathname: "/addreview", state: this.state.companyDetails._id }} className="btn gd-btn-med gd-btn-icon"
                                    style={{ color: "#ffffff", backgroundColor: "#1861bf", marginTop: "5px", marginBottom: "5px", width: "100%" }}>+ Add a Review</Link>
                            </div>
                        </Col>
                    </Row>
        </Container>

        
          <Container style={{ marginTop: "30px", width: "61%" }}>
            <Row>
              <Col md="4">
              </Col>
            <Col md="4">
              <p style={{fontSize:"17px"}}  class="companyRating">Average Overall Rating: {this.state.avgReviews.averageOverallRating}<i class="fas fa-star"></i></p>
            </Col>
            
            <Col md="4">
              </Col>
            </Row>

            <Row>
              <Col md="1">
              </Col>
            <Col md="5">
              <p style={{fontSize:"17px"}} class="companyRating">Average Recommended Rating: {this.state.avgReviews.averageRecommendedRating}<i class="fas fa-star"></i></p>
            </Col>
            <Col md="6">
              <p style={{fontSize:"17px"}} class="companyRating">Average CEO Rating: {this.state.avgReviews.averageCeoRating}<i class="fas fa-star"></i></p>
            </Col>
            </Row>
          </Container>
       

        <Row>
        <Container className="block-example border" style={{ marginTop: "20px", width: "61%" }}>
          <Col>
          <Row>
            <p>Most Positive Review</p>
          </Row>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                Headline: <b>{this.state.positiveReviews.headline}</b>
              </p>          
            </Row>
            <Row>
              <Col md="4">
                
                <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.positiveReviews.overallRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                   <p>Overall Rating: {this.state.positiveReviews.overallRating} </p>
              </Col>
              <Col md="4">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.positiveReviews.recommendedRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                <p>Recommended to a Friend: {this.state.positiveReviews.recommendedRating}</p>
              </Col>
              <Col md="4">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.positiveReviews.ceoRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                <p>CEO approval: {this.state.positiveReviews.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>Description: {this.state.positiveReviews.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros:</b>
                <br />
                {this.state.positiveReviews.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons:</b>
                <br />
                {this.state.positiveReviews.cons}
              </p>
            </Row>
          </Col>
        </Container>

        <Container className="block-example border" style={{ marginTop: "20px", width: "61%" }}>
          <Col>
          <Row>
            <p>Most Negative Review</p>
          </Row>
            <Row>
              <p style={{ color: "#3f76cc", fontSize: "22px" }}>
                Headline: <b>{this.state.negativeReviews.headline}</b>
              </p>          
            </Row>
            <Row>
              <Col md="4">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.negativeReviews.overallRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                <p>Overall Rating: {this.state.negativeReviews.overallRating}</p>
              </Col>
              <Col md="4">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.negativeReviews.recommendedRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                <p>Recommended to a Friend: {this.state.negativeReviews.recommendedRating}</p>
              </Col>
              <Col md="4">
              <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.negativeReviews.ceoRating}
                        starColor="#D4AF37"
                        renderStarIcon={(index, value) => {
                          return (
                            <div className="color-of-star">
                              <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                            </div>
                          );
                        }}
                        renderStarIconHalf={() => (
                          <div className="color-of-star">
                            <span className="position-absolute"><i className={"far fa-star"} /></span>
                            <span><i className={"fas fa-star-half"} /></span>
                          </div>
                        )}
                    />
                <p>CEO approval: {this.state.negativeReviews.ceoRating}</p>
              </Col>
            </Row>
            <Row>
              <p>Description: {this.state.negativeReviews.description}</p>
            </Row>
            <Row>
              <p>
                <b>Pros:</b>
                <br />
                {this.state.negativeReviews.pros}
              </p>
            </Row>
            <Row>
              <p>
                <b>Cons:</b>
                <br />
                {this.state.negativeReviews.cons}
              </p>
            </Row>
          </Col>
        </Container>
        
          <Container style={{ marginBottom: "30px" }}>
            {this.state.reviews.map((item) => {
              return <ReviewCard {...item} />;
            })}
          </Container>
        </Row>
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
        <Container style={{ marginBottom: "30px" }}>
        <Row>
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
        </Row>
        </Container>
      </div>
    );
  };
}

export default Reviews;
