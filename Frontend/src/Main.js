import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import companyNavBar from './components/companyNavBar';
import reviews from './components/reviews/reviews';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path = "/" component = {companyNavBar} />
                <Route path = "/reviews" component = {reviews} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;