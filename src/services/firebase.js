import { firebase, FieldValue } from "../lib/firebase";

const doesUserAlreadyExist = async function (username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  // console.log(result);

  const resultData = result.docs.map((user) => {
    return user.data();
  });

  return resultData.length > 0 ? true : false;
};

export const getUserByUsername = async function (username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const getUserByUserId = async function (userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const resultData = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  // console.log(result, "useriddata");
  return resultData;
};

export default doesUserAlreadyExist;

export const getSuggestedProfiles = async function (userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  // .where("following", "!==", "vigH5JRcM7WFwh0U06gbMYqNo3B2");
  const resultData = result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((user) => {
      return user.userId !== userId && !following.includes(user.userId);
    });
  return resultData;
};

//update Logged In User Followed Array

export const updateLoggedInUserFollowedArray = async function (
  docId,
  spUserId,
  isFollowing
) {
  // console.log(docId, spUserId);

  return await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(spUserId)
        : FieldValue.arrayUnion(spUserId),
    });
};

//update Followed user Followers Array

export const updateFolloweduserFollowersArray = async function (
  spDocId,
  userId,
  isFollowing
) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(spDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
  // console.log(result.data());
};

export const getPhotos = async function (userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  // console.log(photos);

  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userlikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userlikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);

      const { username } = user[0];
      return { username, ...photo, userlikedPhoto };
    })
  );

  return photosWithUserDetails;
};
