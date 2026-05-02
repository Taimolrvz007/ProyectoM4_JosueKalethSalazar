import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Importamos las instancias de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  // 1. Estados para capturar los datos de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  // 2. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando registrar a:", email);

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar Nombre y Apellido en Firestore (Colección "usuarios")
      // Usamos el UID generado por Auth como ID del documento para que estén vinculados
      await setDoc(doc(db, "usuarios", user.uid), {
        email: email,
        uid: user.uid,
        createdAt: new Date()
      });

      console.log("Usuario registrado con éxito en Auth y Firestore");
      
      // Redirigir al dashboard tras el registro exitoso
      navigate('/dashboard');

    } catch (error: any) {
      console.error("Error al registrar:", error.message);
      alert("Hubo un error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crea tu cuenta</h2>
        <p className="text-gray-500 mb-8">Únete a nuestra comunidad hoy mismo.</p>
        
        {/* Agregamos el onSubmit al formulario */}
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;