import React from 'react';
import ImageGallery from './ImageGallery';
import { BACKEND_URL, POST_COMPANY_PHOTOS, GET_COMPANY_PHOTOS, GET_COMPANY_DETAILS } from './../../../../config/routeConstants';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Parent extends React.Component {

  state = {
    companyDetails: [],
    images: [],
    newImages: {},
    limit: 10,
    page: 1,
    totalPages: 0,
    redirect: null,
    files: {

    }
  }

  componentDidMount = () => {
    // const studentId = '5fb48df63d242fa0842343f3';
    // const companyId = '5fb4aefe6b61ea46245d5621';
    const studentId = localStorage.getItem('mongoId');
    const companyId = localStorage.getItem('companyId');
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // axios.get(BACKEND_URL + GET_COMPANY_PHOTOS + '?companyId=' + companyId + '&studentId=' + studentId)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ images: response.data.formattedPhotos });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   }
    //  )
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
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
    this.getResults()
  }

  handlePageClick = (e) => {
    this.setState({
      page: e.selected + 1,
    }, () => {
      this.getResults()
    });
    console.log("Page number", e.selected)
  }

  async getResults() {
    const studentId = localStorage.getItem('mongoId');
    const companyId = localStorage.getItem('companyId');
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    axios.get(BACKEND_URL + GET_COMPANY_PHOTOS, {
      params: {
        companyId: companyId,
        studentId: studentId,
        page: this.state.page,
        limit: this.state.limit
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ images: response.data.formattedPhotos, totalPages: response.data.totalPages });
      })
      .catch((error) => {
        console.log(error);
      }
      )
  }

  handleChange = (e) => {
    let { value, id } = e.target;
    this.setState({ [id]: value }, () => this.getResults());
  };

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
    axios.post(BACKEND_URL + POST_COMPANY_PHOTOS + '?id=' + this.props.location.state + '&studentId=' + localStorage.getItem('mongoId'), formData)
      .then(response => {
        const studentId = localStorage.getItem('mongoId');
        const companyId = this.props.location.state;
        console.log()
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
        axios.get(BACKEND_URL + GET_COMPANY_PHOTOS + '?companyId=' + companyId + '&studentId=' + studentId)
          .then(response => {
            console.log(response)
            this.setState({ images: response.data.formattedPhotos });
            window.location.reload();
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
    this.setState({ newImages: {} })
  }

  render = () => {

    return (
      <div>
        <ImageGallery companyName={this.state.companyDetails.companyName} data={this.state.images} setnewImages={this.setnewImages} newImages={this.state.newImages} saveImages={this.saveImages} />
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    )
  }
}

export default Parent;