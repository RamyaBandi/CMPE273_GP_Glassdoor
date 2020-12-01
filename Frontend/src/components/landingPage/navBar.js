import React, { Component } from 'react';
import '../../App.css';
import StudentNavBar from './StudentNavBar';
import LoggedOutNav from './loggedOutNav';
import EmployerNavBar from '../employer/navBar/employerNavBar';
import AdminNavBar from './AdminNavBar';
//create the Navbar Component
class Navbar extends Component {
    // handle logout to destroy the cookie

    render() {
        let renderVar
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('role') === 'employer') {
                renderVar = <EmployerNavBar props={this.props} />
            }
            else if (localStorage.getItem('role') === 'student')  {
                renderVar = <StudentNavBar props={this.props} />
            }
            else if (localStorage.getItem('role') === 'admin')  {
                renderVar = <AdminNavBar props={this.props} />
            }
        }
        else {
            renderVar = <LoggedOutNav />
        }

        return (
            <div>
                {/* {localStorage.getItem('id') ? <LoggedInNav /> : <LoggedOutNav />}  */}
                {renderVar}
            </div>
        )
    }
}

export default Navbar;