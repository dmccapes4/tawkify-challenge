import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Form from './Form.jsx';
import PhotoForm from './PhotoForm.jsx';

class Main extends Component {
  render() {
    const clusterName = process.env.REACT_APP_CLUSTER_NAME || 'NoClusterName';
    return (
      <HashRouter>
        <div className="App">
        <Navbar />
        <Banner />
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/addphotos" component={PhotoForm} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
