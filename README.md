# 📝 Task Manager Pro - Módulo 4

Esta aplicación es un gestor de tareas inteligente que combina **React** para la interfaz, **Firebase** para la persistencia de datos y **AWS SES** para el envío de notificaciones por correo electrónico mediante Vercel Functions.

---

## 🛠️ Instalación y Configuración

Si deseas clonar este repositorio y ejecutarlo en tu entorno local o desplegarlo en tu propio Vercel, sigue estos pasos:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Taimolrvz007/ProyectoM4_JosueKalethSalazar.git
cd ProyectoM4_JosueKalethSalazar
```

### 2. Instalar Dependencias

Este proyecto utiliza paquetes específicos para la comunicación con AWS y la gestión de la interfaz. Ejecuta:

```bash
npm install
```

Dependencias clave instaladas:

- `@aws-sdk/client-ses`: Para conectar con el servicio de correos de Amazon.
- `firebase`: Para la base de datos y autenticación.
- `lucide-react`: Para la iconografía de la app.
- `typescript`: Para el tipado estático del proyecto.

### 3. Variables de Entorno (`.env`)

Crea un archivo `.env.local` en la raíz y añade tus credenciales (no las compartas):

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio
VITE_FIREBASE_PROJECT_ID=tu_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Estas se configuran directamente en el panel de Vercel para la API
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-2
```

---

## 🤖 Guía de Prompts (QA de Desarrollo)

Durante la creación de este proyecto, se utilizaron técnicas de Prompt Engineering para resolver bloqueos técnicos. Aquí los más importantes:

### Prompt 1: Error 500 en Vercel al enviar email

- **Pregunta:** "Tengo un error 500 en Vercel al intentar enviar el email, el log dice: `MessageRejected: Email address is not verified`."
- **Respuesta:** El error indica que AWS SES está en modo Sandbox. Para solucionarlo, debes entrar a la consola de AWS SES en la región correcta (`us-east-2`), ir a "Verified Identities" y validar manualmente tanto el correo remitente como el destinatario.

### Prompt 2: Vite no reconoce `process.env` en `/api`

- **Pregunta:** "Vite no reconoce `process.env` en mi carpeta `/api` y el despliegue falla por TypeScript."
- **Respuesta:** Vercel Functions corren en un entorno Node.js, mientras que Vite corre en el navegador. Debes ajustar el `tsconfig.json` para incluir la carpeta `/api`, configurar `moduleResolution: "Node"` e instalar `@types/node` para que TypeScript reconozca las variables de entorno del servidor.

### Prompt 3: Enviar datos desde React a la función serverless

- **Pregunta:** "¿Cómo puedo hacer que mi función serverless reciba los datos de las tareas desde React?"
- **Respuesta:** Debes usar el método `POST` en tu fetch hacia `/api/send-email`. En el cuerpo de la petición (`body`), envía un JSON con el email del usuario y el array de tareas. Luego, en la función de Vercel, parsea ese cuerpo para construir el mensaje que SES enviará.

---

## 🏗️ Estructura del Proyecto

- `/src`: Código fuente de la aplicación React (Frontend).
- `/api`: Funciones Serverless de Vercel (Backend/Node.js).
- `tsconfig.json`: Configuración de compilación unificada para Front y Back.
- `vercel.json`: (Opcional) Configuración específica de rutas para el despliegue.

---

## 🚀 Despliegue

1. Sube tu código a GitHub.
2. Conecta el repositorio con Vercel.
3. **IMPORTANTE:** Configura las variables de entorno de AWS en el panel de Vercel (`Settings > Environment Variables`) antes de desplegar.

---

## 👤 Autor

**Programador:** Josué Kaleth Salazar Valderrama

- **GitHub:** [Taimolrvz007](https://github.com/Taimolrvz007)

---

## 🔗 Enlaces del Proyecto

- **Repositorio en GitHub:** [ProyectoM4_JosueKalethSalazar](https://github.com/Taimolrvz007/ProyectoM4_JosueKalethSalazar.git)
- **Aplicación Desplegada (Vercel):** [proyecto-m4-josue-kaleth-salazar.vercel.app](https://proyecto-m4-josue-kaleth-salazar.vercel.app/)