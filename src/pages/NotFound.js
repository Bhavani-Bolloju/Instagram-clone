import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

function NotFound() {
  return (
    <div className="flex flex-col items-center mt-16 gap-4">
      <h2 className="font-semibold text-xl">
        Sorry, this page isn't available.
      </h2>
      <p className="text-grey-500">
        The link you followed may be broken, or the page may have been removed.
        <Link to={ROUTES.LOGIN} className="text-blue-500">
          Go back to Instagram.
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
