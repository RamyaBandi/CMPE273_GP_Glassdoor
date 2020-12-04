import React, { Component } from 'react';
import './updateProfile.styles.css'
import axios from "axios";
import routeConstants from "../../../config/routeConstants";


class Demographics extends Component {
    state = { 
      race:"",
      gender:"",
      disability:"",
      veteranStatus:"",
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
        .put(`${routeConstants.BACKEND_URL}/student${routeConstants.PUT_STUDENT_DEMOGRAPHICS}`, req)
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
      Race/Ethnicity:
          <input
              label={this.state.oldDetails.race}
              disabled={this.state.disabled}
              value={this.state.race}
              onChange={this.handleChange}
              name="race"
          />
      </div>
      <div className="option">
      Gender:
          <input
              label={this.state.oldDetails.gender}
              disabled={this.state.disabled}
              value={this.state.gender}
              onChange={this.handleChange}
              name="gender"
          />
      </div>
      <div className="option">
      Disability:
          <input
              label={this.state.oldDetails.disability}
              disabled={this.state.disabled}
              value={this.state.disability}
              onChange={this.handleChange}
              name="disability"
          />
      </div>
      <div className="option">
      Veteran Status:
          <input
              label={this.state.oldDetails.veteranStatus}
              disabled={this.state.disabled}
              value={this.state.veteranStatus}
              onChange={this.handleChange}
              name="veteranStatus"
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
 
export default Demographics;




        
            {/* <form>
              <div>
            <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
      <div class="col-sm-8">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
          <label class="form-check-label" for="gridRadios1">
            Male
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"></input>
          <label class="form-check-label" for="gridRadios2">
            Female
          </label>
        </div>
        <div class="form-check disabled">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3"></input>
          <label class="form-check-label" for="gridRadios3">
            Non-Binary
          </label>
        </div>
        <div class="form-check disabled">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option4"></input>
          <label class="form-check-label" for="gridRadios4">
            Not Preferred
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  </div>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Disability</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
          <label class="form-check-label" for="gridRadios1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"></input>
          <label class="form-check-label" for="gridRadios2">
            No
          </label>
        </div>
        </div>
        <div class="form-check disabled">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
          <label class="form-check-label" for="gridRadios3">
            Not Preferred
          </label>
        </div>
      </div>
   
  </fieldset>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Veteran Status</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
          <label class="form-check-label" for="gridRadios1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"></input>
          <label class="form-check-label" for="gridRadios2">
            No
          </label>
        </div>
        <div class="form-check disabled">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled></input>
          <label class="form-check-label" for="gridRadios3">
            Not Preferred
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  <div class="form-group row">
    <div class="col-sm-2">Race/Ethnicity</div>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1"></input>
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1"></input>
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1"></input>
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Sign in</button>
    </div>
  </div>
</form> */}