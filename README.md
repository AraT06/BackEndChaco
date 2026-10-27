# API backend

API REST en Express para las tablas PostgreSQL `usuarios` y `productos`.

## Configuración

Requiere Node.js y Docker. La configuración incluida levanta PostgreSQL y
ejecuta [`database/schema.sql`](./database/schema.sql) automáticamente la
primera vez que se crea el volumen. Copia `.env.example` a `.env` si todavía no
existe y ajusta sus valores. El archivo `.env` real está excluido del control de
versiones.

| Variable | Predeterminado | Descripción |
| --- | --- | --- |
| `DB_HOST` | `127.0.0.1` | Host de PostgreSQL |
| `DB_PORT` | `5432` | Puerto de PostgreSQL |
| `DB_USER` | `postgres` | Usuario de PostgreSQL |
| `DB_PASSWORD` | — | Contraseña de PostgreSQL |
| `DB_NAME` | — | Nombre obligatorio de la base de datos |
| `HOST` | `127.0.0.1` | Interfaz donde escucha la API |
| `PORT` | `3000` | Puerto HTTP |

Instala dependencias con `npm install`, levanta la base con `docker compose up -d`
e inicia la API con `npm start` (o `npm run dev` durante el desarrollo). La
aplicación carga `.env` desde la raíz y comprueba la conexión PostgreSQL antes
de abrir el puerto. Para detener la base usa `docker compose down`; agrega `-v`
solo si también quieres eliminar todos los datos.

## Rutas

Todas las rutas usan JSON. Las rutas de usuarios no devuelven la contraseña;
las contraseñas recibidas se guardan con hash bcrypt.

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba el estado del servidor |
| `GET` | `/api/usuarios` | Lista usuarios |
| `GET` | `/api/usuarios/:id` | Obtiene un usuario |
| `POST` | `/api/usuarios` | Crea usuario: `{ "nombre", "email", "contraseña" }` |
| `POST` | `/api/usuarios/login` | Valida credenciales: `{ "email", "contraseña" }` |
| `PUT` | `/api/usuarios/:id` | Actualiza campos enviados del usuario |
| `DELETE` | `/api/usuarios/:id` | Elimina usuario |
| `GET` | `/api/productos` | Lista productos |
| `GET` | `/api/productos/:id` | Obtiene un producto |
| `POST` | `/api/productos` | Crea producto con `precio` obligatorio |
| `PUT` | `/api/productos/:id` | Actualiza campos enviados del producto |
| `DELETE` | `/api/productos/:id` | Elimina producto |
| `GET` | `/api/hitos` | Lista los hitos en orden cronológico |
| `GET` | `/api/hitos/:identifier` | Obtiene un hito por id o código |
| `POST` | `/api/hitos` | Crea un hito |
| `PATCH` | `/api/hitos/:identifier` | Actualiza los campos enviados de un hito |
| `DELETE` | `/api/hitos/:identifier` | Elimina un hito |
| `POST` | `/api/chatbot` | Consulta al asistente multimedia de la Guerra del Chaco: `{ "prompt": "..." }` |
| `POST` | `/ollama-prompt` | Alias compatible con el endpoint anterior del chatbot |

El login responde `200` con los datos públicos del usuario si las credenciales
son correctas, `401` si no coinciden y `400` si faltan campos o no son válidos.
No devuelve la contraseña ni emite un token de sesión.

El chatbot requiere Ollama disponible en `OLLAMA_URL` (predeterminado
`http://127.0.0.1:11434`) y usa el modelo `OLLAMA_MODEL` (predeterminado
`gemma3`). El endpoint acepta prompts de hasta 4000 caracteres y responde
`{ "response": "..." }`. El asistente está orientado a la historia y al contenido
educativo multimedia de la Guerra del Chaco entre Bolivia y Paraguay.
