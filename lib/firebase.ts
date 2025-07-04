import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCwj_Ls_1EVXRaglYk2HLjH0DobASmZr4",
  authDomain: "foodkioskbagat.firebaseapp.com",
  projectId: "foodkioskbagat",
  storageBucket: "foodkioskbagat.appspot.com", // ✅ TO‘G‘RI
  messagingSenderId: "284935458465",
  appId: "1:284935458465:web:54137db6f31ed185e9eae0",
};

const app = initializeApp(firebaseConfig);

// 🔥 Firestore va 🔼 Storage ni eksport qilamiz
export const db = getFirestore(app);
export const storage = getStorage(app);