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
    <div className="login-container">
  <h1 className="app-title">Task Pro</h1>
  <p style={{ color: 'var(--text-muted)' }}>Bienvenido de nuevo</p>
  
  <form>
    <input type="email" placeholder="Tu Email" />
    <input type="password" placeholder="Tu Contraseña" />
    <button className="btn-primary">Iniciar Sesión</button>
  </form>
  
  <div style={{ marginTop: '20px' }}>
    <span style={{ color: 'var(--text-muted)' }}>¿No tienes cuenta? </span>
    <a href="/register" className="link-alt">Regístrate</a>
  </div>
</div>
  );
};

export default Login;