import { writable } from "svelte/store";

export const authState = writable({
  isLoggedIn: false,
  firebaseControlled: false,
  user: null,
});

export const currentSession = writable({
  user: null,
});
