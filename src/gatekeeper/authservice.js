import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      return { user, isLoggedIn };
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      return { errorCode, errorMessage, email, credential };
      // ...
    });
}

export async function doLogOut() {
  const auth = getAuth();

  return await signOut(auth)
    .then(() => {
      // Sign-out successful.
      return { isLoggedIn: false };
    })
    .catch((error) => {
      // An error happened.
      return { error };
    });
}
