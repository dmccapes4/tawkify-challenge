import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Form from './Form.jsx';
import PartnerForm from './PartnerForm.jsx';
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
          // Route to partner form
          <Route path="/idealpartner" component={PartnerForm} />
          // Route to photo form
          <Route path="/addphotos" component={PhotoForm} />
          // Default to first form
          <Route path="/" component={Form} />
        </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
