import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Form from './Form.jsx';
import PhotoForm from './PhotoForm.jsx';

// This component contains the navbar, banner, progress tracker and forms
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
        <Navbar />
        <Banner />
          <Switch>
            // Default to first form
            <Route exact path="/" component={Form} />
            // Route to photo form
            <Route path="/addphotos" component={PhotoForm} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
