import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Action from "./Action";

function Post({ content }) {
  const { username, caption, imageSrc, userlikedPhoto, likes, docId } = content;

  return (
    <div className="bg-white border col-span-4 border-grey-200 mb-12 rounded">
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Action
        userlikedPhoto={userlikedPhoto}
        likes={likes.length}
        docId={docId}
      />
    </div>
  );
}

export default Post;

// Post.propTypes = {
//   caption: PropTypes.string.isRequired,
//   dateCreated: PropTypes.number.isRequired,
//   imageSrc: PropTypes.string.isRequired,
//   likes: PropTypes.array.isRequired,
//   photoId: PropTypes.number.isRequired,
//   userId: PropTypes.number.isRequired,
//   userLikedPhoto: PropTypes.bool.isRequired,
//   username: PropTypes.string.isRequired,
// };
