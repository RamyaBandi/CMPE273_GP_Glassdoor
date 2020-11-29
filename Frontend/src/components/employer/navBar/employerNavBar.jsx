import React from 'react';
import { Link } from 'react-router-dom';
// import '../../App.css'
import './loggedInNav.css'
import glassdoor_font from '../../../images/glassdoor_font.PNG'
// var FontAwesome = require('react-fontawesome');

class EmployerNavBar extends React.Component {
    handleLogout = () => {

        localStorage.clear();
        // console.log(this.props)
        this.props.props.history.push('/')

    }
    render() {
        return (
            <div>
                <header style={{ boxShadow: "inset 0 -1px 0 0 #dee0e3", background: "#fff", width: "100%" }}>
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #dee0e3", background: "#fff", width: "100%" }}>
                        <nav style={{ padding: "20px" }}>
                            <table style={{ width: "80%", marginLeft: '10%', marginRight: '10%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "15%" }} >
                                            <Link to='/employer/home'><img src={glassdoor_font} style={{ width: "100%" }} /></Link>
                                        </td>
                                        <td style={{ width: "75%" }} >
                                        </td>
                                        <td style={{ width: "10%", marginLeft: "0%" }} >
                                            <button type="button" className="btn btn-success" onClick={this.handleLogout} title="Log Out">Logout</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </nav>

                    </div>
                    <div >
                        {/* <h6 style={{ paddingTop: "5px", width: "80%", marginLeft: '11%', marginRight: '10%' }}> Hello, what do you want to explore today?</h6> */}
                        <nav className="navbar navbar-expand-lg navbar-light" style={{ padding: "10px", width: "80%", marginLeft: '10%', marginRight: '10%' }}>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav navbar2">
                                    <li className="nav-item navWidth">
                                        <Link to='/employer/jobs' className="nav-link navTab">
                                            <i className="fas fa-briefcase"> Jobs</i></Link>
                                        {/* <a className="nav-link navTab" href="#"></a> */}
                                    </li>
                                    <li className="nav-item navWidth">
                                        <Link to='/employer/candidates' className="nav-link navTab">
                                            <i className="far fa-building"> Candidates</i></Link>
                                        {/* <a className="nav-link navTab" href="#"></a> */}
                                    </li>
                                    <li className="nav-item navWidth">
                                        <Link to='/employer/analytics' className="nav-link navTab">
                                            <i className="far fa-comment-dots">Analytics</i></Link>
                                        {/* <a className="nav-link navTab" href="#"></a> */}
                                    </li>
                                    <li className="nav-item navWidth">
                                        <Link to='/company/profile' className="nav-link navTab">
                                            <i className="fas fa-money-check-alt">Profile</i></Link>
                                        {/* <a className="nav-link navTab" href="#"></a> */}
                                    </li>
                                </ul>
                            </div>

                        </nav>
                        <hr />
                    </div>
                </header>
            </div>
        )

    }
}
export default EmployerNavBar;