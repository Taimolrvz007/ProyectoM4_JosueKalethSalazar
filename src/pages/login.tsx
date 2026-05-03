import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  // 1. Estados para capturar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // 2. Función para procesar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // <--- EVITA QUE LA PÁGINA SE RECARGUE

    try {
      // Intentar loguear en Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sesión iniciada con éxito");

      // Si todo sale bien, vamos al dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Credenciales incorrectas o usuario no encontrado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Bienvenido</h2>

        {/* 3. Conectamos el formulario a la función handleLogin */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // <--- Guardamos el email
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // <--- Guardamos la contraseña
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?
          {/* Usamos Link de react-router-dom para no recargar la página al navegar */}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;