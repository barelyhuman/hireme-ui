import { h, Component } from 'preact';
import { route } from 'preact-router';

import APIService from '../../services/api';
import toast from '../../services/toast';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
  };

  async register() {
    try {
      const { email, password } = this.state;
      const response = await APIService.register(email, password);
      toast.success(response.data.message);
      route('/login');
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
      throw err;
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1 class="text-center">Register</h1>
        <div class="text-center">
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
          <button onClick={() => this.register()}>Register</button>
        </div>
      </div>
    );
  }
}
