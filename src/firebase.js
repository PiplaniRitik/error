import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyCbfITBap5YsReTamrMx2iPVfECNI7CmvA",
  authDomain: "codeanalyzer-e5f34.firebaseapp.com",
  projectId: "codeanalyzer-e5f34",
  storageBucket: "codeanalyzer-e5f34.appspot.com",
  messagingSenderId: "372994323697",
  appId: "1:372994323697:web:e2bddc51edb6fba086a550",
  measurementId: "G-TJZG1RMTQN"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
