import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP2dCHbYOsT8dHpuATzGf89FXoriynREM",
    authDomain: "pulsetick-1ee15.firebaseapp.com",
    projectId: "pulsetick-1ee15",
    storageBucket: "pulsetick-1ee15.firebasestorage.app",
    messagingSenderId: "153032759852",
    appId: "1:153032759852:web:6913c219e96469b0884f89",
    measurementId: "G-QBCSZVLPGE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);