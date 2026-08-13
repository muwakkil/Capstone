import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHpW-mmo1_OGd7Nz6PN4XnbwIkBWCbhM0",
  authDomain: "speaking-in-motifs.firebaseapp.com",
  projectId: "speaking-in-motifs",
  storageBucket: "speaking-in-motifs.firebasestorage.app",
  messagingSenderId: "347394665073",
  appId: "1:347394665073:web:ba4e28ad4c15caae3ec9d0",
  measurementId: "G-N8M71GT7BP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
