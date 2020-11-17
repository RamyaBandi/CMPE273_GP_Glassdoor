import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/landingPage/navBar'
import LandingPageDesc from './components/landingPage/landingPageDescription'
import Register from './components/Registration_Login/Registration'
import Login from './components/Registration_Login/Login'
import StudentHomePage from './components/student/studentHomePage'
import AdminHomePage from './components/admin/adminHomePage'
import EmployerHomePage from './components/employer/employerHomePage'

import companyNavBar from './components/companyNavBar';
import reviews from './components/reviews/reviews';

class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <div id="site-content">
                    <Route path="/" render={props => <NavBar {...props} />} />
                    <Route path="/home" render={props => <LandingPageDesc {...props} />} />
                    <Route exact path="/register" render={props => <Register {...props} />} />
                    <Route exact path="/login" render={props => <Login {...props} />} />
                    <Route exact path="/studenthomepage" render={props => <StudentHomePage {...props} />} />
                    <Route exact path="/adminhomepage" render={props => <AdminHomePage {...props} />} />
                    <Route exact path="/employerhomepage" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/reviews" component={reviews} />

                    {/* </div> */}
                </div>
                <Route path="/" component={companyNavBar} />
            </div>
        )
    }
}

//Export The Main Component
export default Main;