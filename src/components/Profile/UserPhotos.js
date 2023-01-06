import React from "react";
import Skeleton from "react-loading-skeleton";

function UserPhotos({ userPhotos }) {
  return (
    <div className="w-[90%] mx-auto border-t py-3 border-t-grey-300">
      <p className="text-center mb-3 ">posts</p>
      <div className="grid grid-cols-3 gap-5 gap-y-10">
        {!userPhotos && <Skeleton count={4} height={300}></Skeleton>}
        {userPhotos.map((photo, i) => (
          <img
            key={i}
            className="h-[350px]"
            src={photo.imageSrc}
            alt={photo.caption}
          />
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;
