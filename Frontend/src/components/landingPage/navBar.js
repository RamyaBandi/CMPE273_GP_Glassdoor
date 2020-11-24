import React, { Component } from 'react';
import '../../App.css';
import LoggedInNav from './loggedInNav';
import LoggedOutNav from './loggedOutNav';
import EmployerNavBar from '../employer/navBar/employerNavBar'
//create the Navbar Component
class Navbar extends Component {
    // handle logout to destroy the cookie

    render() {
        let renderVar
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('role') === 'employer') {
                renderVar = <EmployerNavBar />
            }
            else {
                renderVar = <LoggedInNav />
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