import React, { Component } from 'react';
class PhotoGrid extends Component {
    state = {  }
    render() { 
        //console.log(this.props.photoitem)
        var photourl=""
        if(this.props.photoitem.photoURL){
        
          var photourl=this.props.photoitem.photoURL.split('?')[0]
         
        }
        //console.log(photourl)
        return (
           <div className="view overlay zoom">
            <figure class="col-md-18">
        <a data-size="1600x1067">
          <img alt="image" src={photourl}
            class="img-fluid" />
        </a>
      </figure>
       </div>
          );
    }
}
 
export default PhotoGrid;