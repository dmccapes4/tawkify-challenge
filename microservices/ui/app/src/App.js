import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    const clusterName = process.env.REACT_APP_CLUSTER_NAME || 'NoClusterName';
    return (
      <div className="App">
      <Navbar />
      </div>
    );
  }
}

export default App;
