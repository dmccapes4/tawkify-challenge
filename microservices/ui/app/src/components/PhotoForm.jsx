import React, { Component } from 'react';
import axios from 'axios';

var url = "https://data.gibber74.hasura-app.io/v1/query";

class PhotoForm extends Component {
  constructor() {
    super();
    this.getUsers();
    this.state = {
      userInfo: {
        imageFiles: []
      },
      users: []
    }
  }

  getUsers() {
    axios.post(url,
      {
        "type": "select",
        "args": {
          "table": "user",
          "columns": [
              "id"
          ]
        }
      }).then(res => {
        this.setState({
          users: res.data
        });
      });
  }

  addPhoto() {
    let photoArray = "";
    let images = this.state.userInfo.imageFiles;
    for (let i = 0; i < images.length; i++) {
      photoArray += `${images[i]}`
      if (i < photoArray.length - 1) photoArray += "$";
    }

    console.log(this.state.users.length);

    axios.post(url,
      {
        "type": "update",
        "args": {
          "table": "user",
          "where": {
            "id": {
              "$eq": `${this.state.users.length + 1}`
            }
          },
          "$set": {
            "images": `${photoArray}`
          }
        }
      }).then(res => {
        this.props.history.push("/users");
      }
    )
  }

  componentDidMount() {

    const fileInput = document.getElementById('choose-file-btn');
    fileInput.addEventListener('change', () => {
      for (let i = 0; i < fileInput.files.length; i++) {
        let file = fileInput.files[i];

        let reader = new FileReader();

        reader.onload = e => {
          let img = document.createElement("img");
          img.src = e.target.result;
          img.style.height = "100px";
          photoDropZone.appendChild(img);
          this.state.userInfo.imageFiles.push(e.target.result);
        }

        reader.readAsDataURL(file);
      }

    });

    const photoDropZone = document.getElementById('photo-drop-zone');
    photoDropZone.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    photoDropZone.addEventListener('drop', e => {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;

      for (let i = 0, file; file = files[i]; i++) {
          if (file.type.match(/image.*/)) {
              let reader = new FileReader();
              reader.onload = e2 => {
                let img = document.createElement("img");
                img.src = e2.target.result;
                img.style.height = "100px";
                photoDropZone.appendChild(img);
                this.state.userInfo.imageFiles.push(e2.target.result);
              }
              reader.readAsDataURL(file);
          }
      }
    });

    const submit = document.getElementById('photo-submit');
    submit.addEventListener('click', () => {
      this.addPhoto();
    });
  }

  render() {
    return(
      <div>
        <div className="progress-tracker">
          <div className="progress-img-2"></div>
          <div className="progress-names">
            <div className="about-2">ABOUT YOURSELF</div>
            <div className="ideal-2">IDEAL PARTNER</div>
            <div className="add-2">ADD PHOTOS</div>
          </div>
        </div>
        <div className="form">
          <div className="form-prompt">
            Upload recent photos of yourself
          </div>
          <div className="form-prompt-info">
            We ask that you upload at least 2 pictures of yourself; but upload as many as you'd like. We encourage you to review your pictures periodically to make sure they are up to date. Snapshots and Selfies just fine here. Remember this image is for our internal use and will not be shared with potential matches – you will also be able to swap it out later if you wish.
          </div>
          <div id="photo-drop-zone" className="form-photo-img"></div>
          <input type="file" id="choose-file-btn" className="choose-file-btn" />
          <div className="form-photo-desc">
            Your pictures must be 4 megabytes or smaller. If you have problems, please contact us 1 (646) 791-3283
          </div>
          <div id="photo-submit" className="submit">
            SAVE AND CONTINUE
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoForm;
