import React, { useEffect, useState } from "react";
import { getPhotosByUserID } from "../../services/firebase";
import UserHeader from "./UserHeader";
import UserPhotos from "./UserPhotos";

function UserProfile({ user }) {
  const { userId, username, following, followers, fullName, docId } = user;
  const [photos, setPhotos] = useState(null);

  // console.log(docId);

  useEffect(() => {
    const userPhotos = async function () {
      const res = await getPhotosByUserID(userId);
      setPhotos(res);
    };
    userPhotos();
  }, [userId]);

  // console.log(followers);

  return (
    <div className="mx-auto max-w-screen-lg flex flex-col gap-14 py-10">
      <UserHeader
        totalPosts={photos?.length > 0 ? photos.length : 0}
        profileUsername={username}
        profileFullname={fullName}
        profileUserId={userId}
        followers={followers.length > 0 ? followers.length : 0}
        following={following.length > 0 ? following.length : 0}
        profileDocId={docId}
      />
      {photos && <UserPhotos userPhotos={photos} />}
    </div>
  );
}

export default UserProfile;
