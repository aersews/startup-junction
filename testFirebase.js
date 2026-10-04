import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Test login with a dummy email and password
const testEmail = "test@example.com";
const testPassword = "Test@123";

signInWithEmailAndPassword(auth, testEmail, testPassword)
  .then((userCredential) => {
    console.log("Login successful", userCredential.user);
  })
  .catch((error) => {
    console.error("Login failed:", error.message);
  });
