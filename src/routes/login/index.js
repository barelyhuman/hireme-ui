import { h, Component } from 'preact';
import APIService from '../../services/api';
import AuthService from '../../services/auth';
import { route } from 'preact-router';
import toast from '../../services/toast';

export default class Login extends Component {
  confirmationLoader = {
    start: 0,
    handler: null,
  };
  state = {
    email: '',
    emailTakingTime: false,
  };

  componentDidMount() {
    if (AuthService.isAuthenticated()) {
      route('/');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  componentWillUnmount() {
    if (this.confirmationLoader.handler) {
      clearInterval(this.confirmationLoader.handler);
    }
  }

  async login() {
    try {
      const { email, password } = this.state;
      const response = await APIService.login(email, password);
      AuthService.setToken(response.data.data.token);
      setTimeout(() => {
        window.location.reload();
        route('/');
      }, 500);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
    }
  }

  async createMagicRequest() {
    try {
      const { email } = this.state;
      const response = await APIService.createMagicRequest(email);
      this.setState({
        token: response.data.data.token,
      });
      this.confirmationLoader.start = Date.now();
      this.confirmationLoader.handler = setInterval(() => {
        this.verifyMagicRequest();
        if (Date.now() - this.confirmationLoader.start > 60000) {
          this.setState({
            emailTakingTime: true,
          });
        }

        if (Date.now() - this.confirmationLoader.start > 300000) {
          clearInterval(this.confirmationLoader.handler);
        }
      }, 5000);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
    }
  }

  async verifyMagicRequest() {
    try {
      const { email, token } = this.state;
      const response = await APIService.verifyMagicRequest(email, token);
      if (response.data && response.data.data && response.data.data.verified) {
        AuthService.setToken(response.data.data.token);
        route('/');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
    }
  }

  render() {
    const { email, token, emailTakingTime } = this.state;
    return (
      <div class="container text-center">
        <h1>Enter your email</h1>
        {!token ? (
          <div>
            <input
              type="text"
              class="ml-auto mr-auto"
              placeholder="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={email}
            />
            <button onClick={() => this.createMagicRequest()}>Continue</button>
          </div>
        ) : null}
        {token ? (
          <div>
            A Email has been sent to {email} has been sent.
            <p>Click the button in the email to confirm this login request.</p>
          </div>
        ) : null}
        {emailTakingTime ? (
          <div class="danger-text">
            Still haven't received the email? We'd like you to request that you
            check your spam folder as well.
            <p>
              If you still don't see it , We'd like to apologize as the mail
              queue might be full and might take longer. We request you to try
              again later.
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
