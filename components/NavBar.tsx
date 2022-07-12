import Link from "next/link";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserContext } from "../context/useUserContext";
import Image from "next/image";
import { useRouter } from "next/router";


const NavBar = () => {
  const { userData, dispatch } = useUserContext()
  const router = useRouter()
  const isLoggedIn = userData._id != ""
  const logout = () => {
    localStorage.removeItem("blognado_access_token")
    dispatch({
      type: "LOGOUT",
      payload: {} as any
    })
    router.replace("/")
  }
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
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/users/me" passHref><a className="flex-center">
                <div className="relative md:w-12 md:h-12 h-7 w-7">
                  <Image
                    src="/user_avatar.jpeg"
                    alt="user_avatar"
                    layout="fill"
                    style={{ borderRadius: 999 }}
                  />
                </div>
              </a></Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : <>
          <li>
            <Link href="/login" passHref><a>Login</a></Link>
          </li>
          <li>
            <Link href="/signup" passHref><a>Signup</a></Link>
          </li></>}

      </ul>
    </header>
  );
};

export default NavBar;
