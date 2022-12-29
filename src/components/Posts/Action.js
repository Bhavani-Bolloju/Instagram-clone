import React, { useContext, useState } from "react";

import firebaseContext from "../../context/firebase";
import AuthContext from "../../context/authContext";

function Action({ userlikedPhoto, docId, likes, commentInput }) {
  const { firebase, FieldValue } = useContext(firebaseContext);

  const { user } = useContext(AuthContext);

  const [toggleLike, setToggleLike] = useState(userlikedPhoto);
  const [totalLikes, setTotalLikes] = useState(likes);

  const toggleLikeHandler = async function () {
    setToggleLike((prev) => !prev);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLike
          ? FieldValue.arrayRemove(user.uid)
          : FieldValue.arrayUnion(user.uid),
      });

    setToggleLike((prev) => (toggleLike ? prev - 1 : prev + 1));
  };

  return (
    <div className="ml-3 py-3 flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-6 h-6 cursor-pointer  ${
            toggleLike ? "fill-red text-red" : "fill-none text-grey-700"
          }`}
          onClick={toggleLikeHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <svg
          onClick={() => commentInput.current.focus()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-grey-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </div>
  );
}

export default Action;
