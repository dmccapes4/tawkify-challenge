import React, { Component } from 'react';

class ProgressTracker extends Component {
  render() {
    return (
      <div className="progress-tracker">
        <div className="progress-img"></div>
        <div className="progress-names">
          <div className="about">ABOUT YOURSELF</div>
          <div className="ideal">IDEAL PARTNER</div>
          <div className="add">ADD PHOTOS</div>
        </div>
      </div>
    )
  }
}

export default ProgressTracker;
