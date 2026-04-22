# PI-MINI-BLOG

API REST para gestión de autores y posts, desarrollada con Node.js, Express y PostgreSQL.

---

## 📌 Descripción

Este proyecto consiste en una API REST que permite gestionar autores y publicaciones (posts), implementando operaciones CRUD completas.

Fue desarrollado como parte de un Proyecto Integrador con el objetivo de construir un backend funcional, conectado a una base de datos PostgreSQL, con validaciones, testing automatizado y documentación.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL (pg)
- Vitest + Supertest
- Swagger / OpenAPI
- Railway (deploy)

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

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Crear la base de datos

Abrir el SQL Shell (psql) y ejecutar:

```sql
CREATE DATABASE miniblog;
\c miniblog
```

---

### 4. Ejecutar script SQL

Ejecutar el archivo:

```
src/db/setup.sql
```

Esto creará las tablas y cargará datos de prueba.

---

### 5. Iniciar el servidor

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 📡 Endpoints disponibles

### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/authors | Listar autores |
| GET | /api/authors/:id | Obtener autor por ID |
| POST | /api/authors | Crear autor |
| PUT | /api/authors/:id | Actualizar autor |
| DELETE | /api/authors/:id | Eliminar autor |

---

### Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/posts | Listar posts |
| GET | /api/posts/:id | Obtener post por ID |
| GET | /api/posts/author/:authorId | Obtener posts de un autor |
| POST | /api/posts | Crear post |
| PUT | /api/posts/:id | Actualizar post |
| DELETE | /api/posts/:id | Eliminar post |

---

## 🧪 Tests

Ejecutar:

```bash
npm test
```

Se incluyen tests unitarios utilizando Vitest y Supertest que cubren:

- Creación de autores
- Obtención de autores
- Creación de posts
- Manejo de errores (400, 404)

---

## 📘 Documentación OpenAPI

El archivo `openapi.yaml` contiene la documentación completa de la API.

Para visualizarla:

1. Ir a https://editor.swagger.io  
2. Copiar y pegar el contenido del archivo `openapi.yaml`

---

## 🌐 Deploy

La aplicación se encuentra desplegada en Railway:

https://proyectom2-nadiastarna-production-dc94.up.railway.app

---

## 🤖 Uso de IA

Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo para:

- Implementación de controllers
- Creación de tests con Vitest y Supertest
- Resolución de errores
- Mejora de la estructura del proyecto

Todo el código fue revisado, comprendido y adaptado antes de ser utilizado.

---

## 👩‍💻 Desarrolladora

Nadia Starna