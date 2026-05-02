import React, { useEffect, useState } from 'react'; // Añadido React aquí
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, type User } from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchador de sesión activa
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    // Limpieza del escuchador al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    // Si no hay usuario, lo mandamos al login
    return <Navigate to="/login" />;
  }

  // Si hay usuario, renderizamos el componente hijo (Dashboard)
  return <>{children}</>;
};