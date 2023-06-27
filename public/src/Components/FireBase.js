import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAXFO2yiMdMjHCiBFwhzImWf6LJorzp7Zg",
    authDomain: "apexitacademy-bcsmedia.firebaseapp.com",
    projectId: "apexitacademy-bcsmedia",
    storageBucket: "apexitacademy-bcsmedia.appspot.com",
    messagingSenderId: "433524536824",
    appId: "1:433524536824:web:5bbafefa52e7c10bc5920d",
    measurementId: "G-Y46YE84TYC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);