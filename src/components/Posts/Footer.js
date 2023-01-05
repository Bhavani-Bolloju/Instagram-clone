import React from "react";
import { Link } from "react-router-dom";

function Footer({ caption, username }) {
  return (
    <div className="flex gap-2 text-sm ml-3 pb-2">
      <span className="font-bold">
        <Link to={`/p/${username}`}>{username}</Link>
      </span>
      <span className="text-grey-600">{caption}</span>
    </div>
  );
}

export default Footer;
