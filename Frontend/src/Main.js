import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CompanyOverview from './components/student/companyTabs/companyOverview';
import CompanyJobs from './components/student/companyTabs/companyJobs/companyJobs';
import JobApplication from './components/student/companyTabs/companyJobs/jobApplication';
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
import AdminAnalytics from './components/admin/Dashboard/AdminAnalytics'
import ListOfCompanies from './components/admin/CompanyProfilePage/listOfCompanies';
import CompanyProfilePage from './components/admin/CompanyProfilePage/companyProfilePage';
import EmployerHomePage from './components/employer/homePage/EmployerHome'
import Reviews from './components/student/companyTabs/reviews/reviews';
import AddReview from './components/student/companyTabs/reviews/addReview';
import Salaries from './components/student/companyTabs/salaries/salaries';
import AddSalary from './components/student/companyTabs/salaries/addSalary';
import Interviews from './components/student/companyTabs/interviews/interviews';
import AddInterview from './components/student/companyTabs/interviews/addInterview';
import JobsHome from './components/employer/jobs/jobsHome/JobsHome';
import PostJobs from './components/employer/jobs/postJobs/PostJobs';
import ListJobs from './components/employer/jobs/listJobs/ListJobs';
import ListCompanyJobs from './components/employer/jobs/listJobs/ListCompanyJobs';
import EditJobs from './components/employer/jobs/editJobs/EditJobs';
import ListApplications from './components/employer/jobs/applications/listApplications/listApplications';
import EmployerUpdateProfile from './components/employer/updateProfile/employerUpdateProfile';
import AnalyticsHome from './components/employer/analytics/AnalyticsHome';
import EmployerReview from './components/employer/reviews/employerReviews'
import StudentUpdateProfile from './components/student/updateProfile/updateProfile'
import StudentReviews from './components/student/updateProfile/studentReviews'
import JobPreference from './components/student/updateProfile/jobPreferences'
import Demographics from './components/student/updateProfile/demographics'
import ResumeUpdate from './components/student/updateProfile/resumeUpdate'
import Photos from './components/student/companyTabs/photos/parent';
import AdminReviews from './components/admin/ReviewsAndPictures/adminReviews'
import ViewReview from './components/admin/ReviewsAndPictures/viewreview'
import AdminPhotos from './components/admin/ReviewsAndPictures/adminPhotos'
<<<<<<< HEAD
import StudentGallery from './components/student/updateProfile/studentGallery'
=======
import ViewPhoto from './components/admin/ReviewsAndPictures/viewphoto'
>>>>>>> 53675831cf9a65b4961acb81a54974d0ccc8c01e

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
                    <Route exact path="/adminanalytics" render={props => <AdminAnalytics {...props} />} />
                    <Route exact path="/listOfCompanies" render={props => <ListOfCompanies {...props} />} />
                    <Route exact path="/companyProfilePage" render={props => <CompanyProfilePage {...props} />} />

                    <Route exact path="/reviews" component={(props) => <Reviews {...props} />} />
                    <Route exact path="/addreview" component={(props) => <AddReview {...props} />} />
                    <Route exact path="/overview" component={CompanyOverview} />
                    <Route exact path="/jobs" component={(props) => <CompanyJobs {...props} />} />
                    <Route exact path="/jobApplication" component={(props) => <JobApplication {...props} />}/>
                    <Route exact path="/photos" component={(props) => <Photos {...props} />}/>
                    <Route exact path="/salaries" component={(props) => <Salaries {...props} />} />
                    <Route exact path="/addsalary" component={(props) => <AddSalary {...props} />} />
                    <Route exact path="/interviews" component={(props) => <Interviews {...props} />} />
                    <Route exact path="/addinterview" component={(props) => <AddInterview {...props} />} />
                    <Route exact path="/adminreviews" component={(props) => <AdminReviews {...props} />} />
                    <Route exact path="/viewreview" component={(props) => <ViewReview {...props} />} />
                    <Route exact path="/adminphotos" component={(props) => <AdminPhotos {...props} />} />
                    <Route exact path="/viewphoto" component={(props) => <ViewPhoto {...props} />} />

                    <Route exact path="/student/profile" render={props => <StudentUpdateProfile {...props} />} />
                    <Route exact path="/student/reviews" render={props => <StudentReviews {...props} />} />
                    <Route exact path="/student/jobpreference" render={props => <JobPreference {...props} />} />
                    <Route exact path="/student/demographics" render={props => <Demographics {...props} />} />
                    <Route exact path="/student/resume" render={props => <ResumeUpdate {...props} />} />
                    <Route exact path="/student/gallery" render={props => <StudentGallery {...props} />} />
                    {//Employer Routes
                    }

                    <Route exact path="/employer/home" render={props => <EmployerHomePage {...props} />} />
                    <Route exact path="/employer/jobs" render={props => <JobsHome {...props} />} />
                    <Route exact path="/employer/jobs/post" render={props => <PostJobs {...props} />} />
                    <Route exact path="/employer/jobs/list" render={props => <ListCompanyJobs {...props} />} />
                    <Route exact path="/employer/jobs/edit" render={props => <EditJobs {...props} />} />
                    <Route exact path="/employer/jobs/applications" render={props => <ListApplications {...props} />} />
                    <Route exact path="/company/profile" render={props => <EmployerUpdateProfile{...props} />} />
                    <Route exact path="/employer/reviews" render={props => <EmployerReview {...props} />} />
                    <Route exact path="/employer/analytics" render={props => <AnalyticsHome {...props} />} />
                </div>
            </div>
        )
    }
}

//Export The Main Component
export default Main;