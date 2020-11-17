import React, { Component } from 'react';
import axios from 'axios';
import './Entrystyling.css'
import { BACKEND_URL, POST_LOGIN } from '../../config/routeConstants'

// @ts-ignore  
import jwt_decode from "jwt-decode";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            token: '',
            loginFlag: true
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitLogin(event) {
        event.preventDefault();
        const customerLoginData = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(BACKEND_URL + POST_LOGIN, customerLoginData)
            .then(response => {
                if (response.data.message === "success") {
                    console.log("Token", response.data.token)
                    this.setState({
                        token: response.data.token,
                        loginFlag: true
                    })
                }
                else if (response.data.message === "error") {
                    this.setState({
                        loginFlag: false
                    })
                }
            })
    }
    render() {
        if (this.state.token) {
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("role", decoded.role);

            if (localStorage.getItem('role') === "admin") {
                this.props.history.replace(`/adminhomepage`);
            }
            else if (localStorage.getItem('role') === "student") {
                this.props.history.replace(`/studenthomepage`);
            }
            else if (localStorage.getItem('role') === "employer") {
                this.props.history.replace(`/employerhomepage`);
            }

        }
        return (
            <div class='loginContainer'>
                <div class="loginCenter">
                    <div class="loginInfo">
                        <div class="loginHeader">
                            <h5> Sign In to get instant access to millions of salaries and reviews </h5>
                        </div>

                        <form>
                            <div class="form-group">
                                <input type="email" onChange={this.ChangeHandler} class="form-control" name="email" placeholder="Email ID" required />
                            </div>
                            <div class="form-group">
                                <input type="password" onChange={this.ChangeHandler} class="form-control" name="password" placeholder="Password" required />
                            </div>
                            <button class="btn btn-success" onClick={this.submitLogin} >Sign In </button>

                        </form>
                        {this.state.loginFlag === false && <p class = "validationAlert"> Invalid Credentials. Please try again</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login