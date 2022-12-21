import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import iphone from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

function LoginPage() {
  const { firebase } = useContext(firebaseContext);
  const history = useHistory();
  // console.log(firebase);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(null);

  const emailHandler = function (e) {
    setInputEmail(e.target.value);
  };
  const passwordHandler = function (e) {
    setInputPassword(e.target.value);
  };

  const isValid = inputEmail !== "" && inputPassword !== "";

  const submitHandler = async function (e) {
    e.preventDefault();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(inputEmail, inputPassword);

      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto items-center h-screen max-w-screen-md ">
      <div className=" w-[60%]">
        <img src={iphone} alt="profileImage" className="bg-conver" />
      </div>

      <div className="w-[40%] flex flex-col gap-5 items-stretch ">
        <div className="border border-grey-200 py-[60px] px-5 bg-white">
          <img
            src={logo}
            alt="instagram logo"
            className="mx-auto mb-8 w-[65%]"
          />

          {error && <p className="text-sm text-red">{error}</p>}

          <form
            className="text-sm flex flex-col gap-3  w-full h-full "
            onSubmit={submitHandler}
          >
            <input
              type="email"
              aria-label="enter your email address"
              placeholder="Email address"
              className="px-3 py-1 border border-grey-400 bg-grey-100 text-grey-600 rounded-sm placeholder:text-[13px] focus:outline-none focus:border-grey-500"
              onChange={emailHandler}
            />
            <input
              type="password"
              aria-label="enter your password"
              placeholder="Password"
              className="px-3 py-1 border border-grey-400 bg-grey-100 text-grey-600 rounded-sm placeholder:text-[13px] focus:outline-none focus:border-grey-500"
              onChange={passwordHandler}
            />
            <button
              className={`bg-blue-500/80 text-white py-1 rounded-lg ${
                isValid && "bg-blue-600"
              }  `}
              disabled={!isValid}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="self-center w-full border border-grey-200 py-[20px] px-5 bg-white">
          <p className="text-sm text-grey-600">
            <span>Don't have an account? </span>
            <Link to={ROUTES.SIGN_UP} className="font-medium text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
