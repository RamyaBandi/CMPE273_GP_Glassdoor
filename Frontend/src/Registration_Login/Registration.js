import React, { Component } from 'react';
import axios from 'axios'
import './Entrystyling.css'
import { withRouter } from 'react-router-dom'
import {BACKEND_URL, POST_REGISTRATION} from '../config/routeConstants'

class Registration extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            role : '',
            checked : false
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitRegistration = this.submitRegistration.bind(this)
        // this.handlerole = this.handlerole.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value)
    }
    submitRegistration(event) {
        //prevent page from refresh
        event.preventDefault();
        const RegistrationData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role : this.state.role
        }
        console.log("Registration data", RegistrationData)
        // set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(BACKEND_URL + POST_REGISTRATION, RegistrationData)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.data.message === "Registered Successfully") {
                    alert("User Registration successful")
                    this.props.history.push('/login');
                    // return <Redirect to='/login' />
                    // this.context.router.history.push(`/login`)
                }
            })
            // .catch(error => {
            //     console.log(error.response.data.msg)
            //     alert(error.response.data.msg)
            // })
    }
    render() {
        return (
            <div class="landingPageContainer">
                <div class="center">
                    <div class="RegistrationInfo">
                        <form>
                            <div class="radiotext">
                                <input onChange={this.ChangeHandler} type="radio" value="student" name="role" checked= {this.state.role === "student"}/> Student  
                                <input onChange={this.ChangeHandler} type="radio" value="employer" name="role" checked= {this.state.role === "employer"} /> Employer
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="text" class="form-control" name="name" placeholder="Name" required/>
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID"  required/>
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <button onClick={this.submitRegistration} class="btn btn-success">Sign Up</button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Registration);