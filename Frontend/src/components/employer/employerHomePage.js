import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class employerHomePage extends Component{
handleupdateprofile=(e)=>{
    console.log("in update profile")
}
render(){
    return(
        <div>
        <h1> employer Home Page</h1>
        <Link to={{
            pathname: `/company/profile`
        }}>Update Profile</Link>
        </div>
    )
}
}

export default employerHomePage;