import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLMUvkxDGv0YKiRHMmuzK5IUz6riW_znw",
  authDomain: "finge-193b7.firebaseapp.com",
  projectId: "finge-193b7",
  storageBucket: "finge-193b7.firebasestorage.app",
  messagingSenderId: "733644751897",
  appId: "1:733644751897:web:ca07198849e771626f9688",
  measurementId: "G-RBVYVFN0M6",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Provider
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

microsoftProvider.addScope("profile");
microsoftProvider.addScope("email");

export { app, auth, googleProvider, microsoftProvider };
