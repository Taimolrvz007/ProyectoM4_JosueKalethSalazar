import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  collection, addDoc, query, where, onSnapshot,
  updateDoc, deleteDoc, doc, orderBy
} from 'firebase/firestore';
// @ts-ignore
import styles from './dashboard-style.module.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);
  const navigate = useNavigate();

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
      alert("❌ No se pudo enviar el email.");
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
    <div className={styles.container}>
      <div className={styles.content}>

        {/* Header con información de usuario */}
        <nav className={styles.nav}>
          <span className={styles.userEmail}>{auth.currentUser?.email}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>Cerrar Sesión</button>
        </nav>

        <h1 className={styles.title}>Mis Tareas</h1>

        {/* Formulario de creación */}
        <form onSubmit={handleCreateTask} className={styles.taskForm}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="¿Qué planes tienes?"
            className={styles.input}
          />
          <button type="submit" className={styles.addBtn}>Añadir</button>
        </form>

        {/* Listado de tareas */}
        <div className={styles.taskList}>
          {loading ? (
            <p className={styles.loadingText}>Cargando tus pendientes...</p>
          ) : tasks.length === 0 ? (
            <p className={styles.loadingText}>No tienes tareas registradas.</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={styles.taskItem}>
                <div className={styles.taskMain}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                    className={styles.checkbox}
                  />
                  <span className={task.completed ? styles.completedText : ""}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className={styles.deleteBtn}
                  title="Eliminar tarea"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Acción de Email */}
        {!loading && tasks.length > 0 && (
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            className={styles.emailBtn}
          >
            {sendingEmail ? "Enviando..." : "📧 Enviar Resumen por Email"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;