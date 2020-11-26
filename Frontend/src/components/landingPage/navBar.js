import React, { Component } from 'react';
import '../../App.css';
import LoggedInNav from './loggedInNav';
import LoggedOutNav from './loggedOutNav';
//create the Navbar Component
class Navbar extends Component {
    // handle logout to destroy the cookie

    render() {
        return (
            <div>
            {localStorage.getItem('id') ? <LoggedInNav /> : <LoggedOutNav />} 
            </div>
        )
    }
}

export default Navbar;