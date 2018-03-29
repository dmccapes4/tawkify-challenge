import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav-left">
          <p className="nav-title">tawkify</p>
          <div className="links">
            <p>How it works</p>
            <p>FAQ</p>
            <p>Stories</p>
            <p>Sign In</p>
          </div>
        </div>
        <div className="nav-right">
          <p>1(888)494-7280</p>
          <div className="call-now">FREE SCREENING</div>
        </div>
      </div>
    )
  }
}

export default Navbar;
