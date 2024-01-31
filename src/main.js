import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7XQ04lOoczsKIITsGPzQfK5soCnuaYNY",
  authDomain: "climatechange-ghg.firebaseapp.com",
  projectId: "climatechange-ghg",
  storageBucket: "climatechange-ghg.appspot.com",
  messagingSenderId: "1089958785466",
  appId: "1:1089958785466:web:e12d490982487b05c9ed83",
  measurementId: "G-K4Z0PD317Q"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// getAnalytics(app);
createApp(App).mount('#app')
