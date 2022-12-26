import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import user from "../../images/avatars/itachi.jpg";

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <>
      <Skeleton count={1} height={61} />
    </>
  ) : (
    <Link to={`/p/${username}`} className="flex gap-2 items-center text-sm">
      <img src={user} alt="user profile" className="rounded-full h-9 w-9 " />
      <div>
        <p className="font-semibold text-xs">{username}</p>
        <p className="text-xs">{fullName}</p>
      </div>
    </Link>
  );
};

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
