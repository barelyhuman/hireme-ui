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
      <div>
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
            {listings.length ? (
              listings.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.company_name}</td>
                  <td>{item.description}</td>
                  <td>{item.location}</td>
                  <td colSpan={2}>
                    <button onClick={() => this.viewApplicants(item)}>
                      <i class="gg-eye" />
                    </button>
                    <button onClick={() => this.deleteListing(item)}>
                      <i class="gg-trash-empty" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  You haven't created any listings yet.
                  <br />
                  Click on <strong>Add Listing</strong> to create one
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
