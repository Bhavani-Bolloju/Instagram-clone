import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowingArray,
  updateLoggeduserFollowersArray,
} from "../../services/firebase";

function SuggestedProfile({ spDocId, spUsername, userId, docId, spUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  // console.log(spUserId);

  const handleFollowUser = async function () {
    //update the user array of followers
    await updateLoggedInUserFollowingArray(docId, spUserId, isFollowing);
    await updateLoggeduserFollowersArray(spDocId, userId, isFollowing);
    setIsFollowing(true);
  };

  return (
    <>
      {!isFollowing && (
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={require(`../../images/avatars/${spUsername}.jpg`)}
              alt={spUsername}
              className="w-6 h-6 rounded-full"
            />
            <Link
              to={`/p/${spUsername}`}
              className="text-xs font-bold text-grey-700"
            >
              {spUsername}
            </Link>
          </div>
          <button
            type="button"
            className="text-xs text-blue-500 font-bold"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        </li>
      )}
    </>
  );
}

export default SuggestedProfile;
