import Rebase from "re-base";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBE0Mrk9r-0SXJIDm97BUWXdZjKD-bx2uI",
  authDomain: "fish-menu-8b04f.firebaseapp.com",
  databaseURL: "https://fish-menu-8b04f.firebaseio.com",
  projectId: "fish-menu-8b04f",
  storageBucket: "fish-menu-8b04f.appspot.com",
  messagingSenderId: "505495404629",
  appId: "1:505495404629:web:633317d5a8cdf531c014dc",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const base = Rebase.createClass(firebaseApp.database());
