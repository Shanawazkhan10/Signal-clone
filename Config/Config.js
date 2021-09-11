import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEvO5mOq9pbVFJsO2CG8rjIcGZ1EsbA8M",
  authDomain: "signal-155bf.firebaseapp.com",
  projectId: "signal-155bf",
  storageBucket: "signal-155bf.appspot.com",
  messagingSenderId: "652566297787",
  appId: "1:652566297787:web:2a79a6a5ae9500ac3b7d9e",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
