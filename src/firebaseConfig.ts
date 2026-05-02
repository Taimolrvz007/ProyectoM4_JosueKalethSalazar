import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Corregido el espacio
import { getFirestore } from "firebase/firestore"; // Importamos Firestore


const firebaseConfig = {
  apiKey: "AIzaSyAR6BlCrGKxqAV2Z810LRdgBGrpThD7Vgc",
  authDomain: "auth-m4.firebaseapp.com",
  projectId: "auth-m4",
  storageBucket: "auth-m4.firebasestorage.app",
  messagingSenderId: "885118951692",
  appId: "1:885118951692:web:9749178784260476ad6929"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos las instancias para usarlas en tus páginas
export const auth = getAuth(app);
export const db = getFirestore(app); 

export default app;