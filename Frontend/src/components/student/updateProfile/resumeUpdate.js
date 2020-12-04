import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
import ResumeList from './resumeList';

class resumeUpdate extends Component {
    state = {
      uploadDate:"",
      studentId:"",
      uploadFileName:"",
      selectedFile: null,
        img: null,
        resumeUrl: "",
        oldDetails: {},
        resumes:[],
      }

      componentWillMount() {

        //console.log(this.props)
        //console.log(localStorage.getItem('mongoId'))
        let student_id=localStorage.getItem('mongoId')
        //axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(`${routeConstants.BACKEND_URL}/student${routeConstants.GET_STUDENT_RESUMES}`,
        {
            params: {
                studentId: student_id
            }
        }).then((res) => {

                console.log(res.data);
                this.setState({ oldDetails:res.data , 
                  resumes: res.data
                }, () => {
                    //console.log(res.data);
                });
                console.log(this.state);


            })

        }

    onFileUpload = e => {
      let student_id=localStorage.getItem('mongoId')
      console.log(student_id)
      this.setState({studentId: student_id});
      let formData = new FormData();
      console.log(this.state._id)
      console.log(this.state)
      console.log(this.state.selectedFile)
      formData.append('file', this.state.selectedFile);
      formData.append('studentId', student_id)
      formData.append('fileName',this.state.selectedFile.name)

      console.log(formData)
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
      axios
          .post(
              `${routeConstants.BACKEND_URL}/student${routeConstants.POST_RESUME_UPLOAD}`,
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

      console.log(event)
      this.setState({ selectedFile: event.target.files[0] });
      if (this.state.selectedFile) {
          this.setState({ app: this.state.selectedFile.name });
      }
      console.log(this.state)
  }



    render() { 
      let resumes=[];
        if(this.state.resumes.length>0){
            this.state.resumes.map((resume)=>{
                resumes.push(<ResumeList resumeitem={resume}/>)
            })
        }
        else{
        resumes.push(<h4>Please upload Primary Resume</h4>)
        }
        console.log(resumes)
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
             <h4>Upload your Resume</h4> 
             <br></br>
             <br></br>
            <form class="md-form">
  <div class="file-field">
    <a class="btn-floating purple-gradient mt-0 float-left">
      <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i>
      <input type="file" onChange={this.onFileChange}></input>
    </a>
    <div class="file-path-wrapper">
      
    </div>
  </div>
</form>
<button className="btn btn-success" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
{this.fileData()}
            </div>
{this.state.imageUrl}
<br>
</br>
<br></br>
<div>
  {resumes}
</div>
            
            </div>
            </div>
         );
    }
}
 
export default resumeUpdate;