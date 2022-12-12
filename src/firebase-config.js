import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBLzzd0Fkk_PRemB5zQMApLdsGhlE6jLeM",
    authDomain: "fe-app-v10.firebaseapp.com",
    databaseURL: "https://fe-app-v10-default-rtdb.firebaseio.com",
    projectId: "fe-app-v10",
    storageBucket: "fe-app-v10.appspot.com",
    messagingSenderId: "564957618342",
    appId: "1:564957618342:web:4349026efe1e28bd3e1467",
    measurementId: "G-J8FR48DNV7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);