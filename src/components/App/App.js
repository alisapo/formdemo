import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import LogIn from '../LogIn/LogIn.js';
import Users from '../Users/Users.js';
import Home from '../Home/Home.js';

import '../../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ''
    }
  };

  setAuth = (elem) => {
    this.setState({
      auth: elem
    });
  };

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path='/' exact component={Home} />
        <Switch>
          <Route path="/login" type="guest" render={(props) => (
            <LogIn setAuth={this.setAuth} {...props} {...this.props} {...this.state} />
          )} />
          <Route path="/users" type="private" render={(props) => (
            <Users setAuth={this.setAuth} {...props} {...this.props} {...this.state} />
          )} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
