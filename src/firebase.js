import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyDZNYg0kn6iLfhphfhakTuiaZP8cfDKOAA",
  authDomain: "new-project-9bb4b.firebaseapp.com",
  projectId: "new-project-9bb4b",
  storageBucket: "new-project-9bb4b.appspot.com",
  messagingSenderId: "193662491713",
  appId: "1:193662491713:web:5e9f6ce31e0c912365bac0",
  measurementId: "G-WJHYP4KT23"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
