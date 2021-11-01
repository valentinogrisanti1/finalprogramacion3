import app from 'firebase/app'
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyD4E_rw6ItBrKA72tBw_4hRZX1PegQkabo",
    authDomain: "finalprogramacion3-2ee78.firebaseapp.com",
    projectId: "finalprogramacion3-2ee78",
    storageBucket: "finalprogramacion3-2ee78.appspot.com",
    messagingSenderId: "452936466589",
    appId: "1:452936466589:web:477fa1fde0bbda399fd474"
  };

 app.initializeApp(firebaseConfig);

 export const auth = firebase.auth();
 export const storage = app.storage();
 export const db = app.firestore();