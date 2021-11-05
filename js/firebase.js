// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyD0N0oPssQCnKsljtFGVPfZIq7dDu1P6_Q",
authDomain: "fist-website-a8303.firebaseapp.com",
projectId: "fist-website-a8303",
storageBucket: "fist-website-a8303.appspot.com",
messagingSenderId: "662798475630",
appId: "1:662798475630:web:831d832fdfbe1a50e7a17f",
measurementId: "G-RLX26299FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
