import React, { Component } from 'react';

// This component displays the banner photo and blurb
class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="blurb-background">
          <div className="blurb">
            We'd like to get to know you better. Tell us about yourself and someone you'd
            like to meet. Don't worry, no one will see this besides the matchmakers at Tawkify.
          </div>
        </div>
      </div>
    )
  }
}

export default Banner;
