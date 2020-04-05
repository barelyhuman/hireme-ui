import { h, Component } from 'preact';
import ApiService from '../../services/api';
import toast from '../../services/toast';

export default class Listings extends Component {
  _mounted = true;
  state = {
    applicants: [],
    filteredApplicants: [],
    showShortlisted: false,
  };

  componentDidMount() {
    this._mounted = true;
    this.fetchApplicants(this.props.id);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async fetchApplicants(listingId) {
    try {
      const response = await ApiService.fetchListingApplicants(listingId);
      if (this._mounted) {
        this.setState({
          applicants: response.data.data,
          filteredApplicants: response.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async shortListApplicant(item) {
    try {
      const response = await ApiService.toggleShortlistStatus(
        item.listingId,
        item.userId
      );
      toast.success(response.data.message);
      this.fetchApplicants(this.props.id);
    } catch (err) {
      console.log(err);
      if ((((err || {}).response || {}).data || {}).error) {
        toast.error(err.response.data.error);
      }
    }
  }

  showOnlyShortlisted() {
    const { applicants } = this.state;
    const filtered = applicants.filter((item) => item.is_shortlisted);
    this.setState({
      showShortlisted: true,
      filteredApplicants: filtered,
    });
  }

  showAll() {
    const { applicants } = this.state;
    const filtered = applicants.slice();
    this.setState({
      showShortlisted: false,
      filteredApplicants: filtered,
    });
  }

  handleCheckbox(e) {
    if (e.target.checked) {
      this.showOnlyShortlisted();
    } else {
      this.showAll();
    }
  }

  render() {
    const { filteredApplicants } = this.state;
    return (
      <div class="container">
        <label class="checkbox-wrapper">
          <span>Show Shortlisted</span>
          <input type="checkbox" onChange={(e) => this.handleCheckbox(e)} />
          <div class="checkbox-input" />
        </label>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Contact</th>
              <th colSpan={1} />
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((item) => (
              <tr>
                <td>{item.listingName}</td>
                <td>{item.userEmail}</td>
                <td>
                  {item.is_shortlisted ? (
                    <button onClick={() => this.shortListApplicant(item)}>
                      <i class="gg-remove" />
                    </button>
                  ) : (
                    <button onClick={() => this.shortListApplicant(item)}>
                      <i class="gg-check" />
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
