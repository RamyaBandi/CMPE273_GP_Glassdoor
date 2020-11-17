import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import LandingPageDesc from './landingPageDescription'

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {
            displayLandingPageDesc: true,
        }

        this.handleLandingPageDesc = this.handleLandingPageDesc.bind(this);
    }
    // handle logout to destroy the cookie

    handleLandingPageDesc() {
        this.setState({
            displayLandingPageDesc: false
        })
    }
    componentDidMount() {
        if (localStorage.getItem('id')) {
            this.setState({
                displayLandingPageDesc: false
            })
        }
    }

    render() {
        //if localStorage is set render Logout Button
        let navLogin = null;
        if (localStorage.getItem('id')) {
            console.log("Able to read local session storage details");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/home" onClick={this.handleRestaurantLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read local session storage details");
            navLogin = (
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
            )
        }

        let customerFeatures = null;
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('role') === 'customer') {
                customerFeatures = (
                    <ul class="nav navbar-nav">
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/customerhomepage/${localStorage.getItem('id')}`)}>Home</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/gotoconversations")}>Messages</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/mainevents`)}>Events</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/allusers`)}>Users</button>
                    </ul>
                )
            }
            else if (localStorage.getItem('role') === 'restaurant') {
                customerFeatures = (
                    <ul class="nav navbar-nav">
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/restauranthomepage/${localStorage.getItem('id')}`)}>Home</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/gotoconversations")}>Messages</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/displaymenu")}>Menu</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/displayevents")}>Events</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/orders")}>Orders</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push('/viewcustomerreviews')}>Reviews</button>
                    </ul>
                )
            }
        }
        else {
            customerFeatures = (
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
            )
        }
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        {customerFeatures}
                    </div>
                    {navLogin}
                </nav>
                {this.state.displayLandingPageDesc && <LandingPageDesc />}
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         restaurantProfileLogout: (data) => dispatch(restaurantProfileLogout(data)),
//         customerProfileLogout :() => dispatch(customerProfileLogout()),
//     }
// }
// export default connect(null, mapDispatchToProps)(Navbar);
export default Navbar;