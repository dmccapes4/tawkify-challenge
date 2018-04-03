import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main.jsx';
import Users from './components/Users.jsx';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/" component={Main} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
