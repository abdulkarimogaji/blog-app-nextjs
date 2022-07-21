import { useEffect, useState } from "react";

import { useUserContext } from "../../context/useUserContext";
import Avatar from "../Avatar";
import styles from "./navbar.module.css";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const { userData, dispatch } = useUserContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("blognado-access-token") !== "");
  });

  const handleClick = () => {
    router.push({
      pathname: `/blogs/search`,
      query: {
        searchKey: searchTerm,
      },
    });
  };

  const logout = () => {
    localStorage.setItem("blognado-access-token", "");
    setIsLoggedIn(false);
    dispatch({
      type: "LOGOUT",
      payload: {} as any,
    });
    router.replace("/");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/" passHref>
          <a style={{ fontSize: "2rem" }}>BLOGNADO</a>
        </Link>
      </h1>
      <input
        type="checkbox"
        name="nav-toggler"
        className={styles.navToggler}
        id="nav-toggler"
      />
      <label htmlFor="nav-toggler" className={styles.navTogglerLabel}>
        <span className={styles.hamburger}></span>
      </label>
      <nav>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
          <button className={styles.searchBtn} onClick={handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </nav>
      <ul className={styles.navAuth}>
        {isLoggedIn ? (
          <>
            <li>
              <button
                className="p-2 text-sm px-4 btn-outline border rounded-lg"
                onClick={() => router.push("/blogs/write")}
              >
                New Blog
              </button>
            </li>
            <li>
              <Avatar
                dimension="md:w-8 md:h-8 h-7 w-7"
                href="/users/me"
                src={userData.picture}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" passHref>
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/signup" passHref>
                <a>Signup</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
