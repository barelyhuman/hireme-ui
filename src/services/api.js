import axios from 'axios';
import AuthService from './auth';

// const baseURL = 'http://localhost:3000/';
const baseURL = 'https://aliezsidhireme.herokuapp.com/';

const unauthHandler = (err) => {
  if (err && err.response && err.response.status === 401) {
    AuthService.logout();
  }
};

const Fetcher = () => {
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

const fetcher = Fetcher();

fetcher.interceptors.response.use(
  (res) => res,
  (err) => {
    unauthHandler(err);
    return Promise.reject(err);
  }
);

ApiService.register = (email, password) => {
  return fetcher.post('/register', { email, password });
};

ApiService.login = (email, password) => {
  return fetcher.post('/login', { email, password });
};

ApiService.fetchAllListings = () => {
  return fetcher.get('/listings');
};

ApiService.fetchMyListings = () => {
  return fetcher.get('/user/listings');
};

ApiService.fetchAppliedListings = () => {
  return fetcher.get('/user/applications');
};

ApiService.applyToListing = (listingId) => {
  return fetcher.post('/applications', { listing_id: listingId });
};

ApiService.createListing = (listingDetails) => {
  return fetcher.post('/listings', listingDetails);
};

ApiService.deleteListing = (listingId) => {
  return fetcher.delete(`/listings/${listingId}`);
};

ApiService.fetchListingApplicants = (listingId) => {
  return fetcher.get(`/user/listing/${listingId}/applicants`);
};

ApiService.toggleShortlistStatus = (listingId, applicantId) => {
  return fetcher.post(`/user/listing/${listingId}/applicants/${applicantId}`);
};

export default ApiService;
