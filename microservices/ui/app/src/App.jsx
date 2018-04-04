import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './style/Nav.css';
import './style/Banner.css';
import './style/Form.css';
import './style/PhotoForm.css';
import './style/Users.css';
import Main from './components/Main.jsx';
import Users from './components/Users.jsx';

// Entry component that defaults to the Main Component
class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          // Sends to a list of users and their info
          <Route path="/users" component={Users} />
          // Contains the components that make up the forms
          <Route path="/" component={Main} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
