# 🚀 Task Manager Pro - Proyecto Integrador M4

Este es un administrador de tareas (To-Do List) moderno desarrollado con **React**, **TypeScript** y **Firebase**. El proyecto implementa un sistema multi-usuario completo, permitiendo que cada usuario gestione su propia lista de tareas de forma privada y segura.

## 📝 Descripción del Proyecto

La aplicación permite a los usuarios registrarse e iniciar sesión para gestionar sus tareas diarias. Gracias a la integración con Firebase Firestore, los datos se sincronizan en tiempo real, y mediante las Security Rules, se garantiza que ningún usuario pueda ver o editar las tareas de otra persona.

- **Repositorio:** `ProyectoM4_JosueKalethSalazar`
- **GitHub:** [https://github.com/Taimolrvz007/ProyectoM4_JosueKalethSalazar](https://github.com/Taimolrvz007/ProyectoM4_JosueKalethSalazar)
- **Demo en vivo:** [https://proyecto-m4-josue-kaleth-salazar.vercel.app/login](https://proyecto-m4-josue-kaleth-salazar.vercel.app/login)

---

## ⚙️ Guía de Instalación y Configuración

Sigue estos pasos para clonar el proyecto y ejecutarlo en tu máquina local:

### 1. Clonar el repositorio

Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/Taimolrvz007/ProyectoM4_JosueKalethSalazar.git
cd ProyectoM4_JosueKalethSalazar
```

### 2. Instalar dependencias

Asegúrate de tener instalado Node.js y ejecuta:

```bash
npm install
```

### 3. Configurar Firebase

Para que el proyecto funcione, debes crear un archivo llamado `.env` en la raíz del proyecto y pegar tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

### 4. Ejecutar la aplicación

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

La app se abrirá en `http://localhost:5173`.

---

## 🤖 Uso de IA (Gemini)

Durante el desarrollo, se utilizó a Gemini como mentor técnico para optimizar el flujo de trabajo:

### 1. Configuración de Navegación (SPA)

- **Pregunta:** "¿Cómo puedo hacer que mi código sea una Single Page Application (SPA) con `react-router-dom`?"
- **Respuesta:** Gemini guió la instalación de la librería y la configuración del `BrowserRouter` en el `main.tsx`, explicando cómo definir rutas para `/login`, `/register` y el `/dashboard`.

### 2. Integración de Firebase Auth

- **Pregunta:** "¿Cómo conecto mis formularios de React con la autenticación de Firebase?"
- **Respuesta:** Se implementó la lógica de `createUserWithEmailAndPassword` y `signInWithEmailAndPassword`, asegurando el manejo de promesas para capturar errores de acceso.

### 3. Resolución de errores de compilación

- **Pregunta:** "Tengo un error de variables no utilizadas en mi componente de registro que impide el despliegue en Vercel. ¿Cómo lo soluciono?"
- **Respuesta:** Gemini sugirió limpiar el estado de React y eliminar variables huérfanas, permitiendo que TypeScript validara el código para la compilación final.

### 4. Error de Rutas en Vercel (404)

- **Pregunta:** "Al navegar a `/login` en Vercel recibo un error 404, pero en local funciona. ¿Por qué?"
- **Respuesta:** Se identificó que las SPAs necesitan un archivo `vercel.json` para redirigir las peticiones al `index.html`. La IA proporcionó la configuración necesaria para solucionar el problema de enrutamiento en producción.

### 5. Seguridad de Datos y Multi-usuario

- **Pregunta:** "¿Cómo evito que un usuario vea las tareas de otro?"
- **Respuesta:** Se configuraron `Security Rules` en Firestore para comparar el `request.auth.uid` con el campo `userId` de cada tarea, garantizando privacidad total entre usuarios.

### 6. Tipado con TypeScript

- **Pregunta:** "¿Cómo defino una interfaz para mis tareas que incluya el ID de Firestore?"
- **Respuesta:** Se estructuró la interfaz `Task` con tipos estrictos, mejorando la robustez del código y evitando errores de "undefined" al renderizar la lista.

### 7. Actualizaciones en Tiempo Real

- **Pregunta:** "¿Cómo hago para que la lista de tareas se actualice automáticamente sin refrescar la página?"
- **Respuesta:** Gemini recomendó el uso de `onSnapshot` de Firestore, lo que permitió una experiencia de usuario dinámica y fluida.

### 8. Lógica de Redirección Protegida

- **Pregunta:** "¿Cómo evito que alguien entre al Dashboard si no ha iniciado sesión?"
- **Respuesta:** Se implementó un observador de estado con `onAuthStateChanged` y el hook `useNavigate` para proteger las rutas privadas.

### 9. Gestión de Variables de Entorno

- **Pregunta:** "¿Cómo uso variables `.env` en Vite para que Firebase no exponga mis llaves en el código fuente de GitHub?"
- **Respuesta:** Se explicó el uso del prefijo `VITE_` y cómo configurar estas variables en el panel de control de Vercel para el despliegue seguro.

### 10. Limpieza de Listeners (Performance)

- **Pregunta:** "¿Por qué es importante el 'return' dentro de un `useEffect` con Firebase?"
- **Respuesta:** Se enseñó a retornar la función de desuscripción de Firestore para evitar fugas de memoria y procesos innecesarios en el navegador.

### 11. Traducción de Errores de Firebase

- **Pregunta:** "Firebase me da errores en inglés como `auth/invalid-credential`. ¿Cómo los muestro en español?"
- **Respuesta:** Se creó un mapeo de errores para mostrar mensajes amigables como "Correo o contraseña incorrectos" en la interfaz de usuario.

---

## 🛠️ Tecnologías

- React 18 & Vite
- TypeScript
- Firebase (Auth & Firestore)
- Tailwind CSS
- Vercel (Hosting)