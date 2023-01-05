import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-uses";
import { isUserFollowingProfileUser } from "../../services/firebase";

function UserHeader({
  profileUsername,
  profileFullname,
  followers,
  following,
  profileUserId,
  totalPosts,
}) {
  const {
    userDetails: { username: loggedInUsername },
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

  const followProfileUserHandler = function () {
    setTotalFollowers((count) => (isFollowing ? count - 1 : count + 1));
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="flex gap-[20%] mx-auto w-[50%] mt-10 items-start">
      <img
        className="w-[130px] h-[130px] rounded-full "
        src={require(`../../images/avatars/${profileUsername}.jpg`)}
        alt={profileUsername}
      />

      <div className="flex-grow text-sm flex flex-col gap-3">
        <div className="flex gap-20">
          <p>{profileUsername}</p>
          {!loggedInUserProfile && (
            <button
              onClick={followProfileUserHandler}
              className="bg-blue-500 text-white px-2 font-bold  text-xs"
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
        <p>{profileFullname}</p>
      </div>
    </div>
  );
}

export default UserHeader;
