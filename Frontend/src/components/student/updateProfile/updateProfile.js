import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
class StudentUpdateProfile extends Component {
    state = {  
      studentName: "",
      email: "",
      phoneNumber: "",
      website: "",
      location:"",
      education:"",
      experience:"",
      interestedJobtitle: "",
    degree:"",
    selectedFile: null,
    img: null,
    yearsOfExperience:"",
    aboutMe:"",
    imageUrl: "",
      MODIFIED: "",
      disabled: true,
      editstate: false,
      oldDetails: {},
    }
    handleChange = (e) => {
      
      const { value, name } = e.target;
      this.setState({ [name]: value });

  };

  componentWillMount() {

      //console.log(this.props)
      //console.log(localStorage.getItem('mongoId'))
      let student_id=localStorage.getItem('mongoId')
      axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
      axios.get(`${routeConstants.BACKEND_URL}/student${routeConstants.GET_STUDENT_SIGNUP}`,
      {
          params: {
              studentId: student_id
          }
      }).then((res) => {

              console.log(res.data[0]);
              this.setState({ oldDetails: {...res.data[0]} , 
              ...res.data[0]
              }, () => {
                  //console.log(res.data);
              });
              console.log(this.state);


          })

      }

      handleEdit = (e) => {
          e.preventDefault();
  
          this.setState((prevstate) => ({
              editstate: !prevstate.editstate,
              disabled: !prevstate.disabled,
          }));
      };
      handleCancelEdit = (e) => {
          e.preventDefault();
          if (!this.state.editstate) {
              this.setState((prevstate) => ({
              
                  ...prevstate.oldData,
              }));
          }
      };
      handleSave = (e) => {
          e.preventDefault();
          const {
              disabled,
              editstate,
              oldDetails,
              ...userDetails
  
          } = this.state;
  
  
          const req = {
              ...userDetails,
              studentId: localStorage.getItem('mongoId')
          };
          console.log(req)
          axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
  
          axios
              .put(`${routeConstants.BACKEND_URL}/student${routeConstants.PUT_STUDENT_SIGNUP}`, req)
              .then((res) => {
                  console.log(res)
                  if (res.status === 200) {
                      window.alert("Changes Updated Successfully");
                  }
              }).catch((err) => {
                  window.alert("Unable to update changes");
              });
      };
  
  
  
      onFileUpload = e => {

          let formData = new FormData();
          console.log(this.state._id)
          console.log(this.state)
          console.log(this.state.selectedFile)
          formData.append("file", this.state.selectedFile);
          formData.append('studentId', this.state._id)
          
           
          axios
              .post(
                  `${routeConstants.BACKEND_URL}/image${routeConstants.POST_IMAGE_STUDENT_PROFILE}`,
                  // {
                  //     file: formData,
                  //     companyId: this.state.companyId,
                  
                  // }
                  formData
              )
              .then(response => {
                  window.location.reload(false)
              });
      };
  
  
      fileData = () => {
          if (this.state.selectedFile) {
              return (
                  <div>
  
                      <p>File Name: {this.state.selectedFile.name}</p>
  
                  </div>
              );
          }

      };
  
  
  
  
      onFileChange = event => {
  
          this.setState({ selectedFile: event.target.files[0] });
          if (this.state.selectedFile) {
              this.setState({ app: this.state.selectedFile.name });
          }
      }

    render() { 
        var profileURL =""
        if(this.state.imageUrl){
            var profileURL=this.state.imageUrl.split('?')[0]
        }
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
<li class ="nav-item">
<a class ="nav-link" href="/student/gallery">Gallery</a>
</li>
</ul>
</nav>
</div>
<div class="col-9">
<div class="container">
<div className="profile">

<div className="imageDiv">
<img src={profileURL} width='250px' alt="profileImage   " height='250px' className="imageCont" />
                    <input type="file" onChange={this.onFileChange} id="fileinput" />
                    <button className="btn btn-success" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
                    {this.fileData()}
  </div>
  <form className="userdetails" encType="multipart/form-data">
      <h2>Edit Profile Details</h2>
      <div className="option">
      Student Name:
          <input
              label={this.state.oldDetails.studentName}
              disabled={this.state.disabled}
              value={this.state.studentName}
              onChange={this.handleChange}
              name="studentName"
          />
      </div>
      <div className="option">
      Website:
          <input
              label={this.state.oldDetails.website}
               disabled={this.state.disabled}
              value={this.state.website}
            onChange={this.handleChange}
              name="website"
              id="website"
            
          />
      </div>
      <div className="option">
      Phone Number:
          <input
              label={this.state.oldDetails.phoneNumber}
              disabled={this.state.disabled}
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              name="phoneNumber"
              id="phoneNumber"
          />
      </div>

      <div className="option">
          Current Location:
          <input
              label={this.state.oldDetails.location}
              disabled={this.state.disabled}
              value={this.state.location}
              onChange={this.handleChange}
              name="location"
          />
      </div>

      <div className="option">
          Recent University Attended:
          <input
              label={this.state.oldDetails.education}
             disabled={this.state.disabled}
              value={this.state.education}
              onChange={this.handleChange}
              name="education"
          />
      </div>
      <div className="option">
          Recent Company Worked with:
          <input
              label={this.state.oldDetails.experience}
              disabled={this.state.disabled}
              value={this.state.experience}
              onChange={this.handleChange}
              name="experience"
          />
      </div>
      <div className="option">
          Brief Introduction:
          <input
              label={this.state.oldDetails.aboutMe}
              disabled={this.state.disabled}
              value={this.state.aboutMe}
              onChange={this.handleChange}
              name="aboutMe"
          />
      </div>

      <div className="option">
          Interested Job Title:
          <input
              label={this.state.oldDetails.interestedJobtitle}
              disabled={this.state.disabled}
              value={this.state.interestedJobtitle}
              onChange={this.handleChange}
              name="interestedJobtitle"
          />

      </div>
      <div className="option">
          Highest Degree:
          <input
              label={this.state.oldDetails.degree}
              disabled={this.state.disabled}
              value={this.state.degree}
              onChange={this.handleChange}
              name="degree"
          />

      </div>
      <div className="option">
          Total Work Experience:
          <input
              label={this.state.oldDetails.yearsOfExperience}
              disabled={this.state.disabled}
              value={this.state.yearsOfExperience}
              onChange={this.handleChange}
              name="yearsOfExperience"
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