import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import AuthService from '../../services/auth';

const publicNav = () => (
  <>
    {!AuthService.isAuthenticated() ? (
      <nav class="d-block text-center ml-auto mr-auto">
        <span class="m-sm">
          <Link
            class={style.link}
            activeClassName={style['active-link']}
            href="/login"
          >
            Login | Register
          </Link>
        </span>
      </nav>
    ) : null}
  </>
);

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
            <span class="danger-text">Logout</span>
          </Link>
        </span>
      </nav>
    ) : null}
  </>
);

const Header = () => (
  <header>
    <h1 class="text-center">HireMe</h1>
    {publicNav()}
    {privateNav()}
  </header>
);

export default Header;
