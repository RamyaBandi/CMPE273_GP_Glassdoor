import React, { Component } from 'react';
import Axios from 'axios'
import { BACKEND_URL, JOB_ROUTE, GET_COMPANY_JOB } from '../../../../config/routeConstants'

class ListCompanyJobs extends Component {
    state = {}
    componentDidMount = () => {
        console.log(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOB}`)
        Axios.get(`${BACKEND_URL}${JOB_ROUTE}${GET_COMPANY_JOB}`, {
            companyId: localStorage.getItem('mongoId')
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ListCompanyJobs;