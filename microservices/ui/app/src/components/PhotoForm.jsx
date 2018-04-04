import React, { Component } from 'react';
import axios from 'axios';

// URL for database calls
var url = "https://data.gibber74.hasura-app.io/v1/query";

// This component allows the user to upload images
class PhotoForm extends Component {
  // Define the state with users and user info that contains image files
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

  // Database call to get users
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

  // Function to process image upload
  addPhoto() {
    // Convert image blobs to a long string with blobs separated by a '$'
    let photoArray = "";
    let images = this.state.userInfo.imageFiles;
    for (let i = 0; i < images.length; i++) {
      photoArray += `${images[i]}`
      if (i < photoArray.length - 1) photoArray += "$";
    }
    // Database call to upload images
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
    // Upload image from the 'CHOOSE FILE' button
    const fileInput = document.getElementById('choose-file-btn');
    fileInput.addEventListener('change', () => {
      // Get giles from element
      let files = fileInput.files;
      // Cycle through multiple files
      for (let i = 0, file; file = files[i]; i++) {
        let reader = new FileReader();
        // Onload function updates state and adds image to dropzone
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

    // Upload image from the drop zone
    const photoDropZone = document.getElementById('photo-drop-zone');
    // Dragover function adds copy drop effect
    photoDropZone.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    // Drop function process image upload
    photoDropZone.addEventListener('drop', e => {
      e.stopPropagation();
      e.preventDefault();
      // Get files from event
      let files = e.dataTransfer.files;
      // Cycle through multiple files
      for (let i = 0, file; file = files[i]; i++) {
          if (file.type.match(/image.*/)) {
              let reader = new FileReader();
              // Onload function updates state and adds image to dropzone
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

    // Submit calls addPhoto unless there are less than 2 photos
    const submit = document.getElementById('photo-submit');
    submit.addEventListener('click', () => {
      if (this.state.userInfo.imageFiles.length > 1) {
        console.log(this.state.userInfo.imageFiles.length);
        this.addPhoto();
      } else {
        // Notify user of error
        const photoErrors = document.getElementById("photo-errors");
        // Remove old error if any
        while (photoErrors.firstChild) {
          photoErrors.removeChild(photoErrors.firstChild);
        }
        // Add new error
        const error = document.createElement("div");
        error.innerHTML = "Must select at least two photos.";
        photoErrors.appendChild(error);
      }
    });
  }

  render() {
    // Render progress tracker then photo form
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
          <div id="photo-errors" className="errors"></div>
        </div>
      </div>
    )
  }
}

export default PhotoForm;
