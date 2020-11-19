import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import LandingPageDesc from './landingPageDescription'

class loggedOutNav extends React.Component {
    constructor(){
        super()
        this.state = {
            displayLandingPageDesc: true,
        }
        this.handleLandingPageDesc = this.handleLandingPageDesc.bind()
    }

    componentDidMount() {
        if (localStorage.getItem('id')) {
            this.setState({
                displayLandingPageDesc: false
            })
        }
    }

    handleLandingPageDesc = ()=> {
        this.setState({
            displayLandingPageDesc: false
        })
    }
    render(){
        return(
            <div>
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#0caa41" ,width: "100%", height: "60px"}}>
            <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <ul className="navbar-nav">

                            <li class="nav-item active">
                                <Link to='/home'
                                    style={{ color: "white", fontFamily: "sans-serif", fontSize: "16px", fontWeight: "bold", padding: "7px" }}>
                                    glassdoor<span className="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/home'
                                    style={{ color: "white", fontFamily: "sans-serif", fontSize: "16px", padding: "7px" }}>
                                    Find a Job</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/home'
                                    style={{ color: "white", fontFamily: "sans-serif", fontSize: "16px", padding: "7px" }}>
                                    For Employers</Link>
                            </li>
                        </ul>
                    </ul>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/register"
                                onClick={this.handleLandingPageDesc} style={{ color: "white", fontFamily: "sans-serif", fontSize: "16px", padding: "7px" }}><span className="glyphicon glyphicon-log-in" /> Register </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/login"
                                onClick={this.handleLandingPageDesc} style={{ color: "white", fontFamily: "sans-serif", fontSize: "16px", padding: "7px" }}><span className="glyphicon glyphicon-log-in" /> Sign In </Link>
                        </li>
                    </ul>
                </ul>
            </nav>
            {this.state.displayLandingPageDesc && <LandingPageDesc />}
        </div>
        )
    }
}

export default loggedOutNav;