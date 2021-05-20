import firebase from "firebase/compat/app";

import "firebase/compat/auth";
const firebaseConfig = {
 //firebase config
};

import { authState, currentSession } from "../stores/auth";

export const firebaseInit = () => {
  firebase.initializeApp(firebaseConfig);
};

export const authChange = () => {
  firebase.auth().onAuthStateChanged((user) => {
    authState.set({
      isLoggedIn: user !== null,
      firebaseControlled: true,
      user,
    });
  });
};

export const tokenChange = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (!user) {
      currentSession.set({ user: null });
    } else {
      const token = await user.getIdToken();
      currentSession.set({ uid: user.uid, email: user.email, token });
    }
  });
};
