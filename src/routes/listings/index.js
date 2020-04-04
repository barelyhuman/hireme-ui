import { h, Component } from 'preact';
import { route } from 'preact-router';
import ApiService from '../../services/api';
import toast from '../../services/toast';

export default class Listings extends Component {
  _mounted = true;
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
      const response = await ApiService.fetchMyListings();
      if (this._mounted) {
        this.setState({
          listings: response.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  addListing() {
    route('/new');
  }

  viewApplicants(item) {
    route(`/view/${item.id}`);
  }

  async deleteListing(item) {
    try {
      const response = await ApiService.deleteListing(item.id);
      toast.success(response.data.message);
      this.fetchListings();
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.error);
      }
    }
  }

  render() {
    const { listings } = this.state;
    return (
      <div class="container">
        <button onClick={() => this.addListing()}>Add Listing</button>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Description</th>
              <th>Location</th>
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.company_name}</td>
                <td>{item.description}</td>
                <td>{item.location}</td>
                <td colSpan={2}>
                  <button onClick={() => this.viewApplicants(item)}>
                    View Applicants
                  </button>
                  <button
                    class="danger-text"
                    onClick={() => this.deleteListing(item)}
                  >
                    Delete
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
