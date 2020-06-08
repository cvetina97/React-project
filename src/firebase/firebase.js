import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAK1m8-h6PQsNJJgRseeEiZhfifDgXm64w",
  authDomain: "react-task-manager-132e0.firebaseapp.com",
  databaseURL: "https://react-task-manager-132e0.firebaseio.com",
  projectId: "react-task-manager-132e0",
  storageBucket: "react-task-manager-132e0.appspot.com",
  messagingSenderId: "690362730114",
  appId: "1:690362730114:web:85a7dfcbf64e719822969b",
  measurementId: "G-PQPS1BE5L3"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;