import axios from 'axios';
import AuthService from './auth';

const baseURL = 'http://localhost:3000/';

const fetcher = () => {
  const headers = {};

  if (AuthService.isAuthenticated()) {
    headers['Authorization'] = AuthService.getToken();
  }

  return axios.create({
    baseURL,
    headers,
  });
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

export default ApiService;
