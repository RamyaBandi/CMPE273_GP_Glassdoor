import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
class StudentUpdateProfile extends Component {
    state = {  

    }


    render() { 
        let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_path}`
        return ( 
            // <h4>Student Update Profile</h4>

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
<div className="profile">
{/* 
<div className="imageDiv">
      <img src={profileURL} width='250px' height='250px' alt="profileImage" className="imageCont" />
      <input type="file"
    //    onChange={this.onFileChange}
        />
      <button className="btn btn-success" style={{ width: '100px' }} 
    //   onClick={this.onFileUpload}
      >Upload!</button>
      {this.fileData()}
  </div> */}
  <form className="userdetails" encType="multipart/form-data">
      <h2>Edit Profile Details</h2>
      <div className="option">
      Name:
          <input
            //   label={this.state.oldDetails.companyName}
            //   disabled={this.state.disabled}
            //   value={this.state.companyName}
            //   onChange={this.handleChange}
            //   name="companyName"
          />
      </div>
      <div className="option">
      Website:
          <input
            //   label={this.state.oldDetails.website}
            //    disabled={this.state.disabled}
            //   value={this.state.website}
            //   onChange={this.handleChange}
            //   name="Website"
            //   width="200px"
          />
      </div>
      <div className="option">
      CompanySize:
          <input
            //   label={this.state.oldDetails.companySize}
            //   disabled={this.state.disabled}
            //   value={this.state.companySize}
            //   onChange={this.handleChange}
            //   name="companySize"
            //   id="companySize"
          />
      </div>

      <div className="option">
          CompanyType:
          <input
            //   label={this.state.oldDetails.companyType}
            //   disabled={this.state.disabled}
            //   value={this.state.companyType}
            //   onChange={this.handleChange}
            //   name="companyType"
          />
      </div>

      <div className="option">
          Revenue:
          <input
            //   label={this.state.oldDetails.revenue}
            //  disabled={this.state.disabled}
            //   value={this.state.revenue}
            //   onChange={this.handleChange}
            //   name="revenue"
          />
      </div>
      <div className="option">
          HeadQuarters:
          <input
            //   label={this.state.oldDetails.headquarters}
            //   disabled={this.state.disabled}
            //   value={this.state.headquarters}
            //   onChange={this.handleChange}
            //   name="headquarters"
          />
      </div>
      <div className="option">
          Industry:
          <input
            //   label={this.state.oldDetails.industry}
            //   disabled={this.state.disabled}
            //   value={this.state.industry}
            //   onChange={this.handleChange}
            //   name="industry"
          />
      </div>

      <div className="option">
          Mission:
          <input
            //   label={this.state.oldDetails.mission}
            //   disabled={this.state.disabled}
            //   value={this.state.mission}
            //   onChange={this.handleChange}
            //   name="mission"
          />

      </div>
      <div className="option">
          Description:
          <input
            //   label={this.state.oldDetails.description}
            //   disabled={this.state.disabled}
            //   value={this.state.description}
            //   onChange={this.handleChange}
            //   name="description"
          />

      </div>
      <div className="option">
          CEO Name:
          <input
            //   label={this.state.oldDetails.ceoName}
            //   disabled={this.state.disabled}
            //   value={this.state.ceoName}
            //   onChange={this.handleChange}
            //   name="ceoName"
          />

      </div>

      {/* {addresschange} */}
      <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
          <button className="btn btn-success" type="submit" onClick={this.handleEdit}>
              Toggle Edit

          </button>
          <button className="btn btn-success" type="submit" onClick={this.handleSave}>
              Save Changes
          </button>

      </div>
  </form>
</div >

</div>

</div>
</div>


         );
    }
}
 
export default StudentUpdateProfile;