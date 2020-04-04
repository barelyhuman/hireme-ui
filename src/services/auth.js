import { route } from 'preact-router';

const AuthService = {};

AuthService.isAuthenticated = () => {
  if (window.localStorage.getItem('auth')) {
    return true;
  }
  return false;
};

AuthService.logout = () => {
  window.localStorage.removeItem('auth');
  route('/login');
  setTimeout(() => {
    window.location.reload();
  }, 0);
};

AuthService.setToken = (token) => {
  window.localStorage.setItem('auth', token);
};

AuthService.getToken = () => {
  return window.localStorage.getItem('auth');
};

export default AuthService;
