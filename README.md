# PI-MINI-BLOG

API REST para gestión de autores y posts, desarrollada con Node.js, Express y PostgreSQL.

---

## 📌 Descripción

PI-MINI-BLOG es una API REST que permite gestionar autores y publicaciones (posts) con operaciones CRUD completas. Fue desarrollado como Proyecto Integrador con el objetivo de construir un backend funcional conectado a PostgreSQL, con validaciones, manejo de errores, testing automatizado y documentación OpenAPI.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework HTTP |
| PostgreSQL + pg | Base de datos relacional |
| Vitest + Supertest | Testing unitario e integración |
| Swagger / OpenAPI | Documentación de la API |
| Railway | Deploy en producción |

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y en ejecución

---

## 💻 Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/NadiaStarna/ProyectoM2-NadiaStarna.git
cd ProyectoM2-NadiaStarna
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`.

### 4. Crear la base de datos

Abrir el SQL Shell (psql) y ejecutar:

```sql
CREATE DATABASE miniblog;
\c miniblog
```

### 5. Ejecutar el script SQL

```bash
psql -U tu_usuario -d miniblog -f src/db/setup.sql
```

Esto creará las tablas `authors` y `posts` y cargará datos de prueba.

### 6. Iniciar el servidor

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm start
```

Servidor disponible en: `http://localhost:3000`

---

## 📁 Estructura del proyecto

PI-MINI-BLOG/ ├── coverage/ ├── docs/ │ ├── prompt1.png │ ├──
prompt2.png │ ├── prompt3.png │ ├── prompt3a.png │ ├── prompt4.png │ ├──
prompt4a.png │ └── uso-de-la-ia.md ├── node_modules/ ├── src/ │ ├──
controllers/ │ │ ├── authors-controller.js │ │ └── posts-controller.js │
├── db/ │ │ ├── config.js │ │ └── setup.sql │ ├── middleware/ │ │ └──
errorHandler.js │ ├── routes/ │ │ ├── authors-routes.js │ │ └──
posts-routes.js │ ├── services/ │ │ ├── authors-service.js │ │ └──
posts-service.js │ ├── validaciones/ │ │ ├── authors.validaciones.js │ │
└── posts.validaciones.js │ ├── yaml/ │ ├── app.js │ └── server.js ├──
test/ │ ├── authors-controller.test.js │ ├── authors.test.js │ ├──
errorHandler.test.js │ ├── posts-controller.test.js │ └── posts.test.js
├── .env ├── .env.example ├── .gitignore ├── package-lock.json ├──
package.json └── vitest.config.js

---

## 📡 Endpoints disponibles

### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/authors` | Listar todos los autores |
| GET | `/api/authors/:id` | Obtener autor por ID |
| POST | `/api/authors` | Crear un nuevo autor |
| PUT | `/api/authors/:id` | Actualizar un autor |
| DELETE | `/api/authors/:id` | Eliminar un autor |

### Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/posts` | Listar todos los posts |
| GET | `/api/posts/:id` | Obtener post por ID |
| GET | `/api/posts/author/:authorId` | Obtener posts de un autor |
| POST | `/api/posts` | Crear un nuevo post |
| PUT | `/api/posts/:id` | Actualizar un post |
| DELETE | `/api/posts/:id` | Eliminar un post |

---

## 🧪 Testing

El proyecto cuenta con **70 tests** entre tests de integración y tests unitarios con mocks.

```bash
# Correr todos los tests
npm test

# Correr tests con reporte de coverage
npm run test:coverage

# Correr tests con interfaz visual
npm run test:ui
```

### Resultados de coverage

| Archivo | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| controllers | 100% | 100% | 100% | 100% |
| middleware | 100% | 100% | 100% | 100% |
| routes | 100% | 100% | 100% | 100% |
| services | 92% | 81% | 100% | 92% |
| **Total** | **97%** | **97%** | **100%** | **97%** |

### Tipos de tests

- **Tests de integración** (`authors.test.js`, `posts.test.js`) — prueban los endpoints HTTP completos contra la base de datos real
- **Tests unitarios con mocks** (`authors-controller.test.js`, `posts-controller.test.js`, `errorHandler.test.js`) — prueban la lógica de cada función de forma aislada, sin base de datos

---

## 📘 Documentación OpenAPI

La documentación de la API está disponible en Swagger UI una vez levantado el servidor:
http://localhost:3000/api-docs

También se puede visualizar el archivo `openapi.yaml` en [Swagger Editor](https://editor.swagger.io).

---

## 🌐 Deploy

La aplicación está desplegada en Railway:

🔗 https://proyectom2-nadiastarna-production-dc94.up.railway.app

---

## 🤖 Uso de IA

Durante el desarrollo se utilizaron herramientas de inteligencia artificial (Claude y ChatGPT) como apoyo.

📄 [Ver documento completo de uso de IA](./docs/) 

---

## 👩‍💻 Desarrolladora

**Nadia Starna**  
[GitHub](https://github.com/NadiaStarna)