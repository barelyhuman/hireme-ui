import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';

import Login from '../routes/login';
import Logout from '../routes/logout';
import Register from '../routes/register';
import Listings from '../routes/Listings';
import Applications from '../routes/Applications';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Login path="/login" />
          <Logout path="/logout" />
          <Register path="/register" />
          <Listings path="/listings" />
          <Applications path="/applications" />
        </Router>
      </div>
    );
  }
}
