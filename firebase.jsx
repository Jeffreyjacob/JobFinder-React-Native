import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8a9alYK1MXes2bYuoy5uEhZP3_RExCWg",
  authDomain: "jobfinder-4f31f.firebaseapp.com",
  projectId: "jobfinder-4f31f",
  storageBucket: "jobfinder-4f31f.appspot.com",
  messagingSenderId: "42329815354",
  appId: "1:42329815354:web:50b5864578d36daac2b803",
  measurementId: "G-93BHEQR96X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db,firebaseConfig}