import { route } from 'preact-router';

const AuthService = {};

AuthService.isAuthenticated = () => {
  if (window.localStorage.getItem('auth')) {
    return true;
  }
  return false;
};

AuthService.logout = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('auth');
    route('/login');
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }
};

AuthService.setToken = (token) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('auth', token);
  }
};

AuthService.getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('auth');
  }
};

export default AuthService;
