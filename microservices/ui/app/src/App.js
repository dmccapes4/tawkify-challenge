import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Banner from './components/Banner.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import Form from './components/Form.jsx';

class App extends Component {
  render() {
    const clusterName = process.env.REACT_APP_CLUSTER_NAME || 'NoClusterName';
    return (
      <div className="App">
        <Navbar />
        <Banner />
        <ProgressTracker />
        <Form />
      </div>
    );
  }
}

export default App;
