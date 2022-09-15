import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "weatherapp-a7654",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGIG_SENDER_ID,
    appId: process.env.APP_ID
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();