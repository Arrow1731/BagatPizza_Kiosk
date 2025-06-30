import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCwj_Ls_1EVXRaglYk2HLjH0DobASmZr4",
  authDomain: "foodkioskbagat.firebaseapp.com",
  projectId: "foodkioskbagat",
  storageBucket: "foodkioskbagat.firebasestorage.app",
  messagingSenderId: "284935458465",
  appId: "1:284935458465:web:54137db6f31ed185e9eae0",
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)

// Инициализация Firestore
export const db = getFirestore(app)
