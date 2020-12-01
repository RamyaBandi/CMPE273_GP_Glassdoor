import React, { Component } from 'react';
import axios from 'axios'
import Reviewcard from './reviewCard'
import routeConstants from "../../../config/routeConstants";


class EmployerReview extends Component {
    state = { 
        reviews:[],
     }

    componentWillMount(){
        let company_id=localStorage.getItem('mongoId')
        console.log(company_id)
        axios.get(`${routeConstants.BACKEND_URL}${routeConstants.GET_COMPANY_REVIEWS}`,
        {
            params: {
                companyId: company_id
            }
        }).then((res) => {
            console.log(res)
            this.setState({reviews: res.data.reviews
                }, () => {
                    //console.log(res.data);
                });
                console.log(this.state);


            }).catch((err) => {
                console.log(err);
                window.alert("Failed to display reviews");
            })
    }
    render() { 
        console.log(this.state.reviews.length)
        let reviews=[];
        if(this.state.reviews.length>0){
            this.state.reviews.map((review)=>{
                reviews.push(<Reviewcard reviewitem={review}/>)
            })
        }
        console.log(reviews)

        return (  
            //console.log("employer reviews")
            // <h4>Reviews</h4>
            <div>
                <div>
                    {reviews}
                </div>
            </div>
        );
    }
}
 
export default EmployerReview;