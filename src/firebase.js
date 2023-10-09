import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';


// import firebase from 'firebase/app';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1GWzS5WxGrUm6aLlXR1CaB9mBBvmj81E',
  authDomain: 'e-learning-29981.firebaseapp.com',
  databaseURL: 'https://e-learning-29981-default-rtdb.firebaseio.com/',
  projectId: 'e-learning-29981',
  storageBucket: 'e-learning-29981.appspot.com',
  messagingSenderId: '322312988738',
  appId: '1:322312988738:web:a29e2c5683d35f7459e5db',
};

// firebase.initializeApp(firebaseConfig);

// export const database = firebase.database();

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth(); // Export auth
export const database = app.database(); 
export const storage = firebase.storage();
export default app;
