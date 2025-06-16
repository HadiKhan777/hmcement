// File: src/lib/firebase.ts

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIza...yourKey...",
  authDomain: "hmcement.firebaseapp.com",
  projectId: "hmcement",
  storageBucket: "hmcement.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123xyz"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
