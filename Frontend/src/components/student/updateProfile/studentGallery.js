import React, { Component } from 'react';
import PhotoGrid from './photoGrid'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
class StudentGallery extends Component {
    state = { 
        photos:[],
        oldDetails:[],
     }
     componentWillMount() {

        //console.log(this.props)
        //console.log(localStorage.getItem('mongoId'))
        //let student_id=localStorage.getItem('mongoId')
        let student_id="5fb48df63d242fa0842343f3"
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
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
        if(this.state.photos.length>0){
            this.state.photos.map((photo)=>{
                photos.push(<PhotoGrid photoitem={photo}/>)
            })
        }
        else{
            photos.push(<h4>No photo added yet!!</h4>)
        }


        return (
<div class="row">
<div class="col-3">
<nav class ="navbar bg-dark">
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
            <div>
                <PhotoGrid />
            </div>
            </div>
            </div>
            </div>
          );
    }
}
 
export default StudentGallery;