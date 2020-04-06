import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'notyf/notyf.min.css';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';

import Login from '../routes/login';
import Logout from '../routes/logout';
import Register from '../routes/register';
import Listings from '../routes/listings';
import Applications from '../routes/applications';
import CreateListing from '../routes/create-listing';
import ViewApplicants from '../routes/view-applicants';
import Confirm from '../routes/confirm';

import AuthService from '../services/auth';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    const privatePaths = ['/logout', '/listings', '/applications', '/new', '/'];
    if (privatePaths.indexOf(e.url) > -1 && !AuthService.isAuthenticated()) {
      return route('/login');
    }
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <div class="mt-lg">
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Login path="/login" />
            <Logout path="/logout" />
            <Register path="/register" />
            <Listings path="/listings" />
            <Applications path="/applications" />
            <ViewApplicants path="/view/:id" />
            <CreateListing path="/new" />
            <Confirm path="/confirm" />
          </Router>
        </div>
      </div>
    );
  }
}
