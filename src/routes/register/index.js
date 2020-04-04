import { h, Component } from 'preact';
import APIService from '../../services/api';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
  };

  register() {
    const { email, password } = this.state;
    APIService.register(email, password);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div class="container">
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
          <button onClick={() => this.register()}>Login</button>
        </div>
      </div>
    );
  }
}
