import firebase from "firebase/compat/app";

import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDU0m7nq2IUoMuYzsq-qVGGVzaukMku7SU",
  authDomain: "mascot-project.firebaseapp.com",
  projectId: "mascot-project",
  storageBucket: "mascot-project.appspot.com",
  messagingSenderId: "164321183697",
  appId: "1:164321183697:web:8cf554e1896f216fda42f0",
  measurementId: "G-YN83EFHH86",
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
