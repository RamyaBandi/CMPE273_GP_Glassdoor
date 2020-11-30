import React, { Component } from 'react';
import axios from 'axios'

import routeConstants from "../../../config/routeConstants";


class EmployerReview extends Component {
    state = { 
        reviews:[],
     }

    componentWillMount(){
        let company_id=localStorage.getItem('mongoId')
        axios.get(`${routeConstants.BACKEND_URL}/review${routeConstants.GET_COMPANY_REVIEWS}`,
        {
            params: {
                companyId: '5fb4884acf339e3da0d5c31e'
            }
        }).then((res) => {
            console.log(res)
            this.setState({reviews: res.data[0]
                }, () => {
                    //console.log(res.data);
                });
                console.log(this.state);


            })
    }
    render() { 

        return (  
            //console.log("employer reviews")
            <h4>Reviews</h4>
        );
    }
}
 
export default EmployerReview;