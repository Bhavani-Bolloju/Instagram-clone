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

export const getPhotosByUserID = async function (userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  return photos;
};

export const isUserFollowingProfileUser = async function (
  loggedInUser,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUser)
    .where("following", "array-contains", profileUserId)
    .get();

  const data = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const isFollowing = data.length > 0 ? true : false;

  return isFollowing;
  // console.log(isFollowing);
};

//update loggedin user [following] array with the suggested profile userId upon follow btn click

export const updateLoggedInUserFollowingArray = async function (
  docId, //the logged in user doc Id
  spUserId, //user thats been followed
  isFollowing // boolean value
) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(spUserId)
        : FieldValue.arrayUnion(spUserId),
    });

  //userId been added to the loggedIN user following array since he is following a new user that been suggested to him
};

//update the followers array of the profileuser as well to add the loggedIn user UserId since hes been followed by logged in user
export const updateLoggeduserFollowersArray = async function (
  spDocId, //the user thats been followed doc ID
  userId, //logged in user userId to add to user followers array
  isFollowing //boolean value
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
};

export const toggleFollow = async function (
  isFollowing,
  userId,
  profileUserId,
  userDocId,
  profileUserDocId
) {
  await updateLoggedInUserFollowingArray(userDocId, profileUserId, isFollowing);

  await updateLoggeduserFollowersArray(profileUserDocId, userId, isFollowing);
};
