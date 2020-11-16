import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import NavBar from './landingPage/navBar'
import LandingPageDesc from './landingPage/landingPageDescription'
import Register from './Registration_Login/Registration'
import Login from './Registration_Login/Login'
import StudentHomePage from './student/studentHomePage'
import AdminHomePage from './admin/adminHomePage'
import EmployerHomePage from './employer/employerHomePage'


// Create a Main Component

class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <div id="site-content">
                <Route path="/" render={props => <NavBar {...props} />}/>
                <Route path="/home" render={props => <LandingPageDesc {...props} />}/>
                <Route exact path="/register" render={props => <Register {...props} />}/>
                <Route exact path="/login" render={props => <Login {...props} />}/>
                <Route exact path="/studenthomepage" render={props => <StudentHomePage {...props} />}/>
                <Route exact path="/adminhomepage" render={props => <AdminHomePage {...props} />}/>
                <Route exact path="/employerhomepage" render={props => <EmployerHomePage {...props} />}/>
                </div>
            </div>
        )
    }
}
// Export The Main Component

export default Main;