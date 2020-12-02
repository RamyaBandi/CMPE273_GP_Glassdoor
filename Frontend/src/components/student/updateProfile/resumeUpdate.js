import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";

class resumeUpdate extends Component {
    state = {  }
    render() { 
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
</ul>
</nav>
</div>
            <div class="col-9">
            <div class="container">
            <form class="md-form">
  <div class="file-field">
    <a class="btn-floating purple-gradient mt-0 float-left">
      <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i>
      <input type="file"></input>
    </a>
    <div class="file-path-wrapper">
      
    </div>
  </div>
</form>
            </div>
            
            </div>
            </div>
         );
    }
}
 
export default resumeUpdate;