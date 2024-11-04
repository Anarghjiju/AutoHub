// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBpTitJd1xmtaci4AJAynI7ekD2H0D_4ww',
  authDomain: 'autohub-9caf7.firebaseapp.com',
  projectId: 'autohub-9caf7',
  storageBucket: 'autohub-9caf7.appspot.com',
  messagingSenderId: '117858770455',
  appId: '1:117858770455:web:f77e625c023f87d5258652'
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase auth and set persistence
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set to browser session.");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });

export { auth };
