// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBpTitJd1xmtaci4AJAynI7ekD2H0D_4ww',
  authDomain: 'autohub-9caf7.firebaseapp.com',
  projectId: 'autohub-9caf7',
  storageBucket: 'autohub-9caf7.firebasestorage.app',
  messagingSenderId: '117858770455',
  appId: '1:117858770455:web:f77e625c023f87d5258652'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };
