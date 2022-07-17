import Link from "next/link";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserContext } from "../context/useUserContext";
import { useRouter } from "next/router";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";


const NavBar = () => {
  const { userData, dispatch } = useUserContext()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("blognado-access-token") !== "")
  })

  const handleClick = () => {
    router.push({
      pathname: `/blogs/search`,
      query: {
        searchKey: searchTerm
      }
    })
  }

  const [searchTerm, setSearchTerm] = useState("")
  const logout = () => {
    localStorage.setItem("blognado-access-token", "")
    setIsLoggedIn(false)
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
          <input type="text" placeholder="Search Blogs" value={searchTerm} onChange={e => setSearchTerm(e.currentTarget.value)}/>
          <button className="search-btn" onClick={handleClick}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </nav>
      <ul className="nav-auth">
        {isLoggedIn ? (
          <>
            <li>
              <Avatar dimension="md:w-12 md:h-12 h-7 w-7" href="/users/me" src={userData.picture} />
            </li>
            <li>
              <button className="p-2 text-sm px-4 btn-outline border rounded-lg" onClick={logout}>Logout</button>
            </li>
            <li>
              <button className="p-2 text-sm px-4 btn-outline border rounded-lg" onClick={() => router.push("/blogs/write")}>New Blog</button>
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
