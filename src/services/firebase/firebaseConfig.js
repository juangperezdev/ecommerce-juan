import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyD-xEJW6TC3ivGdOQAUMO7R0qXgP6ZpoDw",
  authDomain: "ecommerce-coder-e8690.firebaseapp.com",
  projectId: "ecommerce-coder-e8690",
  storageBucket: "ecommerce-coder-e8690.appspot.com",
  messagingSenderId: "219888551732",
  appId: "1:219888551732:web:f67fe9b0df7bc76e420761",
  measurementId: "G-8L2622XJ4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)