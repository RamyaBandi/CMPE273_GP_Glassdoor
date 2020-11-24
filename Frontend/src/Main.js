import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyOverview from './components/student/companyOverview';
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
import EmployerHomePage from './components/employer/homePage/EmployerHome'
import Reviews from './components/reviews/reviews';
import AddReview from './components/reviews/addReview';
import Salaries from './components/salaries/salaries';
import AddSalary from './components/salaries/addSalary';
import AddInterview from './components/interviews/addInterview';
import JobsHome from './components/employer/jobs/jobsHome/JobsHome';
import PostJobs from './components/employer/jobs/postJobs/PostJobs';

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

                    <Route exact path="/reviews" component={(props) => <Reviews {...props} />} />
                    <Route exact path="/addreview" component={(props) => <AddReview {...props} />} />
                    <Route exact path="/overview" component={companyOverview} />
                    <Route exact path="/salaries" component={(props) => <Salaries {...props} />} />
                    <Route exact path="/addsalary" component={(props) => <AddSalary {...props} />} />
                    <Route exact path="/addinterview" component={(props) => <AddInterview {...props} />} />

                    {//Employer Routes
                    }

                    <Route exact path="/employer/home" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/employer/jobs" render={props => <JobsHome {...props} />} />
                    <Route exact path="/employer/jobs" render={props => <JobsHome {...props} />} />
                    <Route exact path="/employer/jobs/post" render={props => <PostJobs {...props} />} />
                    <Route exact path="/employer/profile" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/employer/reviews" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/employer/analytics" render={props => <EmployerHomePage {...props} />} />
                </div>
            </div>
        )
    }
}

//Export The Main Component
export default Main;