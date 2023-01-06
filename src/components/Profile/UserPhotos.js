import React from "react";
import Skeleton from "react-loading-skeleton";

function UserPhotos({ userPhotos }) {
  return (
    <div className="w-[90%] mx-auto border-t py-3 border-t-grey-300">
      <p className="text-center mb-3 ">posts</p>
      <div className="grid grid-cols-3 gap-5 gap-y-10">
        {!userPhotos && <Skeleton count={4} height={300}></Skeleton>}
        {userPhotos.map((photo, i) => {
          return (
            <div
              className="relative hover:cursor-pointer group"
              key={photo.docId}
            >
              <img
                key={i}
                className="h-[350px] w-full"
                src={photo.imageSrc}
                alt={photo.caption}
              />
              <div className="absolute top-0 left-0 hidden items-center w-full h-full justify-center gap-[15%] text-sm text-white font-bold visibility group-hover:flex  backdrop-blur-sm backdrop-opacity-30">
                <div className="flex gap-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6 backdrop-blur-md  fill-white  hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <p>{photo.likes.length > 0 ? photo.likes.length : 0}</p>
                </div>
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6 fill-white hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>

                  <p>{photo.comments.length > 0 ? photo.comments.length : 0}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPhotos;
