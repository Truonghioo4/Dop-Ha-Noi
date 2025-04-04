// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "foodtour-web.firebaseapp.com",
	projectId: "foodtour-web",
	storageBucket: "foodtour-web.firebasestorage.app",
	messagingSenderId: "778406786937",
	appId: "1:778406786937:web:2b65d5c6c8adf0b3e161a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
