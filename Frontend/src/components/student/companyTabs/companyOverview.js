import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
//import Button from 'react-bootstrap/Button';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Redirect } from "react-router";
import axios from 'axios';
import { BACKEND_URL, GET_COMPANY_DETAILS, GET_COMPANY_REVIEWS, GET_POSITIVE_REVIEW, GET_NEGATIVE_REVIEW, GET_REVIEW_AVERAGE, POST_COMPANYVIEWS } from '../../../config/routeConstants';
import ReviewCard from "../../student/companyTabs/reviews/reviewCard";
import ReactPaginate from 'react-paginate';
import StarRatingComponent from 'react-star-rating-component';

export default class CompanyOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetails: [],
            reviews: [],
            limit: 10,
            page: 1,
            positiveReviews: {},
            negativeReviews: {},
            redirect: null
        };
    }

    onReview = async (e) => {
        const companyId = '';
        this.setState({ companyId: this.state.companyDetails._id });
        //console.log("companyId in overview "+ this.state.companyId);
    }

    componentDidMount() {
        const companyId = '5fbd383a20ebc710c11cad02';
        //const companyId = this.props.location.state.companyId
        console.log("Fetched company Id", companyId)
        axios.get(BACKEND_URL + GET_COMPANY_DETAILS + '?companyId=' + companyId)
            .then(response => {
                this.setState({ companyDetails: response.data[0] });
                console.log("In componentDidMount");
                console.log("Company details", response.data[0]);
                console.log(this.state.companyDetails);
                console.log(this.state.companyDetails.reviews);
            })
            .catch((error) => {
                console.log(error);
            }
            )

        axios.get(BACKEND_URL + GET_POSITIVE_REVIEW + "?companyId=" + companyId)
            .then((response) => {
                //console.log("positive review");
                this.setState({ positiveReviews: response.data.positiveReviews[0] });
                //console.log(this.state.positiveReviews);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(BACKEND_URL + GET_NEGATIVE_REVIEW + "?companyId=" + companyId)
            .then((response) => {
                //console.log("negative review");
                this.setState({ negativeReviews: response.data.negativeReviews[0] });
                //console.log(this.state.negativeReviews);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(BACKEND_URL + GET_REVIEW_AVERAGE + "?companyId=" + companyId)
            .then((response) => {
                //console.log("review average");
                this.setState({ avgReviews: response.data });
                //console.log(this.state.avgReviews);
            })
            .catch((error) => {
                console.log(error);
            });
        // axios.get(BACKEND_URL + GET_COMPANY_REVIEWS + "?companyId=" + companyId)
        //     .then((response) => {
        //         console.log(response.data);
        //         console.log(response.data.reviews);
        //         this.setState({ reviews: response.data.reviews });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     }
        // )

        //Capture number of times a company is viewed

        // let views = {
        //     companyId: this.props.location.state.companyId,
        //     companyName: this.state.companyDetails.companyName
        // }


        // axios.post(BACKEND_URL + POST_COMPANYVIEWS, views)

        //     .then((response) => {
        //         console.log("response for company views", response)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     }

        // )
        this.getResults();
    }

    handlePageClick = (e) => {
        this.setState({
            page: e.selected + 1,
        }, () => {
            this.getResults()
        });
        console.log("Page number", e.selected)
    }

    async getResults() {
        const companyId = '5fbd383a20ebc710c11cad02';
        axios.get(BACKEND_URL + GET_COMPANY_REVIEWS + "?companyId=" + companyId, {
            params: {
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then((response) => {
                console.log(response.data);
                console.log(response.data.reviews);
                this.setState({ reviews: response.data.reviews });
            })
            .catch((error) => {
                console.log(error);
            }
            )
    }

    handleChange = (e) => {
        let { value, id } = e.target;
        this.setState({ [id]: value }, () => this.getResults());
    };

    render = () => {
        //const companyId = this.state.companyDetails._id;
        console.log(this.state.companyDetails);
        return (
            <div style={{ backgroundColor: "#eaeaea" }}>
                {this.state.redirect}
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h4><b>{this.state.companyDetails.companyName}</b></h4>
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
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5>Company Overview</h5>
                        </Col>
                    </Row>
                    <Container style={{ width: "80%" }}>
                        <Row>
                            <Col md="3">
                                <p>Website:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.website}</p>
                            </Col>
                            <Col md="3">
                                <p>Headquarters:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.headquarters}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Size:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.companySize}</p>
                            </Col>
                            <Col md="3">
                                <p>Founded:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.founded}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Type:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.companyType}</p>
                            </Col>
                            <Col md="3">
                                <p>Industry:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.industry}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <p>Revenue:</p>
                            </Col>
                            <Col md="3">
                                <p>{this.state.companyDetails.revenue}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <p>{this.state.companyDetails.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Container style={{ marginTop: "20px", width: "70%", backgroundColor: "white" }} className="block-example border">
                    <Row style={{ height: "50px", marginTop: "20px" }}>
                        <Col>
                            <h5>Company Reviews</h5>
                        </Col>
                    </Row>
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
                    <Row style={{ width: "100%" }}>
                        {this.state.reviews.map((item) => {
                            return <ReviewCard {...item} />;
                        })}
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
                </Container>
            </div>
        )
    }
}