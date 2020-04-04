import { h, Component } from 'preact';
import AuthService from '../../services/auth';

export default class Login extends Component {
  async logout() {
    AuthService.logout();
  }

  render() {
    return (
      <div class="text-center container">
        <h1>Logout</h1>
        <div>
          <p>Are you sure you want to log out?</p>
          <button onClick={() => this.logout()}>Logout</button>
        </div>
      </div>
    );
  }
}
