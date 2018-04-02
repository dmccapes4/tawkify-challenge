import React, { Component } from 'react';

class PhotoForm extends Component {
  constructor() {
    super();

  }

  componentDidMount() {

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
          <div className="form-photo-img"></div>
          <input type="file" className="choose-file-btn" />
          <div className="form-photo-desc">
            Your pictures must be 4 megabytes or smaller. If you have problems, please contact us1l 1 (646) 791-3283
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
