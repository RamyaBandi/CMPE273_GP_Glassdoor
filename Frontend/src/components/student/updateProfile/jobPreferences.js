import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";



class JobPreferences extends Component {
    state = { 
      jobSearchStatus:"",
      jobTitle:"",
      targetedSalary:0,
      relocationPreference:"",
      industryPreference:"",
      oldDetails: {},
     }



     handleradio=()=>{
      console.log("handleradio");

    }
    handleChange = (e) => {
      
      const { value, name } = e.target;
      this.setState({ [name]: value });

  };

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

componentWillMount() {

  //console.log(this.props)
  //console.log(localStorage.getItem('mongoId'))
  let student_id=localStorage.getItem('mongoId')
//   axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
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
    // axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')

    axios
        .put(`${routeConstants.BACKEND_URL}/student${routeConstants.PUT_STUDENT_JOBPREFERENCE}`, req)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                window.alert("Changes Updated Successfully");
            }
        }).catch((err) => {
            window.alert("Unable to update changes");
        });
};


    render() { 
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
              
            <form >
      <h2>Demographic Details</h2>
      <div className="option">
      Job Search Status:
          <input
              label={this.state.oldDetails.jobSearchStatus}
              disabled={this.state.disabled}
              value={this.state.jobSearchStatus}
              onChange={this.handleChange}
              name="jobSearchStatus"
          />
      </div>
      <div className="option">
      Job Title:
          <input
              label={this.state.oldDetails.jobTitle}
              disabled={this.state.disabled}
              value={this.state.jobTitle}
              onChange={this.handleChange}
              name="jobTitle"
          />
      </div>
      <div className="option">
      Targetted Salary:
          <input
              label={this.state.oldDetails.targetedSalary}
              disabled={this.state.disabled}
              value={this.state.targetedSalary}
              onChange={this.handleChange}
              name="targetedSalary"
          />
      </div>
      <div className="option">
      Willing to Relocate:
          <input
              label={this.state.oldDetails.relocationPreference}
              disabled={this.state.disabled}
              value={this.state.relocationPreference}
              onChange={this.handleChange}
              name="relocationPreference"
          />
      </div>
      <div className="option">
      Industry Prefrence:
          <input
              label={this.state.oldDetails.industryPreference}
              disabled={this.state.disabled}
              value={this.state.industryPreference}
              onChange={this.handleChange}
              name="industryPreference"
          />
      </div>
      <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
          <button className="btn btn-success" type="submit" onClick={this.handleSave}>
              Save Changes
          </button>

      </div>
      </form>

            </div>
            
            </div>
            </div>
         );
    }
}
 
export default JobPreferences;