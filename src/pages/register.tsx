import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // --- FUNCIÓN PARA GUARDAR EN FIRESTORE (REUTILIZABLE) ---
  const saveUserInFirestore = async (user: any) => {
    const userRef = doc(db, "usuarios", user.uid);
    // Verificamos si ya existe para no sobreescribir datos viejos si solo está iniciando sesión
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || "Usuario Nuevo",
        photoURL: user.photoURL || "",
        createdAt: new Date()
      });
    }
  };

  // 1. REGISTRO CON EMAIL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserInFirestore(userCredential.user);
      navigate('/dashboard');
    } catch (error: any) {
      alert("Error al registrar: " + error.message);
    }
  };

  // 2. REGISTRO/LOGIN CON GOOGLE
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserInFirestore(result.user);
      console.log("Registro con Google exitoso");
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error con Google:", error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crea tu cuenta</h2>
        <p className="text-gray-500 mb-8">Únete a nuestra comunidad hoy mismo.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg bg-gray-50 outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="btn-primary"
          >
            Registrarse
          </button>
        </form>

        {/* --- SECCIÓN DE GOOGLE --- */}
        <div className="mt-6">
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
          onClick={handleGoogleRegister} 
        type="button" 
        className="btn-google" 
        style={{ backgroundColor: '#ffffff', color: '#757575', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
      >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              style={{ width: '18px', marginRight: '10px' }} 
            />
          </button>
          <div style={{ marginTop: '20px' }}>
            <span style={{ color: 'var(--text-muted)' }}>¿Ya tienes cuenta? </span>
            <Link to="/login" className="link-alt">Inicia Sesión</Link>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Register;