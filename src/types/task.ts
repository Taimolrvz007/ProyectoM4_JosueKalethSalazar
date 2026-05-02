export interface Task {
  id?: string;          // Generado automáticamente por Firestore
  title: string;        // Título de la tarea
  description: string;  // Descripción detallada
  completed: boolean;   // Estado de la tarea
  userId: string;       // El UID del dueño (para cumplir la seguridad del Hito 5)
  createdAt: number;    // Fecha de creación en formato timestamp
}