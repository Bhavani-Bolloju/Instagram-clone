import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header/Header";
import UserProfile from "../components/Profile/UserProfile";

function Profile() {
  const { username } = useParams();
  const history = useHistory();
  const [userExists, setUserExists] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = async function (name) {
      const res = await getUserByUsername(name);
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

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-lg ">
        {userExists && <UserProfile user={user} />}
      </div>
    </div>
  );
}

export default Profile;
