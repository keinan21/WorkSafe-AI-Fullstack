// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwq_2Xc_xNYsE_WsLIQV0D2voLdkLq3MI",
  authDomain: "worksafe-ai-4d412.firebaseapp.com",
  projectId: "worksafe-ai-4d412",
  storageBucket: "worksafe-ai-4d412.firebasestorage.app",
  messagingSenderId: "562811445107",
  appId: "1:562811445107:web:3057c157476d4eb13daf06",
  measurementId: "G-Z9VMK8RGTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth dan provider untuk dipakai di halaman Login
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();