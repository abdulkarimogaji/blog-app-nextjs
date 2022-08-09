import { useEffect, useState } from "react";

import { useUserContext } from "../../context/useUserContext";
import Avatar from "../Avatar";
import styles from "./navbar.module.css";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/router";
import Link from "next/link";
import { MyResponseType, User } from "../../utils/types";
import { useQuery } from "react-query";
import { request } from "../../utils/axios-utils";

const getUser = (token: string) => {
  return request({
    url: "/users/me",
  });
};

const NavBar = () => {
  const { userData, dispatch } = useUserContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const { refetch: fetchUser } = useQuery<MyResponseType<User>, string>(
    ["me"],
    () => getUser(token),
    {
      enabled: false,
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN",
          payload: { ...data.data.data, access_token: token },
        });
      },
    }
  );

  useEffect(() => {
    const verifylogin = async () => {
      const token = localStorage.getItem("blognado-access-token");
      if (token) {
        setToken((prev) => token);
        fetchUser();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    verifylogin();
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/b/search`,
      query: {
        searchKey: searchTerm,
      },
    });
    setSearchTerm("");
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
        <form className={styles.searchBar} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
          />
          <button className={styles.searchBtn}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </nav>
      <ul className={styles.navAuth}>
        {isLoggedIn ? (
          <>
            <li>
              <button
                className="p-2 text-sm px-4 btn-outline border rounded-lg"
                onClick={() => router.push("/b/write")}
              >
                New Blog
              </button>
            </li>
            <li>
              <Avatar
                dimension="md:w-12 md:h-12 h-8 w-8"
                href="/u/me"
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
