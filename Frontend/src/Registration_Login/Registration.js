import React, { Component } from 'react';
import axios from 'axios'
import './Entrystyling.css'
import { withRouter } from 'react-router-dom'
import { BACKEND_URL, FETCH_VALIDATIONDETAILS, POST_REGISTRATION } from '../config/routeConstants'

class Registration extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            role: '',
            checked: false,
            validationdata: [],
            nameFlag: false,
            emailFlag: false,
            passwordFlag: false,
            emailtypeFlag: false,
            emptyFlag :  false
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitRegistration = this.submitRegistration.bind(this)
        // this.handlerole = this.handlerole.bind(this)
    }

    // Fetch user details to validate for unique name and unique email ID
    componentDidMount() {
        axios.get(BACKEND_URL + FETCH_VALIDATIONDETAILS)
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    validationdata: response.data.data
                })
            })
    }

    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            nameFlag: false,
            emailFlag: false,
            emailtypeFlag: false,
            passwordFlag: false,
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
    }

    validateFields() {
        let validFlag = true
        if(this.state.role.length === 0 || this.state.email.length === 0 || this.state.email.length === 0 || this.state.password.length === 0){
            validFlag = false
            this.setState({
                emptyFlag : true
            })
        }

        // Validating unique names for employers
        if (this.state.role === 'employer') {
            this.state.validationdata.map(data => {
                if (data.role === 'employer') {
                    if (data.name === this.state.name) {
                        validFlag = false
                       this.setState({
                            nameFlag: true,
                        })
                    }
                }
            })
            console.log("Inside role", validFlag)
        }

        // Validating unique email for users
        if (this.state.email) {
            this.state.validationdata.map(data => {
                if (data.email === this.state.email) {
                    validFlag = false
                    this.setState({
                        emailFlag: true,
                    })
                }
            })
            console.log("Inside email", validFlag)
        }

        // Validating email type for users
        if (this.state.email) {
            // eslint-disable-next-line
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEmail.test(this.state.email)) {
                validFlag = false
                this.setState({
                    emailtypeFlag: true,
                })
            }
        

        }

        // Validate password

        if (this.state.password) {
            // eslint-disable-next-line
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const isOk = re.test(this.state.password)

            if (!isOk) {
                validFlag = false
                this.setState({
                    passwordFlag: true,
                })
            }

        }
        console.log("Inside", validFlag);
        return validFlag
    }
    submitRegistration(event) {
        //prevent page from refresh
        event.preventDefault();
        this.setState({
            validated : true
        })

        //validate fields
        let valid = this.validateFields();
        console.log("Validity", valid)

        const RegistrationData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        console.log("Registration data", RegistrationData)
        // set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        console.log("validated flag", this.state.validated)
        if (valid === true) {
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
        }
        // .catch(error => {
        //     console.log(error.response.data.msg)
        //     alert(error.response.data.msg)
        // })
    }
    render() {
        return (
            <div class="RegistrationContainer">
                <div class="center">
                    <div class="RegistrationInfo">
                    {this.state.passwordFlag && <p class="validationAlert"> <mark>All fields are mandatory</mark> </p>}
                        <form>
                            <div class="radiotext">
                                <input onChange={this.ChangeHandler} type="radio" value="student" name="role" checked={this.state.role === "student"} style={{ color: "black", fontSize: "bold" }} /> Student
                                <input onChange={this.ChangeHandler} type="radio" value="employer" name="role" checked={this.state.role === "employer"} style={{ color: "black", fontSize: "bold" }} /> Employer
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="text" class="form-control" name="name" placeholder="Name" required />
                                {this.state.nameFlag && <p class="validationAlert"><mark>Name already exists</mark></p>}
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" required />
                                {this.state.emailFlag && <p class="validationAlert"><mark> Email ID already exists</mark></p>}
                                {this.state.emailtypeFlag && <p class="validationAlert"><mark> Please enter email in the format example@domain.com</mark> </p>}
                            </div>
                            <div class="form-group">
                                <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required />
                                {this.state.passwordFlag && <p class="validationAlert"> <mark>Please enter a valid password</mark> </p>}
                                <label style={{ textAlign: "center", lineHeight: "20px", fontSize: "14px", color: "black" }}>Password should have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number</label>
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