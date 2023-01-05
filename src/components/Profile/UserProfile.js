import React, { useEffect, useState } from "react";
import { getPhotosByUserID } from "../../services/firebase";
import UserHeader from "./UserHeader";
import UserPhotos from "./UserPhotos";

function UserProfile({ user }) {
  const { userId, username, following, followers, fullName } = user;
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const userPhotos = async function () {
      const res = await getPhotosByUserID(userId);
      setPhotos(res);
    };
    userPhotos();
  }, [userId]);

  // console.log(followers);

  return (
    <div>
      <UserHeader
        totalPosts={photos?.length > 0 ? photos.length : 0}
        profileUsername={username}
        profileFullname={fullName}
        profileUserId={userId}
        followers={followers.length > 0 ? followers.length : 0}
        following={following.length > 0 ? following.length : 0}
      />
      <UserPhotos userPhotos={photos} />
    </div>
  );
}

export default UserProfile;
