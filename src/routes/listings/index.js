import { h, Component } from 'preact';

import ApiService from '../../services/api';

export default class Listings extends Component {
  state = {
    listings: [],
  };

  async componentWillMount() {
    try {
      const response = await ApiService.fetchMyListings();
      this.setState({
        listings: response.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { listings } = this.state;
    return (
      <div class="container">
        <button onClick={() => this.createListing}>Create New Listing</button>
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
