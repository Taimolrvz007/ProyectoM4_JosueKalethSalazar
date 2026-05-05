import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate que aquí exportas también 'googleProvider'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 
import { useNavigate, Link } from 'react-router-dom';

// Si no lo exportaste en firebaseConfig, puedes crearlo aquí momentáneamente:
const googleProvider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 1. Lógica para Login con Email (Ya la tenías)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      alert("Credenciales incorrectas");
    }
  };

  // 2. NUEVA: Lógica para Login con Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard'); // Redirige al éxito
    } catch (error: any) {
      console.error("Error con Google:", error.message);
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

      {/* --- DIVISOR VISUAL --- */}
      <div style={{ margin: '20px 0', color: 'var(--text-muted)' }}> o </div>

      {/* --- BOTÓN DE GOOGLE --- */}
      <button 
        onClick={handleGoogleLogin} 
        type="button" 
        className="btn-google" 
        style={{ backgroundColor: '#ffffff', color: '#757575', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google" 
          style={{ width: '18px', marginRight: '10px' }} 
        />
        Continuar con Google
      </button>

      <div style={{ marginTop: '20px' }}>
        <span style={{ color: 'var(--text-muted)' }}>¿No tienes cuenta? </span>
        <Link to="/register" className="link-alt">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;