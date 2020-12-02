import React from 'react';
import { Link,withRouter } from 'react-router-dom';
// import '../../App.css'
import './loggedInNav.css'
import glassdoor_font from '../../images/glassdoor_font.PNG'
var FontAwesome = require('react-fontawesome');

class loggedInNav extends React.Component {
    constructor(){
        super()
        this.state = {
            searchParameter : '',
            selectedOption : "jobs",
            searchLocation : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleChange(event){
        event.preventDefault()
        this.setState({
            searchParameter : event.target.value
        })
       
    }

    handleLogout(event){
        event.preventDefault();
        localStorage.clear();
        this.props.history.push('/')
    }

    handleCategoryChange(event){
        event.preventDefault();
        this.setState({
            selectedOption : event.target.value
        })

    }

    submitSearch(event){
        event.preventDefault();
    }

    render() {
        return (
            <header style={{ boxShadow: "inset 0 -1px 0 0 #dee0e3", background: "#fff", height: "178px", width: "100%" }}>
                <div style={{ boxShadow: "inset 0 -1px 0 0 #dee0e3", background: "#fff", height: "90px", width: "100%" }}>
                    <nav style={{ padding: "20px" }}>
                        <table style={{ width: "80%", marginLeft: '10%', marginRight: '10%' }}>
                            <tr>
                                <td style={{ width: "15%" }} >
                                    <Link to='/adminhomepage'><img src={glassdoor_font} style={{ width: "100%" }} /></Link>
                                </td>
                                <td style={{ width: "55%" }} >
                                    <form class="form-inline">
                                        <input class="inputSearch" style={{ width: "30%", marginLeft: "20%" }}  name = "searchParameter" onChange= {this.handleChange} type="search" placeholder="Company Search" aria-label="Search" />
                                        <button class="submitSearch" style={{ marginLeft: "15px" }}  onClick={this.submitSearch} type="submit">Search</button>
                                    </form>
                                </td>
                                <td style={{ width: "10%", marginLeft: "0%" }} >

                                    <button className="fas fa-user-circle" id="logOut" style={{ color: "grey" }} onClick={this.handleLogout} title="Log Out"></button>
                                </td>
                            </tr>
                        </table>
                    </nav>

                </div>
                <div style={{ background: "#fff", height: "60px" }}>
                <h6 style={{ paddingTop: "5px", width: "80%", marginLeft: '11%', marginRight: '10%' }}></h6>
                    <nav class="navbar navbar-expand-lg navbar-light" style={{ padding: "10px", width: "80%", marginLeft: '10%', marginRight: '10%' }}>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav navbar2">
                                <li class="nav-item navWidth">
                                    <Link to="/adminanalytics" class="nav-link navTab">
                                        <i class="fas fa-briefcase"> Dashboard</i></Link>
                                    <a class="nav-link navTab" href="#"></a>
                                </li>
                                <li class="nav-item navWidth">
                                    <Link to='/listOfCompanies' class="nav-link navTab">
                                        <i class="far fa-building"> Company Profile</i></Link>
                                    <a class="nav-link navTab" href="#"></a>
                                </li>
                                <li class="nav-item navWidth">
                                    <Link to='/adminreviews' class="nav-link navTab">
                                        <i class="far fa-comment-dots">Reviews</i></Link>
                                    <a class="nav-link navTab" href="#"></a>
                                </li>
                                <li class="nav-item navWidth">
                                    <Link to='/adminphotos' class="nav-link navTab">
                                        <i class="far fa-comment-dots">Photos</i></Link>
                                    <a class="nav-link navTab" href="#"></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        )

    }
}
export default withRouter(loggedInNav);