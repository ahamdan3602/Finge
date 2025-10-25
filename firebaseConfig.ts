import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLMUVkxDGv0YKiRHMmuzK5IUz6r1W_znw",
  authDomain: "finge-193b7.firebaseapp.com",
  projectId: "finge-193b7",
  storageBucket: "finge-193b7.firebasestorage.app",
  messagingSenderId: "733644751897",
  appId: "1:733644751897:web:188a5445f366c24b6f9688",
  measurementId: "G-PE2G6WQV0P"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };