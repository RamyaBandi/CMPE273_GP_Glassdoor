import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyOverview from './components/companyOverview';
import NavBar from './components/landingPage/navBar'
import LandingPageDesc from './components/landingPage/landingPageDescription'
import Register from './components/Registration_Login/Registration'
import Login from './components/Registration_Login/Login'
import StudentHomePage from './components/student/studentHomePage'
import SalariesTab from './components/student/HomePageTabs/salaries'
import CompaniesTab from './components/student/HomePageTabs/companies'
import InterviewsTab from './components/student/HomePageTabs/interviews'
import JobsTab from './components/student/HomePageTabs/jobs'
import AdminHomePage from './components/admin/adminHomePage'
import EmployerHomePage from './components/employer/employerHomePage'
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
                    <Route exact path="/jobstab" render={props => <JobsTab {...props} />} />
                    <Route exact path="/companiestab" render={props => <CompaniesTab {...props} />} />
                    <Route exact path="/salariestab" render={props => <SalariesTab {...props} />} />
                    <Route exact path="/interviewstab" render={props => <InterviewsTab {...props} />} />
                    <Route exact path="/adminhomepage" render={props => <AdminHomePage {...props} />} />
                    <Route exact path="/employerhomepage" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/reviews" component={reviews} />
                    <Route path = "/overview" component = {companyOverview} />
                    </div>
                </div>
        )
    }
}

//Export The Main Component
export default Main;