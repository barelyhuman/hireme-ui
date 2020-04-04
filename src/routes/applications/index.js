import { h, Component } from 'preact';

import ApiService from '../../services/api';
import toast from '../../services/toast';

export default class Applications extends Component {
  _mounted = false;
  state = {
    listings: [],
  };

  componentDidMount() {
    this._mounted = true;
    this.fetchListings();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async fetchListings() {
    try {
      const response = await ApiService.fetchAppliedListings();
      if (this._mounted) {
        this.setState({
          listings: response.data.data,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  }

  render() {
    const { listings } = this.state;
    return (
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Description</th>
              <th>Location</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.company_name}</td>
                <td>{item.description}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
