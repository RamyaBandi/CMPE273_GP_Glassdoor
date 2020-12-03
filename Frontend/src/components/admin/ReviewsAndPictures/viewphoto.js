import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { BACKEND_URL, GET_REVIEW_DETAILS } from "../../../config/routeConstants";

export default class Viewphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
          photo: {},
          companyDetails: {},
          studentDetails: {},
          redirect: null,
        };
      }
      componentDidMount() {
        const photoId = this.props.location.state;
        console.log(photoId);
      }


  render = () => {
    //console.log(this.props.reviews);

    return (
      <div>
        <p>{this.props.location.state}</p>
      </div>
    );
  };
}
