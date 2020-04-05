import { h, Component } from 'preact';
import ApiService from '../../services/api';

export default class Confirm extends Component {
  _mounted = true;
  state = {
    confirmed: false,
    erroredOut: false,
  };

  componentDidMount() {
    this._mounted = true;
    this.confirmMagicRequest(this.props);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async confirmMagicRequest(queryParams) {
    try {
      if (!queryParams.email || !queryParams.token) {
        this.setState({ erroredOut: true });
      }

      const response = await ApiService.confirmMagicRequest(
        queryParams.email,
        queryParams.token
      );
      if (this._mounted) {
        this.setState({
          confirmed: response.data.data.verified,
        });
      }
    } catch (err) {
      this.setState({
        erroredOut: true,
      });
      console.log(err);
    }
  }

  render() {
    const { confirmed, erroredOut } = this.state;
    return (
      <>
        <div class="container text-center">
          {erroredOut ? (
            <>
              <h1>Oops! Something went wrong.</h1>
              <p>
                <small>Invalid Verification Token was passed...</small>
              </p>
            </>
          ) : (
            <>
              <h1>{!confirmed ? 'Confirming...' : 'Confirmed'}</h1>
              {confirmed ? (
                <p>
                  <small>
                    You can close this tab and go back to one you tried logging
                    in from.
                  </small>
                </p>
              ) : null}
            </>
          )}
        </div>
      </>
    );
  }
}
