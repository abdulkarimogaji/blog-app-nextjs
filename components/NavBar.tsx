import Link from "next/link";

const NavBar = () => {
  return (
    <header className="navBar">
      <h1 className="logo text-3xl">BLOGNADO</h1>
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
        <ul>
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/list">
              <a>Blogs</a>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/AbdulkarimOgaji/automart"
              target="_blank"
              rel="noreferrer"
            >
               About
            </a>
          </li>
          <li>
            <Link href="/dashboard">
              <a>Team</a>
            </Link>
          </li>
        </ul>
        
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
