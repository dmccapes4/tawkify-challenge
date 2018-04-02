import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Banner from './components/Banner.jsx';
import Form from './components/Form.jsx';
import PhotoForm from './components/PhotoForm.jsx';

class App extends Component {
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

export default App;
