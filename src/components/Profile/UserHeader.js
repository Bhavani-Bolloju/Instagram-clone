import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-uses";
import {
  isUserFollowingProfileUser,
  toggleFollow,
} from "../../services/firebase";

function UserHeader({
  profileUsername,
  profileFullname,
  profileDocId,
  profileUserId,
  followers,
  following,
  totalPosts,
}) {
  const {
    userDetails: {
      username: loggedInUsername,
      docId: loggedUserDocID,
      userId: loggeduserId,
    },
  } = useUser();

  const loggedInUserProfile = profileUsername === loggedInUsername;

  const [isFollowing, setIsFollowing] = useState(false);

  const [totalFollowers, setTotalFollowers] = useState(followers);

  useEffect(() => {
    const getProfileUserFollowing = async function () {
      const res = await isUserFollowingProfileUser(
        loggedInUsername,
        profileUserId
      );

      setIsFollowing(res);
    };

    if (loggedInUsername) {
      getProfileUserFollowing();
    }
  }, [loggedInUsername, profileUserId]);

  //follow toggle button
  const followProfileUserHandler = async function () {
    setTotalFollowers((count) => (isFollowing ? count - 1 : count + 1));
    setIsFollowing((prev) => !prev);

    await toggleFollow(
      isFollowing,
      loggeduserId,
      profileUserId,
      loggedUserDocID,
      profileDocId
    );
  };

  return (
    <div className="flex gap-[20%] mx-auto w-[50%]  items-start">
      <img
        className="w-[130px] h-[130px] rounded-full "
        src={require(`../../images/avatars/${profileUsername}.jpg`)}
        alt={profileUsername}
      />

      <div className="flex-grow text-sm flex gap-3 flex-col self-center">
        <div className="flex gap-10 items-center">
          <p className="text-lg">{profileUsername}</p>
          {!loggedInUserProfile && (
            <button
              onClick={followProfileUserHandler}
              className="bg-blue-700 text-white px-2 py-[3px] font-bold  text-xs"
            >
              {isFollowing ? "unfollow" : "follow"}
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-bold">{totalPosts}</span> posts
          </div>
          <div>
            <span className="font-bold">{totalFollowers}</span>
            {totalFollowers <= 1 ? " follower" : " followers"}
          </div>
          <div>
            <span className="font-bold"> {following}</span> following
          </div>
        </div>
        <p className="font-medium">{profileFullname}</p>
      </div>
    </div>
  );
}

export default UserHeader;
