import React from 'react';
import ImageGallery from './ImageGallery';
import { BACKEND_URL, POST_COMPANY_PHOTOS, GET_COMPANY_PHOTOS, GET_COMPANY_DETAILS } from './../../../../config/routeConstants';
import axios from 'axios';

class Parent extends React.Component {

  state = {
    companyDetails: [],
    images: [],
    newImages: {},
    redirect: null,
    files: {

    }
  }

  // state = {
  //   companyName: "Facebook",
  //   images: [{
  //     id: 1,
  //     name: "Island",
  //     image: "https://images.unsplash.com/photo-1442530792250-81629236fe54?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9631adb2d2f752e3a0734f393fef634b"
  //   }, {
  //     id: 2,
  //     name: "Forest",
  //     image: "https://images.unsplash.com/photo-1468851508491-4f854ec88aa0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=b1222b6a1d3694cac76d2a23c3a02254"
  //   }, {
  //     id: 3,
  //     name: "Whale",
  //     image: "https://images.unsplash.com/photo-1454991727061-be514eae86f7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=3c55430f01fe9ac9a9ccb3383d1416ff"
  //   }, {
  //     id: 4,
  //     name: "Mountain",
  //     image: "https://images.unsplash.com/photo-1467890947394-8171244e5410?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9396f0adf263b51b44626228225684d0"
  //   }, {
  //     id: 5,
  //     name: "Boat",
  //     image: "https://images.unsplash.com/photo-1443302382600-0bfacc473376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=0c0f26518c1001f67b6c2e4480a8d3e0"
  //   }, {
  //     id: 6,
  //     name: "Flowers",
  //     image: "https://images.unsplash.com/photo-1429091443922-e7d9ae79a837?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=e81cb6a60c53788559edb9bec21b80fc"
  //   }, {
  //     id: 7,
  //     name: "Fire",
  //     image: "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=1f57cc13084e32839627453821a43abf"
  //   }, {
  //     id: 8,
  //     name: "Garden",
  //     image: "https://images.unsplash.com/photo-1427392797425-39090deb14ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=8bfe49466d0da200e61128a8ab0e8fbe"
  //   }, {
  //     id: 9,
  //     name: "Bridge",
  //     image: "https://images.unsplash.com/photo-1445723356089-6dbb51d9c4f8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=6e476c6e7ce1adac161295616d1bec05"
  //   }],
  //   newImages: {}
  // }


  componentDidMount = () => {
    const studentId = '5fb48df63d242fa0842343f3';
    const companyId = '5fb4aefe6b61ea46245d5621';
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.get(BACKEND_URL + GET_COMPANY_PHOTOS + '?companyId=' + companyId + '&studentId=' + studentId)
      .then(response => {
        console.log(response);
        this.setState({ images: response.data.formattedPhotos });
      })
      .catch((error) => {
        console.log(error);
      }
    )
    axios.get(BACKEND_URL + GET_COMPANY_DETAILS + '?companyId=' + companyId)
            .then(response => {
                this.setState({ companyDetails: response.data[0] });
                console.log("In componentDidMount");
                console.log("Company details", response.data[0]);
                console.log(this.state.companyDetails);
            })
            .catch((error) => {
                console.log(error);
            }
            )
  }

  setnewImages = (images) => {
    this.setState({ newImages: images })
  }

  saveImages = async () => {
    let files = []

    for (let i in this.state.newImages) {
      const res = await fetch(this.state.newImages[i]);
      const blob = await res.blob();
      let newFile = new File([blob], "file" + toString(i), { type: 'image/png' });
      files.push(newFile);

    }

    var fileArray = files;
    const formData = new FormData();
    for (var i = 0; i < fileArray.length; i++) {
      formData.append(i + 1, fileArray[i]);
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.post(BACKEND_URL + POST_COMPANY_PHOTOS + '?id=5fb4aefe6b61ea46245d5621',formData)
      .then(response => {
        const studentId = '5fb48df63d242fa0842343f3';
        const companyId = '5fb4aefe6b61ea46245d5621';
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_COMPANY_PHOTOS + '?companyId=' + companyId + '&studentId=' + studentId)
          .then(response => {
            this.setState({ images: response.data.formattedPhotos });
          })
          .catch((error) => {
            console.log(error);
          }
          )
      })
      .catch((error) => {
        console.log(error);
      }
      )



    let allImages = [...this.state.images]

    for (let i of files) {
      allImages.push({
        id: allImages.length + 1,
        name: "new File",
        image: URL.createObjectURL(i)
      });
    }
    console.log(allImages)
    this.setState({ images: allImages, newImages: {} })
  }

  render = () => {

    return (
      <div>
        <ImageGallery companyName={this.state.companyDetails.companyName} data={this.state.images} setnewImages={this.setnewImages} newImages={this.state.newImages} saveImages={this.saveImages} />
      </div>
    )
  }
}

export default Parent;