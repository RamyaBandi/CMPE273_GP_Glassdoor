import React, { Component } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL, JOB_ROUTE, GET_COMPANY_JOB_BY_JOBID, GET_COMPANY_DETAILS, APPLICATION_ROUTE, POST_APPLICATION } from '../../../../config/routeConstants';

export default class JobApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetails: [],
            jobDetails: [],
            redirect: null,
            resumeProgress: 0,
            coverLetterProgress: 0
        };
    }

    // state = {
    //     _id: "5fbdb4aea1bb420035a3ba62",
    //     companyId: "5fb4aefe6b61ea46245d5621",
    //     companyName: "Facebook",
    //     jobTitle: "Software Engineer II",
    //     postedDate: "2020-11-24T08:00:00.000Z",
    //     industry: "Software",
    //     responsibilities: "Should be able to work on Java",
    //     country: "US",
    //     remote: true,
    //     streetAddress: "190 Ryland Street",
    //     city: "Cupertino",
    //     state: "CA",
    //     zip: 98628,
    // }

    componentDidMount = async () => {
        console.log('In componentDidMount in application');
        const jobId = this.props.location.state;
        console.log(jobId);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        await axios.get(BACKEND_URL + JOB_ROUTE + GET_COMPANY_JOB_BY_JOBID + '?jobId=' + jobId)
            .then(response => {
                this.setState({ jobDetails: response.data.jobs[0] });
                console.log(this.state.jobDetails);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        const companyId = this.state.jobDetails.companyId;
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_COMPANY_DETAILS + '?companyId=' + companyId)
            .then(response => {
                this.setState({ companyDetails: response.data[0] });
                console.log("In componentDidMount");
                console.log(response.data[0]);
                console.log(this.state.companyDetails);
            })
            .catch((error) => {
                console.log(error);
            }
            )
    }

    hiddenResumeInput = React.createRef(null);

    handleClickResume = event => {
        this.setState({ resumeProgress: 0 }, () => {
            this.hiddenResumeInput.current.click();
        })

    };
    handleChangeResume = event => {
        this.increaseResumeProgressPercentage();
        const fileUploaded = event.target.files[0];
        this.setState({ uploadedResume: fileUploaded })
        event.target.value = null;
    };

    apply = (e) => {
        e.preventDefault();
        let data = {
            studentId: localStorage.getItem('mongoId'),
            jobId: this.state.jobDetails._id,
            resumeUploaded: false,
            coverLetterUploaded: false
        }

        const mediaForm = new FormData();
        if (this.state.uploadedResume) {

            mediaForm.append("resume", this.state.uploadedResume);
            data.resumeUploaded = true
        }

        if (this.state.uploadedCoverLetter) {

            mediaForm.append("Cover Letter", this.state.uploadedCoverLetter);
            data.coverLetterUploaded = true
        }

        //axios

        axios.post(`${BACKEND_URL}${APPLICATION_ROUTE}${POST_APPLICATION}?studentId=${data.studentId}&jobId=${data.jobId}&resumeUploaded=${data.resumeUploaded}&coverLetterUploaded=${data.coverLetterUploaded}`, mediaForm)
            .then(response => {
                //redirect
                window.alert('Applied successfully');
                this.props.history.push('/student/applications')
            })
            .catch((error) => {
                console.log(error.response.data);
                window.alert(error.response.data);
            }
            )


    }
    increaseResumeProgressPercentage = async () => {
        for (let i = 1; i <= 100; i++) {
            await new Promise((resolve) => setTimeout(resolve, 25));
            this.setState({ resumeProgress: i })
        }
    }

    hiddenCoverLetterInput = React.createRef(null);

    handleClickCoverLetter = event => {
        this.setState({ coverLetterProgress: 0 }, () => {
            this.hiddenCoverLetterInput.current.click();
        })
    };
    handleChangeCoverLetter = event => {
        this.increaseCoverLetterProgressPercentage();
        // const fileUploaded = event.target.files[0];
        this.setState({ uploadedCoverLetter: event.target.files[0] })
        event.target.value = null;
    };

    increaseCoverLetterProgressPercentage = async () => {
        for (let i = 1; i <= 100; i++) {
            await new Promise((resolve) => setTimeout(resolve, 25));
            this.setState({ coverLetterProgress: i })
        }
    }


    render = () => {
        console.log('In render');
        return (
            <div style={{ backgroundColor: "#eaeaea", minHeight: "100vh", overflow: "hidden" }}>
                {this.state.redirect}
                <Container style={{ width: "80%", backgroundColor: "#fff", marginTop: "20px", padding: "20px" }}>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="12">
                                    {this.state.companyDetails.companyName}
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <h4>{this.state.jobDetails.jobTitle}</h4>
                                </Col>
                            </Row>
                            <div style={{ color: "#858c94", fontSize: 12 }}>
                                <Row>
                                    <Col md="12">
                                        <p>
                                            {this.state.jobDetails.city}, {this.state.jobDetails.state}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md="6" >
                            <Row style={{ float: "right" }}>
                                <Col md="auto">
                                    <Button style={{ backgroundColor: "#1861bf" }} onClick={this.apply}>
                                        Apply Now
                                    </Button>
                                </Col>
                                <Col md="auto">
                                    <Row>
                                        <Col md="12">

                                            <>
                                                <Button onClick={this.handleClickResume} variant="success">
                                                    Upload Resume
                                        </Button>
                                                <input type="file"
                                                    ref={this.hiddenResumeInput}
                                                    onChange={this.handleChangeResume}
                                                    style={{ display: 'none' }}
                                                />
                                            </>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <div style={{ marginTop: "10px", textAlign: "center" }}>
                                                {this.state.resumeProgress === 0 ? <b style={{ color: "red" }}>
                                                    No Resume!</b> :
                                                    this.state.resumeProgress === 100 ? <b style={{ color: "green" }}>
                                                        Success!
                                                </b> : <ProgressBar striped now={this.state.resumeProgress} label={`${this.state.resumeProgress}%`} variant="warning" />}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="auto">
                                    <Row>
                                        <Col md="12">
                                            <>
                                                <Button onClick={this.handleClickCoverLetter} variant="success">
                                                    Upload Cover Letter
                                        </Button>
                                                <input type="file"
                                                    ref={this.hiddenCoverLetterInput}
                                                    onChange={this.handleChangeCoverLetter}
                                                    style={{ display: 'none' }}
                                                />
                                            </>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <div style={{ marginTop: "10px", textAlign: "center" }}>
                                                {this.state.coverLetterProgress === 0 ? <b style={{ color: "red" }}>
                                                    No Cover Letter!</b> :
                                                    this.state.coverLetterProgress === 100 ? <b style={{ color: "green" }}>
                                                        Success!
                                                </b> : <ProgressBar striped now={this.state.coverLetterProgress} label={`${this.state.coverLetterProgress}%`} variant="warning" />}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Row>
                                <Col md="auto"><b> Posting Date :</b> </Col><Col md="auto"><p>{this.state.jobDetails.postedDate}</p></Col>
                            </Row>
                        </Col>
                        <Col md="12">
                            <Row>
                                <Col md="auto"> <b>Work Location :</b></Col>
                                <Col md="auto"> {this.state.jobDetails.remote ? <p>Remote</p> : <p>On Site at the Office Address.</p>}</Col>
                            </Row>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Col md="auto"> <b>Office Location : </b></Col>
                                <Col md="auto">
                                    <Row style={{ height: "15px" }}><Col>{this.state.jobDetails.streetAddress}</Col></Row>
                                    <Row><Col>{this.state.jobDetails.city}, {this.state.jobDetails.state}</Col></Row>
                                    <Row><Col>{this.state.jobDetails.country}, {this.state.jobDetails.zip}.</Col></Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" style={{ marginTop: "10px" }}>
                            <Row>
                                <Col md="auto"> <b>Responsibilities :</b></Col>
                                <Col md="auto"> <p>{this.state.jobDetails.responsibilities}</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}