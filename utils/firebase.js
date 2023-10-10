// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdribliUTinxG5SmI5CdP3K5WmIzjuEvQ",
  authDomain: "project1-783d7.firebaseapp.com",
  projectId: "project1-783d7",
  storageBucket: "project1-783d7.appspot.com",
  messagingSenderId: "994676118440",
  appId: "1:994676118440:web:2509d85ebd4f0b2c63039d",
  measurementId: "G-R7SCHTTRCK"
};

let app;
let analytics;

if (typeof window !== 'undefined') {
  // Initialize Firebase only on the client-side
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export default { app, analytics };
