import { h, Component } from 'preact';

import ApiService from '../../services/api';
import toast from '../../services/toast';

export default class Home extends Component {
  _mounted = false;
  state = {
    listings: [],
  };

  componentDidMount() {
    this._mounted = true;
    this.fetchAllListings();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async fetchAllListings() {
    try {
      const response = await ApiService.fetchAllListings();
      if (this._mounted) {
        this.setState({
          listings: response.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async applyToListing(listing) {
    try {
      const response = await ApiService.applyToListing(listing.id);
      toast.success(response.data.message);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      }
      console.log(err);
    }
    this.fetchAllListings();
  }

  render() {
    const { listings } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.length ? (
              listings.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.company_name}</td>
                  <td>{item.description}</td>
                  <td>{item.location || 'Not Listed'}</td>
                  <td>
                    {item.applied ? (
                      <span class="success-text">
                        <strong>Applied</strong>
                      </span>
                    ) : (
                      <button onClick={() => this.applyToListing(item)}>
                        Apply
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No listings to show.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
