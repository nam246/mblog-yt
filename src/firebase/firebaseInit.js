import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwU9WNRvFYH1vgyZRBhdEGIdKxGMy2sVs",
    authDomain: "m-blogs-59b25.firebaseapp.com",
    projectId: "m-blogs-59b25",
    storageBucket: "m-blogs-59b25.appspot.com",
    messagingSenderId: "723137116463",
    appId: "1:723137116463:web:db19b7ada6ef692a4489da"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }
export default firebaseApp.firestore();