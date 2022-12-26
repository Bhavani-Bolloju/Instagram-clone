import React, { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import usePhoto from "../../hooks/use-photo";
import Post from "../Posts/Post";

function Timeline() {
  // console.log(uid);
  const { photos } = usePhoto();
  // console.log(photos);

  return (
    <div className="col-span-2">
      {!photos && (
        <Skeleton
          count={4}
          height={450}
          width="80%"
          className="my-5"
        ></Skeleton>
      )}

      {photos &&
        photos.length > 0 &&
        photos.map((content) => {
          return <Post key={content.docId} content={content} />;
        })}

      {photos && photos.length < 0 && (
        <p className="text-2xl text-grey-700 text-center">
          follow people for suggestion
        </p>
      )}
    </div>
  );
}

export default Timeline;
