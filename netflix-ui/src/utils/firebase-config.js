
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDIERMhrvc1hyvJMQVUmqvedq12yTSJqPs",
  authDomain: "react-netflix-clone-46bd8.firebaseapp.com",
  projectId: "react-netflix-clone-46bd8",
  storageBucket: "react-netflix-clone-46bd8.appspot.com",
  messagingSenderId: "662134155257",
  appId: "1:662134155257:web:c93eff183c4ed7b444bf28",
  measurementId: "G-XSMR9J227R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
