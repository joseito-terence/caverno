import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDA4zvYyT4b1LAjI-bsXDUrMKz-jP-sJaQ",
  authDomain: "caverno-app.firebaseapp.com",
  projectId: "caverno-app",
  storageBucket: "caverno-app.firebasestorage.app",
  messagingSenderId: "448227223773",
  appId: "1:448227223773:web:d2cafc9da5e9cf0aad5334",
  measurementId: "G-T9TW4DKQMN"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) 
