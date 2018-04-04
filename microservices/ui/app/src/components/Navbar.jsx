import React, { Component } from 'react';

// This component builds the Navbar, but is purely cosmetic
class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav-left">
          <div className="nav-title"></div>
          <div className="links">
            <p>How it works</p>
            <p>FAQ</p>
            <p>Stories</p>
            <p>Sign In</p>
          </div>
        </div>
        <div className="nav-right">
          <p>1 (888) 494-7280</p>
          <div className="call-now"></div>
        </div>
      </div>
    )
  }
}

export default Navbar;
