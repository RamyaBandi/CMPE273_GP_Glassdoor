import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  BACKEND_URL,
  GET_ALL_PHOTOS,
  PUT_PHOTO_APPROVE,
  PUT_PHOTO_REJECT,
} from "../../../config/routeConstants";


class AdminPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      addedItem:    {},
      cart:         {},
      addedItem2:    {},
      cart2:         {},
      redirect: null,
    };
  }

  componentDidMount() {
    const company_id = '5fb4884acf339e3da0d5c31e';
    //const company_id = this.props.location.state;
    axios
      .get(BACKEND_URL + GET_ALL_PHOTOS)
      .then((response) => {
        this.setState({ photos: response.data.photos });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

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
            this.photoData = {   
                photoId: this.state.cart[i]._id
            };
            axios.put(BACKEND_URL + PUT_PHOTO_APPROVE, this.photoData)
                    .then(response => {
                        console.log("Photo approved successfully");
                    }) 
        }                
      };

      onSubmitRejection = async (e) => {
        for(let i in this.state.cart2){
            this.photoData2 = {   
                photoId: this.state.cart2[i]._id
            };
            axios.put(BACKEND_URL + PUT_PHOTO_REJECT, this.photoData2)
                    .then(response => {
                        console.log("Photo rejected successfully");
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
                        {this.state.photos.map(item=>{
                            return (<Col md={12}>
                                <Row style={{marginRight:"30px", martinLeft: "40px", marginTop: "5px"}}>
                                    <Col md="1">
                                    {/* <Link to={{ pathname: "/viewphoto", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item._id}</Link> */}
                                    </Col>
                                    <Col md="2">
                                    <Link to={{ pathname: "/viewphoto", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item.photoURL}</Link>
                                    </Col>
                                    <Col md="3">
                                    <Link to={{ pathname: "/viewphoto", state: item._id }} 
                                    style={{ color: "#060008", marginTop: "5px", marginBottom: "5px", width: "100%" }}>{item.uploadDate}</Link>
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
        
      </div>
    );
  };
}

export default AdminPhotos;
