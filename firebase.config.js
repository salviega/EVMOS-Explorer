import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUlbJt-ZguGf1DUHF8QWpZBSdK0th48CA",
  authDomain: "evmos-explore.firebaseapp.com",
  projectId: "evmos-explore",
  storageBucket: "evmos-explore.appspot.com",
  messagingSenderId: "1017041763657",
  appId: "1:1017041763657:web:8a4fec801872d6ce80ee98",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
