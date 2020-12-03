import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
import ReviewCard from '../../employer/reviews/reviewCard'
import { Link } from "react-router-dom";

class StudentReviews extends Component {
    state = {  
        ratingcount:0,
        reviews:[]
    }
    componentWillMount() {

        //console.log(this.props)
        //console.log(localStorage.getItem('mongoId'))
        let student_id=localStorage.getItem('mongoId')
        //let student_id="5fb48df63d242fa0842343f3"
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        axios.get(`${routeConstants.BACKEND_URL}/student${routeConstants.GET_COUNT_RATINGS}`,
        {
            params: {
                studentId: student_id
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({ratingcount:res.data.length,
            reviews:res.data})
            console.log(this.state.ratingcount)
            console.log(this.state.reviews)
  
            })
  
        }
    
    render() { 
        let reviews=[]
        if (this.state.reviews && this.state.reviews.length > 0){
       
            this.state.reviews.map((review)=>{
                reviews.push(<ReviewCard reviewitem={review}/>)
            })
        }
        else{
            reviews.push(<h4>No reviews added yet!!</h4>)
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
            <div class="card">
            <div class="card-header container-fluid">
  <div class="row">
    <div class="col-md-10">
      <h5 class="w-75 p-3">Total reviews given are : {this.state.ratingcount}<br>
    </br>
    Total ratings given are: {this.state.ratingcount}</h5>
    </div>
    <div class="col-md-2 float-right">
      <Link class="btn btn-success" to={{
              pathname: `/student/gallery`,
              
            }}>Gallery</Link>
     </div>
  </div>
</div>



</div>
{reviews}
            </div>
            
            </div>
            </div>
         );
    }
}
 
export default StudentReviews;