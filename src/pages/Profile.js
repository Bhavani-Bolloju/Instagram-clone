import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header/Header";

function Profile() {
  const { username } = useParams();
  const history = useHistory();
  const [userExists, setUserExists] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = async function (name) {
      const res = await getUserByUsername(name);
      console.log(res);
      if (res.length > 0) {
        setUserExists(true);
        setUser(res[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };

    if (username) {
      userDetails(username);
    }
  }, [username, history]);

  console.log(user);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;
