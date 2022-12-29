import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import firebaseContext from "../../context/firebase";

function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState("");

  const {
    user: { displayName },
  } = useContext(AuthContext);

  const { firebase, FieldValue } = useContext(firebaseContext);

  const submitFormHandler = function (e) {
    e.preventDefault();
    if (comment.length < 1) {
      return;
    }
    setComments((prev) => [{ displayName, comment }, ...prev]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="mr-3 pb-4">
      <form
        className="flex gap-2 border-b border-grey-300"
        method="POST"
        onSubmit={submitFormHandler}
      >
        <input
          aria-label="add a comment"
          type="text"
          name="add-comment"
          placeholder="add your comments here..."
          autoComplete="off"
          className="w-full text-sm  py-2 px-3 placeholder:text-grey-400 text-grey-700 focus:outline-0 placeholder:text-xs"
          onChange={(event) => setComment(event.target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-600 ${
            !comment && "cursor-not-allowed opacity-50 "
          } cursor-pointer`}
          disabled={comment.length < 1}
        >
          post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
