# Guia de trabajo del equipo

## Estado actual

La rama de integracion es `feature/hitos-crud`. Contiene:

- API REST en Node.js y Express.
- PostgreSQL 17 ejecutado con Docker Compose.
- Tabla `hitos` con siete registros iniciales.
- CRUD de hitos con validaciones.
- Trece pruebas automatizadas.
- Chatbot existente, separado del CRUD de hitos.

Swagger no forma parte de esta etapa. La coleccion y las evidencias en Bruno se
prepararan al final, cuando los cambios del equipo ya esten integrados.

## Instalacion local

```bash
git clone git@github.com:AraT06/BackEndChaco.git
cd BackEndChaco
git switch feature/hitos-crud
npm ci
```

Mientras el Pull Request al repositorio original siga abierto, el equipo
trabajara desde `AraT06/BackEndChaco`. Cada integrante necesita acceso de
colaborador en ese fork para poder subir su rama. Cuando el Pull Request sea
fusionado, el equipo podra volver a usar el repositorio original como fuente.

Crear un archivo `.env` a partir de `.env.example`. Luego ejecutar:

```bash
docker compose up -d
npm test
npm start
```

La API queda disponible en `http://localhost:3000`. Para comprobar PostgreSQL:

```bash
docker compose ps
docker compose exec postgres psql -U postgres -d chaco -c "SELECT * FROM hitos ORDER BY orden;"
```

## Tabla hitos

| Columna | Tipo | Uso |
| --- | --- | --- |
| `id` | `INTEGER` | Identificador automatico |
| `codigo_linea_tiempo` | `VARCHAR(50)` | Codigo unico usado en las URL |
| `descripcion` | `VARCHAR(255)` | Resumen corto del acontecimiento |
| `texto` | `TEXT` | Contenido historico completo |
| `foto` | `VARCHAR(255)` | Ruta de la imagen en el frontend |
| `video` | `VARCHAR(255)` | Ruta del video en el frontend |
| `voz` | `VARCHAR(255)` | Ruta de la narracion en el frontend |
| `orden` | `SMALLINT` | Posicion cronologica unica |
| `fecha_creacion` | `TIMESTAMPTZ` | Fecha de creacion del registro |

Los archivos multimedia se almacenaran en `public/imgs`, `public/videos` y
`public/voz` dentro del frontend. PostgreSQL almacena solamente sus rutas.

## Endpoints de hitos

| Accion | Metodo y ruta |
| --- | --- |
| Listar hitos | `GET /api/hitos` |
| Consultar por id o codigo | `GET /api/hitos/:identifier` |
| Crear un hito | `POST /api/hitos` |
| Actualizar campos de un hito | `PATCH /api/hitos/:identifier` |
| Eliminar un hito | `DELETE /api/hitos/:identifier` |

Ejemplo para `POST /api/hitos`:

```json
{
  "codigo_linea_tiempo": "hito-prueba",
  "descripcion": "Hito de prueba",
  "texto": "Contenido completo del hito.",
  "foto": "/imgs/prueba.jpg",
  "video": "/videos/prueba.mp4",
  "voz": "/voz/prueba.mp3",
  "orden": 8
}
```

Ejemplo para `PATCH /api/hitos/hito-prueba`:

```json
{
  "descripcion": "Descripcion actualizada"
}
```

## Distribucion de tareas

Cada integrante debe realizar una contribucion verificable en su propia rama.
Las tareas pueden ajustarse con autorizacion de la coordinadora.

| Responsable | Rama individual | Tarea | Estado |
| --- | --- | --- | --- |
| Aracely Michel Tito Barrancos | `feature/hitos-crud` | Configuracion base, PostgreSQL y coordinacion | Completado |
| Mateo Santiago Reyes Montaño | `task/mateo-controllers` | Revisar validaciones del controlador y ampliar sus pruebas | Pendiente |
| Sebastian Aldo Rocha Veraga | `task/sebastian-models` | Revisar y probar las consultas del modelo de hitos | Pendiente |
| Alcides Rojas Garcia | `task/alcides-routes` | Revisar las rutas y probar sus codigos de respuesta | Pendiente |
| Carlos Leandro Rosales Quiroga | `task/carlos-cors` | Configurar CORS para el frontend y agregar su prueba | Pendiente |
| Brayan Ruiz Vegamonte | `task/brayan-db-tests` | Preparar una prueba de integracion del CRUD con PostgreSQL | Pendiente |
| Ruth Serrano Nina | `task/ruth-database-docs` | Revisar restricciones y documentar esquema y seed | Pendiente |
| Alvaro Roberto Rosas Lobo | Por definir | Preparar documentacion y evidencias en Bruno al final | No iniciar aun |

## Flujo de ramas

No se deben hacer commits directamente en `master` ni en
`feature/hitos-crud`. Cada integrante debe ejecutar:

```bash
git switch feature/hitos-crud
git pull --ff-only origin feature/hitos-crud
git switch -c task/nombre-tarea
```

Al terminar:

```bash
npm test
git status
git add archivos-de-la-tarea
git commit -m "tipo: descripcion breve"
git push -u origin task/nombre-tarea
```

Despues debe abrir un Pull Request desde su rama hacia `feature/hitos-crud`.
La coordinadora revisara las pruebas y los archivos antes de fusionarlo.

Tipos de commit permitidos:

- `feat`: funcionalidad nueva.
- `fix`: correccion de un defecto.
- `test`: pruebas nuevas o mejoradas.
- `docs`: documentacion.
- `chore`: mantenimiento sin cambio funcional.

## Criterios para aceptar una tarea

- La rama parte de la version mas reciente de `feature/hitos-crud`.
- El cambio corresponde solamente a la tarea asignada.
- `npm test` termina correctamente.
- No se suben `.env`, `node_modules` ni contraseñas personales.
- El Pull Request explica que cambio y como se verifico.
- No se eliminan cambios de otros integrantes.

## Instruccion sugerida para la IA

```text
Lee docs/TRABAJO-EQUIPO.md. Mi tarea es [nombre de la tarea].
Revisa primero el codigo existente y trabaja unicamente en los archivos
relacionados con mi tarea. Ejecuta las pruebas correspondientes. No hagas
commit ni push hasta mostrarme los cambios y los resultados.
```
