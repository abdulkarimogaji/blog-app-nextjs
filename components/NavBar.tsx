import Link from "next/link";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavBar = () => {
  return (
    <header className="navBar">
      <h1 className="logo"><Link href="/" passHref><a className="text-3xl">BLOGNADO</a></Link></h1>
      <input
        type="checkbox"
        name="nav-toggler"
        className="nav-toggler"
        id="nav-toggler"
      />
      <label htmlFor="nav-toggler" className="nav-toggler-label">
        <span></span>
      </label>
      <nav>
        <div className="search-bar">
          <input type="text" placeholder="Search Blogs" />
          <button className="search-btn" onClick={() => console.log("clicked")}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </nav>
      <ul className="nav-auth">
        <li>
          <a href="https://google.com">
            Login
          </a>
        </li>
        <li>
          <a href="https://google.com">
            Signup
          </a>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
