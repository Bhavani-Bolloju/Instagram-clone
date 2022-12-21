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

export default doesUserAlreadyExist;
