import React, { useContext } from "react";
import firebaseContext from "../../context/firebase";
import AuthContext from "../../context/authContext";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as ROUTES from "../../constants/routes";

import itachi from "../../images/avatars/itachi.jpg";

function Header() {
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(AuthContext);

  // console.log("user", user);

  return (
    <header className="flex justify-around py-3 bg-white text-grey-700 border-b border-grey-300">
      <img src={logo} alt="instagram logo" className="w-[100px]" />
      {user ? (
        <nav className="flex items-center gap-3">
          <Link to={ROUTES.DASHBOARD}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-grey-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => {
              firebase.auth().signOut();
            }}
            onKeyDown={(e) => {
              if (e.target === "enter") {
                firebase.auth().signOut();
              }
            }}
          >
            <Link to={ROUTES.LOGIN}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-grey-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </Link>
          </button>

          <Link to={`/p/${user.displayName}`}>
            <img
              src={itachi}
              alt={`${user.displayname}`}
              className="w-6 h-6 rounded-[50%]"
            />
          </Link>
        </nav>
      ) : (
        <nav className="flex items-center gap-3 text-sm font-semibold">
          <Link
            className="bg-blue-400 rounded-lg px-2 py-1 block text-white"
            to={ROUTES.LOGIN}
          >
            Log In
          </Link>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
