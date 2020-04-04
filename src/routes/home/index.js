import { h, Component } from 'preact';

import ApiService from '../../services/api';

export default class Home extends Component {
  state = {
    listings: [],
  };

  async componentWillMount() {
    try {
      const response = await ApiService.fetchAllListings();
      this.setState({
        listings: response.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async applyToListing(listing) {
    try {
      const response = await ApiService.applyToListing(listing.id);
      console.log(response);
    } catch (err) {
      console.log(err);
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
                <td>
                  <button onClick={() => this.applyToListing(item)}>
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
