import React from "react";

function Image({ src, caption }) {
  return (
    <div>
      <img src={src} alt={caption} />
    </div>
  );
}

export default Image;
