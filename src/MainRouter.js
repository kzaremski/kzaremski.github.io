import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Home from './routes/home';

class NavbarLink extends React.Component {
  render() {
    return (
      <></>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <></>
    );
  }
}

export default class MainRouter extends React.Component {
          render() {
    return (
        <Router>
          <Route path='/' component={Home} />
        </Router>
    );
  }
}