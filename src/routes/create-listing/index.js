import { h, Component } from 'preact';
import { route } from 'preact-router';
import toast from '../../services/toast';

import ApiService from '../../services/api';

export default class CreateListing extends Component {
  state = {
    name: '',
    company_name: '',
    tags: '',
    description: '',
    location: '',
  };

  async createListing() {
    try {
      const response = await ApiService.createListing({ ...this.state });
      toast.success(response.data.message);
      route('/listings');
    } catch (err) {
      toast.success(err.response.data.error);
      console.log(err);
    }
  }

  render() {
    const { name, description, tags, company_name, location } = this.state;
    return (
      <div class="container text-center">
        <div>
          <input
            type="text"
            class="ml-auto mr-auto w-100"
            placeholder="Company Name"
            value={company_name}
            onChange={(e) => this.setState({ company_name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            class="ml-auto mr-auto w-100"
            placeholder="Role"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
          <textarea
            type="text"
            class="ml-auto mr-auto w-100 content-box"
            placeholder="Description"
            rows={10}
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            class="ml-auto mr-auto w-100"
            placeholder="Tags (ex. one, two, three) (Optional)"
            value={tags}
            onChange={(e) => this.setState({ tags: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            class="ml-auto mr-auto w-100"
            placeholder="Location (Optional)"
            value={location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <div>
          <button onClick={() => this.createListing()}>Create Listing</button>
        </div>
      </div>
    );
  }
}
