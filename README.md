# PI-MINI-BLOG

API REST para gestión de autores y posts, desarrollada con Node.js, Express y PostgreSQL.

## Tecnologías

- Node.js
- Express
- PostgreSQL (pg)
- Vitest + Supertest
- Railway (deploy)

---

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo

---

## Instalación local

### 1. Clonar el repositorio

git clone https://github.com/NadiaStarna/ProyectoM2-NadiaStarna.git
cd PI-MINI-BLOG

### 2. Instalar dependencias

npm install

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá con tus datos:

cp .env.example .env

Editá el `.env` con tus credenciales de PostgreSQL:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=miniblog
PORT=3000

### 4. Crear la base de datos

Abrí el SQL Shell (psql) y ejecutá:

CREATE DATABASE miniblog;
\c miniblog

### 5. Ejecutar el script SQL

Pegá el contenido de `src/db/setup.sql` en el SQL Shell para crear las tablas y cargar los datos de prueba.

### 6. Iniciar el servidor

npm run dev

El servidor estará corriendo en http://localhost:3000

---

## Endpoints disponibles

### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/authors | Listar todos los autores |
| GET | /api/authors/:id | Obtener autor por ID |
| POST | /api/authors | Crear autor |
| PUT | /api/authors/:id | Actualizar autor |
| DELETE | /api/authors/:id | Eliminar autor |

### Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/posts | Listar todos los posts |
| GET | /api/posts/:id | Obtener post por ID |
| GET | /api/posts/author/:authorId | Posts de un autor con detalle |
| POST | /api/posts | Crear post |
| PUT | /api/posts/:id | Actualizar post |
| DELETE | /api/posts/:id | Eliminar post |

---

## Tests

npm test

Corre 23 tests unitarios con Vitest y Supertest cubriendo todos los endpoints.

---

## Documentación OpenAPI

El archivo `openapi.yaml` en la raíz contiene la documentación completa de la API.

Para visualizarla online:
1. Entrá a https://editor.swagger.io
2. Copiá y pegá el contenido de `openapi.yaml`

---
