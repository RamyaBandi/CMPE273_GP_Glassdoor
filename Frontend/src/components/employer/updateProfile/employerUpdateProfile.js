import React, { Component } from 'react';
import axios from "axios";
import routeConstants from "../../../config/routeConstants";
import '../updateProfile/updateProfile.styles.css'

class employerUpdateProfile extends Component {
    state = {
        companyId:"",
        companyName: "",
        website: "",
        companySize: 0,
        companyType: "",
        revenue: 0,
        headquarters: "",
        industry: "",
        mission: "",
        description: "",
        selectedFile: null,
        img: null,
        ceoName: "",
        imageUrl: "",
        MODIFIED: "",
        disabled: true,
        editstate: false,
        oldDetails: {},
    };

    handleChange = (e) => {
      
        const { value, name } = e.target;
        this.setState({ [name]: value });

    };

    componentWillMount() {

        //console.log(this.props)
        //console.log(localStorage.getItem('mongoId'))
        let company_id=localStorage.getItem('mongoId')
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        axios.get(`${routeConstants.BACKEND_URL}/company${routeConstants.GET_COMPANY_SIGNUP}`,
        {
            params: {
                companyId: company_id
            }
        }).then((res) => {

                console.log(res.data[0]);
                this.setState({ oldDetails: {...res.data[0]} , 
                ...res.data[0]
                }, () => {
                    //console.log(res.data);
                });
                console.log(this.state);


            })

        }

        handleEdit = (e) => {
            e.preventDefault();
    
            this.setState((prevstate) => ({
                editstate: !prevstate.editstate,
                disabled: !prevstate.disabled,
            }));
        };
        handleCancelEdit = (e) => {
            e.preventDefault();
            if (!this.state.editstate) {
                this.setState((prevstate) => ({
                
                    ...prevstate.oldData,
                }));
            }
        };
        handleSave = (e) => {
            e.preventDefault();
            const {
                disabled,
                editstate,
                oldDetails,
                ...userDetails
    
            } = this.state;
    
    
            const req = {
                ...userDetails,
                companyId: localStorage.getItem('mongoId')
            };
            console.log(req)
            axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
    
            axios
                .put(`${routeConstants.BACKEND_URL}/company${routeConstants.PUT_COMPANY_SIGNUP}`, req)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        window.alert("Changes Updated Successfully");
                    }
                }).catch((err) => {
                    window.alert("Unable to update changes");
                });
        };
    
    
    
        onFileUpload = e => {
  
            let formData = new FormData();
            console.log(this.state._id)
            console.log(this.state)
            console.log(this.state.selectedFile)
            formData.append('file', this.state.selectedFile);
            formData.append('companyId', this.state._id)
            console.log(formData)
            axios
                .post(
                    `${routeConstants.BACKEND_URL}/image${routeConstants.POST_IMAGE_USER_PROFILE}`,
                    formData
                )
                .then(response => {
                    window.location.reload(false)
                });
        };
    
    
        fileData = () => {
            if (this.state.selectedFile) {
                return (
                    <div>
    
                        <p>File Name: {this.state.selectedFile.name}</p>
    
                    </div>
                );
            }
        };
    
    
        onFileChange = event => {
            console.log(event)
            this.setState({ selectedFile: event.target.files[0] });
            if (this.state.selectedFile) {
                this.setState({ app: this.state.selectedFile.name });
            }
        }

    render() { 
       // console.log()
        //let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_path}`
        return (
            <div className="profile">

<div className="imageDiv">
                    <img src={this.state.imageUrl} width='250px' alt="profileImage   " height='250px' className="imageCont" />
                    <input type="file" onChange={this.onFileChange} id="fileinput" />
                    <button className="btn btn-danger" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
                    {this.fileData()}
                </div>
                <form className="userdetails" encType="multipart/form-data">
                    <h2>Edit Profile Details</h2>
                    <div className="option">
                    CompanyName:
                        <input
                            label={this.state.oldDetails.companyName}
                            disabled={this.state.disabled}
                            value={this.state.companyName}
                            onChange={this.handleChange}
                            name="companyName"
                        />
                    </div>
                    <div className="option">
                    Website:
                        <input
                            label={this.state.oldDetails.website}
                             disabled={this.state.disabled}
                            value={this.state.website}
                            onChange={this.handleChange}
                            name="website"
                            width="200px"
                        />
                    </div>
                    <div className="option">
                    CompanySize:
                        <input
                            label={this.state.oldDetails.companySize}
                            disabled={this.state.disabled}
                            value={this.state.companySize}
                            onChange={this.handleChange}
                            name="companySize"
                            id="companySize"
                        />
                    </div>

                    <div className="option">
                        CompanyType:
                        <input
                            label={this.state.oldDetails.companyType}
                            disabled={this.state.disabled}
                            value={this.state.companyType}
                            onChange={this.handleChange}
                            name="companyType"
                        />
                    </div>

                    <div className="option">
                        Revenue:
                        <input
                            label={this.state.oldDetails.revenue}
                           disabled={this.state.disabled}
                            value={this.state.revenue}
                            onChange={this.handleChange}
                            name="revenue"
                        />
                    </div>
                    <div className="option">
                        HeadQuarters:
                        <input
                            label={this.state.oldDetails.headquarters}
                            disabled={this.state.disabled}
                            value={this.state.headquarters}
                            onChange={this.handleChange}
                            name="headquarters"
                        />
                    </div>
                    <div className="option">
                        Industry:
                        <input
                            label={this.state.oldDetails.industry}
                            disabled={this.state.disabled}
                            value={this.state.industry}
                            onChange={this.handleChange}
                            name="industry"
                        />
                    </div>

                    <div className="option">
                        Mission:
                        <input
                            label={this.state.oldDetails.mission}
                            disabled={this.state.disabled}
                            value={this.state.mission}
                            onChange={this.handleChange}
                            name="mission"
                        />

                    </div>
                    <div className="option">
                        Description:
                        <input
                            label={this.state.oldDetails.description}
                            disabled={this.state.disabled}
                            value={this.state.description}
                            onChange={this.handleChange}
                            name="description"
                        />

                    </div>
                    <div className="option">
                        CEO Name:
                        <input
                            label={this.state.oldDetails.ceoName}
                            disabled={this.state.disabled}
                            value={this.state.ceoName}
                            onChange={this.handleChange}
                            name="ceoName"
                        />

                    </div>

                    {/* {addresschange} */}
                    <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
                        <button className="btn btn-success" type="submit" onClick={this.handleEdit}>
                            Toggle Edit
              
                        </button>
                        <button className="btn btn-success" type="submit" onClick={this.handleSave}>
                            Save Changes
                        </button>

                    </div>
                </form>
            </div >
          );
    }
}
 
export default employerUpdateProfile;