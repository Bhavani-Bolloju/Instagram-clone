import React, { useState, useEffect, useContext } from "react";
import { getUserByUserId, getPhotos } from "../services/firebase";

import AuthContext from "../context/authContext";
const usePhoto = function () {
  const [photos, setPhotos] = useState(null);

  const { uid = "" } = useContext(AuthContext)?.user;

  useEffect(() => {
    const getTimeLinePhotos = async function (userId) {
      // const user = await getUserByUserId();
      const [user] = await getUserByUserId(userId);
      const { following } = user;
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };

    if (uid) {
      getTimeLinePhotos(uid);
    }
  }, [uid]);

  return { photos };
};

export default usePhoto;
