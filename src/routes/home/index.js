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
          listings: response.data.data.length
            ? response.data.data
            : [this.getEmptyListing()],
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

  getEmptyListing() {
    return {
      name: 'Dummy Listing',
      company_name: 'BarelyHuman',
      description:
        'This is placeholder listing since there are no listings available as of now',
      location: 'Someplace/Somewhere',
      applied: true,
    };
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
            {listings.map((item) => (
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
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
