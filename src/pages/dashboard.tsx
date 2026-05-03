import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  collection, addDoc, query, where, onSnapshot,
  updateDoc, deleteDoc, doc, orderBy
} from 'firebase/firestore';

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false); // Estado para el feedback del botón
  const navigate = useNavigate();

  // 1. Asegurar que el usuario esté cargado antes de pedir tareas
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, 'tasks'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const tasksData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTasks(tasksData);
          setLoading(false);
        }, (error) => {
          console.error("Error en tiempo real:", error);
        });

        return () => unsubscribeSnapshot();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // FUNCIÓN NUEVA: Envío de Email a través de la Vercel Function
  const handleSendEmail = async () => {
    if (tasks.length === 0) return alert("No tienes tareas para enviar.");

    setSendingEmail(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks: tasks,
          userEmail: auth.currentUser?.email,
        }),
      });

      if (response.ok) {
        alert("✅ Resumen enviado con éxito a tu correo.");
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error al enviar email:", error);
      alert("❌ No se pudo enviar el email. Revisa la consola.");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!newTaskTitle.trim() || !user) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title: newTaskTitle,
        completed: false,
        userId: user.uid,
        createdAt: Date.now()
      });
      setNewTaskTitle('');
    } catch (error) {
      alert("Error al guardar: " + error);
    }
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, { completed: !currentStatus });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleLogout = () => signOut(auth).then(() => navigate('/login'));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-lg">
          <span className="text-sm opacity-70">{auth.currentUser?.email}</span>
          <button onClick={handleLogout} className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white transition">Cerrar Sesión</button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8">Mis Tareas</h1>

        <form onSubmit={handleCreateTask} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Escribe una tarea..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded p-3 outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 px-6 rounded font-bold hover:bg-blue-500">Añadir</button>
        </form>

        <div className="space-y-3">
          {loading ? <p className="text-center opacity-50">Cargando...</p> :
            tasks.length === 0 ? <p className="text-center opacity-50">No hay tareas pendientes.</p> :
              tasks.map(task => (
                <div key={task.id} className="bg-slate-800 p-4 rounded-lg flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className={task.completed ? "line-through opacity-40" : ""}>{task.title}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))
          }
        </div>

        {/* BOTÓN DE RESUMEN POR EMAIL (HITO 7) */}
        {!loading && tasks.length > 0 && (
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className="w-full mt-8 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingEmail ? "Enviando..." : "📧 Enviar Resumen por Email"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;