import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAc-pp7Vz512ebnxjL8JhCgRJ0_JuacvWQ",
  authDomain: "resume-analyzer-ch.firebaseapp.com",
  projectId: "resume-analyzer-ch",
  storageBucket: "resume-analyzer-ch.firebasestorage.app",
  messagingSenderId: "880563766543",
  appId: "1:880563766543:web:ff4da647cfb4eea5b8ea7a",
  measurementId: "G-Y7J218H1L6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);