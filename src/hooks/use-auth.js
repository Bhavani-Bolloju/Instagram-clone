import { useEffect, useState, useContext } from "react";
import firebaseContext from "../context/firebase";

const useAuthListener = function () {
  const authToken = JSON.parse(localStorage.getItem("authuser"));

  const [user, setUser] = useState(authToken);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authuser) => {
      if (authuser) {
        //this means user is signed In
        // console.log("authuser", authuser);
        localStorage.setItem("authuser", JSON.stringify(authuser));
        setUser(authuser);
      } else {
        //this means user is signed out
        localStorage.removeItem("authuser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
};

export default useAuthListener;
