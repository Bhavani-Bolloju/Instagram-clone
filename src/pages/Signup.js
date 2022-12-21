import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import iphone from "../images/iphone-with-profile.jpg";
import logo from "../images/logo.png";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import doesUserAlreadyExist from "../services/firebase";

function Signup() {
  const { firebase } = useContext(firebaseContext);
  const history = useHistory();
  // console.log(firebase);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const emailHandler = function (e) {
    setInputEmail(e.target.value);
  };
  const passwordHandler = function (e) {
    setInputPassword(e.target.value);
  };
  const usernameHandler = function (e) {
    setUsername(e.target.value);
  };
  const fullnameHandler = function (e) {
    setFullname(e.target.value);
  };

  const isValid =
    inputEmail !== "" &&
    inputPassword !== "" &&
    fullname !== "" &&
    username !== "";

  const submitHandler = async function (e) {
    e.preventDefault();
    const userAlreadyExist = await doesUserAlreadyExist(username);

    if (!userAlreadyExist) {
      try {
        //for authentication
        const newUserAccont = await firebase
          .auth()
          .createUserWithEmailAndPassword(inputEmail, inputPassword);

        //auth also includes username of the new user
        await newUserAccont.user.updateProfile({
          displayName: username,
        });

        //update the firestore collection with new user details

        await firebase.firestore().collection("users").add({
          dateCreated: Date.now(),
          emailAddress: inputEmail.toLowerCase(),
          fullName: fullname,
          userId: newUserAccont.user.uid,
          username: username.toLowerCase(),
          followers: [],
          following: [],
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Account with this username already exists!");
    }
  };

  return (
    <div className="container flex mx-auto items-center h-screen max-w-screen-md ">
      <div className="w-[45%] flex flex-col gap-5 items-stretch mx-auto">
        <div className="border border-grey-200 py-[60px] px-5 bg-white">
          <img
            src={logo}
            alt="instagram logo"
            className="mx-auto mb-8 w-[65%]"
          />

          {error && <p className="text-sm mb-8 text-red">{error}</p>}

          <form
            className="text-sm flex flex-col gap-3  w-full h-full "
            onSubmit={submitHandler}
          >
            <input
              type="text"
              aria-label="enter your username"
              placeholder="Username"
              className="px-3 py-1 border border-grey-400 bg-grey-100 text-grey-600 rounded-sm placeholder:text-[13px] focus:outline-none focus:border-grey-500"
              onChange={usernameHandler}
            />
            <input
              type="text"
              aria-label="enter your full name"
              placeholder="Full Name"
              className="px-3 py-1 border border-grey-400 bg-grey-100 text-grey-600 rounded-sm placeholder:text-[13px] focus:outline-none focus:border-grey-500"
              onChange={fullnameHandler}
            />
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
        <div className="self-center text-center w-full border border-grey-200 py-[20px] px-5 bg-white">
          <p className="text-sm text-grey-600">
            <span>Have an account? </span>
            <Link to={ROUTES.LOGIN} className="font-medium text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
