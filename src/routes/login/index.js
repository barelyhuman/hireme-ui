import { h, Component } from 'preact';
import APIService from '../../services/api';
import AuthService from '../../services/auth';
import { route } from 'preact-router';
import toast from '../../services/toast';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    if (AuthService.isAuthenticated()) {
      route('/');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  async login() {
    try {
      const { email, password } = this.state;
      const response = await APIService.login(email, password);
      AuthService.setToken(response.data.data.token);
      route('/');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div class="container text-center">
        <h1>Login</h1>
        <div>
          <input
            type="text"
            class="ml-auto mr-auto"
            placeholder="email"
            onChange={(e) => this.setState({ email: e.target.value })}
            value={email}
          />
          <input
            type="password"
            class="ml-auto mr-auto"
            placeholder="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            value={password}
          />
          <button onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}
