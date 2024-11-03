import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-QUbSl3IOqUwStzSytJEnnhGiKgwNBQ8",
  authDomain: "app-ingresso-cinema.firebaseapp.com",
  databaseURL: "https://app-ingresso-cinema-default-rtdb.firebaseio.com",
  projectId: "app-ingresso-cinema",
  storageBucket: "app-ingresso-cinema.firebasestorage.app",
  messagingSenderId: "619666991181",
  appId: "1:619666991181:web:001f3534d2a26b1aaf1404",
  measurementId: "G-5K6S2DW2LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: email,
        password: password
    });
  }