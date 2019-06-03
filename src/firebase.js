import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwHP2HS0N29VtQ4cm5g-CkSdnoeJhsuSM",
    authDomain: "to-bring-list.firebaseapp.com",
    databaseURL: "https://to-bring-list.firebaseio.com",
    projectId: "to-bring-list",
    storageBucket: "to-bring-list.appspot.com",
    messagingSenderId: "535153509551",
    appId: "1:535153509551:web:de50e15e33537945"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;