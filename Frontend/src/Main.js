import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyNavBar from './components/companyNavBar';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/" component = {companyNavBar} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;