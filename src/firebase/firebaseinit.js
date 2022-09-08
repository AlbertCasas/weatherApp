import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-jSaxkxhPzz1_dUtqFAsD-aQ_yhwGT8A",
    authDomain: "weatherapp-a7654.firebaseapp.com",
    projectId: "weatherapp-a7654",
    storageBucket: "weatherapp-a7654.appspot.com",
    messagingSenderId: "361492306723",
    appId: "1:361492306723:web:ccf31cda5c110b886c4a96"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();