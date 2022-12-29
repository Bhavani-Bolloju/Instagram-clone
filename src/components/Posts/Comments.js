import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import AddComment from "./AddComment";

function Comments({ posted, comments: allComments, docId, commentInput }) {
  const [comments, setComments] = useState(allComments);

  return (
    <div className="ml-3">
      <div>
        {comments.length >= 3 && (
          <p className="text-sm text-grey-600">
            view all {comments.length} comments
          </p>
        )}

        <ul className="list-none overflow-y-scroll">
          {comments.slice(0, 3).map((item, i) => (
            <p key={i} className="flex gap-2 text-sm py-1">
              <Link to={`/p/${item.displayName}`}>
                <span className="font-bold">{item.displayName}</span>
              </Link>
              <span className="text-grey-700">{item.comment}</span>
            </p>
          ))}
        </ul>
        <p className="text-xs text-grey-500 py-3">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </div>
  );
}

export default Comments;
