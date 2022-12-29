import React from "react";

function Header({ username }) {
  return (
    <div className="flex border-b border-grey-400 gap-3 p-3">
      <p className="text-sm">{username}</p>
      <img
        className="rounded-full h-6 w-6"
        src={require(`../../images/avatars/${username}.jpg`)}
        alt=""
      />
    </div>
  );
}

export default Header;
