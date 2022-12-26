import React from "react";
import User from "./User";
import Suggestions from "./Suggestions";

import useUser from "../../hooks/use-uses";

function Sidebar() {
  const {
    userDetails: { docId, fullName, username, userId, following },
  } = useUser();

  return (
    <div className="p-4">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} following={following} docId={docId} />
    </div>
  );
}

export default Sidebar;
