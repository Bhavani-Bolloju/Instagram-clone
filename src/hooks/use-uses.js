import { useEffect, useState, useContext } from "react";
import { getUserByUserId } from "../services/firebase";
import AuthContext from "../context/authContext";

const useUser = function () {
  const [userDetails, setUserDetails] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getUserDetail = async function () {
      const [response] = await getUserByUserId(user?.uid);
      setUserDetails(response);
    };
    if (user?.uid) {
      getUserDetail();
    }
  }, [user]);

  return { userDetails };
};

export default useUser;

//uid => based on which we will get user object that has all the details from firebase
