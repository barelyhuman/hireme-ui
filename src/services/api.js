import axios from 'axios';
import AuthService from './auth';
import { detect } from 'detect-browser';

const baseURL = 'https://aliezsidhireme.herokuapp.com';

const unauthHandler = (err) => {
  if (err && err.response && err.response.status === 401) {
    AuthService.logout();
  }
};

const fetcher = () => {
  const headers = {};

  if (AuthService.isAuthenticated()) {
    headers['Authorization'] = AuthService.getToken();
  }

  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      unauthHandler(err);
      return Promise.reject(err);
    }
  );

  return instance;
};

const ApiService = {};

ApiService.register = (email, password) => {
  return fetcher().post('/register', { email, password });
};

ApiService.login = (email, password) => {
  return fetcher().post('/login', { email, password });
};

ApiService.fetchAllListings = () => {
  return fetcher().get('/listings');
};

ApiService.fetchMyListings = () => {
  return fetcher().get('/user/listings');
};

ApiService.fetchAppliedListings = () => {
  return fetcher().get('/user/applications');
};

ApiService.applyToListing = (listingId) => {
  return fetcher().post('/applications', { listing_id: listingId });
};

ApiService.createListing = (listingDetails) => {
  return fetcher().post('/listings', listingDetails);
};

ApiService.deleteListing = (listingId) => {
  return fetcher().delete(`/listings/${listingId}`);
};

ApiService.fetchListingApplicants = (listingId) => {
  return fetcher().get(`/user/listing/${listingId}/applicants`);
};

ApiService.toggleShortlistStatus = (listingId, applicantId) => {
  return fetcher().post(`/user/listing/${listingId}/applicants/${applicantId}`);
};

ApiService.createMagicRequest = (email) => {
  const browser = detect();
  const tokenName = `${browser.name} - ${browser.version} | ${browser.os}`;
  return fetcher().post(`/register/magic`, {
    email,
    tokenName,
  });
};

ApiService.verifyMagicRequest = (email, token) => {
  return fetcher().post(`/verify/magic`, {
    email,
    token,
  });
};

ApiService.confirmMagicRequest = (email, token) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('email', email);
  urlSearchParams.append('token', token);
  return fetcher().get(`/confirm/magic?${urlSearchParams.toString()}`, {
    email,
    token,
  });
};

export default ApiService;
