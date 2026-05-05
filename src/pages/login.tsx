import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Tu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-primary">Iniciar Sesión</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <span style={{ color: 'var(--text-muted)' }}>¿No tienes cuenta? </span>
        <Link to="/register" className="link-alt">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;