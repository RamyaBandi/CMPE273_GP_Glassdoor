import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyOverview from './components/companyOverview';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/overview" component = {companyOverview} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;