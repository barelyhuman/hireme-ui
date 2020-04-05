import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import AuthService from '../../services/auth';

const privateNav = () => (
  <>
    {AuthService.isAuthenticated() ? (
      <nav class="d-block text-center ml-auto mr-auto">
        <span class="m-sm">
          <Link
            class={style.link}
            activeClassName={style['active-link']}
            href="/"
          >
            Job Listings
          </Link>
        </span>
        <span class="m-sm">
          <Link
            class={style.link}
            activeClassName={style['active-link']}
            href="/applications"
          >
            Applied To
          </Link>
        </span>
        <span class="m-sm">
          <Link
            class={style.link}
            activeClassName={style['active-link']}
            href="/listings"
          >
            My Listings
          </Link>
        </span>
        <span class="m-sm">
          <Link
            class={style.link}
            activeClassName={style['active-link']}
            href="/logout"
          >
            <button class="outline">Logout</button>
          </Link>
        </span>
      </nav>
    ) : null}
  </>
);

const Header = () => (
  <header class="d-flex align-center justify-space-between">
    <div>
      <Link class={style.link} activeClassName={style['active-link']} href="/">
        <h1 class="text-center">HireMe</h1>
      </Link>
    </div>
    <div>{privateNav()}</div>
  </header>
);

export default Header;
