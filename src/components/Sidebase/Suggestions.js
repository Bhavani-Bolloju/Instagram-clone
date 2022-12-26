import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";

function Suggestions({ userId, following, docId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const getProfiles = async function () {
      const res = await getSuggestedProfiles(userId, following);
      setProfiles(res);
    };

    if (userId) {
      getProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150}></Skeleton>
  ) : (
    <div className="mt-5 flex flex-col gap-3 w-[70%]">
      <h3 className="text-xs mb-1 text-grey-600">suggestions for you</h3>
      <ul className="list-none flex flex-col gap-3">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            docId={docId}
            spDocId={profile.docId}
            spUsername={profile.username}
            userId={userId}
            spUserId={profile.userId}
          />
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};
