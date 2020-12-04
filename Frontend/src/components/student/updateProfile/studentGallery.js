import React, { Component } from 'react';
import PhotoGrid from './photoGrid'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
import { Row, Col, Container, Button, Pagination, Modal } from 'react-bootstrap'
import './studentGallery.styles.css'

const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
};

class StudentGallery extends Component {
    state = { 
        photos:[],
        oldDetails:[],
     }
     componentWillMount() {

        //console.log(this.props)
        //console.log(localStorage.getItem('mongoId'))
        let student_id=localStorage.getItem('mongoId')
        //let student_id="5fb48df63d242fa0842343f3"
        // axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(`${routeConstants.BACKEND_URL}/student${routeConstants.GET_PHOTOS_UPLOADED}`,
        {
            params: {
                studentId: student_id
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({oldDetails:res.data,
            photos:res.data})
            console.log(this.state)
            //console.log(this.state.reviews)
  
            })
  
        }
    render() { 
         let photos=[]
        // console.log(this.state.photos)
         if (this.state.photos && this.state.photos.length > 0){
                   
             this.state.photos.map((photo)=>{
        //         //console.log(photo)
                photos.push(<PhotoGrid photoitem={photo}/>)
             })
         }
         else{
         photos.push(<h4>Photos not added yet!!</h4>)
         }

    // let photos=[]
    // if(this.state.photos && this.state.photos.length>0){
    //     this.state.photos.map((photo)=>{
    //         photos.push(photo)
    //     })
    // }


        return (
<div class="row">
<div class="col-3">
<nav class ="navbar bg-light">
<ul class ="nav navbar-nav">
<li class ="nav-item">
<a class ="nav-link" href="/student/profile">My Details</a>
</li>
<li class ="nav-item">
<a class ="nav-link" href="/student/reviews">Reviews</a>
</li>
<li class ="nav-item">
<a class ="nav-link" href="/student/resume">Resume</a>
</li>
<li class ="nav-item">
<a class ="nav-link" href="/student/jobpreference">Job Preference</a>
</li>
<li class ="nav-item">
<a class ="nav-link" href="/student/demographics">Demographics</a>
</li>
<li class ="nav-item">
<a class ="nav-link" href="/student/gallery">Gallery</a>
</li>
</ul>
</nav>
</div>
            <div class="col-9">
            <div class="container">
                <Container style={{ backgroundColor: "#fff", marginTop: "20px", padding: "20px " }}>
                    <Row style={{ width: "78%", margin: "auto", marginBottom: "20px" }}>
                        <Col md="8">
                            <h4>Displaying Student Uploaded Photos</h4>
                        </Col>
                        
                    </Row>
                    <Row>
                        <div className="tiles">
                        
                            {photos.map((photo) => {
                                return photo
                            })}
                        </div>
                    </Row>
                    <Row >
                        <Col md="12" >


                            <Pagination style={{ justifyContent: "center" }}>

                                <Pagination.Prev />
                                <Pagination.Item active>{1}</Pagination.Item>

                                <Pagination.Item >{2}</Pagination.Item>
                                <Pagination.Item >{3}</Pagination.Item>

                                <Pagination.Next />
                            </Pagination>
                        </Col>
                    </Row>
                </Container>



           
            {/* <div class="row">
  <div class="col-md-12">

    <div id="mdb-lightbox-ui"></div>

    <div class="mdb-lightbox no-margin">

            {photos}
     

    </div>

  </div>
</div>

 */}



            </div>
            </div>
            </div>
          );
    }
}
 
export default StudentGallery;