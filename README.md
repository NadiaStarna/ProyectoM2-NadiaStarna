# MiniBlog M2

## Descripción

MiniBlog M2 es una API REST desarrollada con Node.js, Express y PostgreSQL que permite gestionar autores y publicaciones.
La aplicación permite crear, consultar, actualizar y eliminar autores y posts, manteniendo una relación entre ambos.

Cada post pertenece a un autor, y es posible consultar los posts de un autor específico.

---

## Estructura del Proyecto

```
miniblogm2/
│
├── controllers/
│   ├── authorsController.js
│   └── postsController.js
│
├── routes/
│   ├── authors-routes.js
│   └── posts-routes.js
│
├── db/
│   ├── database.js
│   └── setup.sql
│
├── middleware/
│   └── errorHandler.js
│
├── test/
│   ├── authors.test.js
│   └── posts.test.js
│
├── .env
├── .gitignore
├── app.js
├── babel.config.json
├── openapi.yaml
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 📄 Descripción de Carpetas y Archivos

**controllers/**  
Contiene la lógica de negocio de la aplicación. Aquí se manejan las operaciones relacionadas con autores y publicaciones.

**routes/**  
Define las rutas de la API y conecta cada endpoint con su controller correspondiente.

**db/**  
Contiene la configuración de la base de datos y el script SQL para crear las tablas necesarias.

**middleware/**  
Incluye middlewares personalizados, como el manejo centralizado de errores.

**test/**  
Contiene los tests automatizados para verificar el correcto funcionamiento de los endpoints.

**.env**  
Archivo para guardar variables de entorno como credenciales de base de datos.

**.gitignore**  
Indica qué archivos o carpetas Git debe ignorar al subir el proyecto.

**app.js**  
Configura la aplicación Express, middlewares y rutas.

**server.js**  
Archivo encargado de iniciar el servidor.

**babel.config.json**  
Configuración de Babel para compatibilidad de JavaScript.

**openapi.yaml**  
Documentación de la API utilizando el estándar OpenAPI.

**package.json**  
Archivo que contiene las dependencias del proyecto y los scripts disponibles.

**package-lock.json**  
Archivo generado automáticamente por npm que asegura versiones exactas de las dependencias.

**README.md**  
Documentación principal del proyecto.

---

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* Jest / Supertest (tests)
* Railway (deploy)
* OpenAPI (documentación)

---

## Instalación

Clonar el repositorio:

```
git clone https://github.com/NadiaStarna/ProyectoM2-NadiaStarna.git
```

Entrar en la carpeta del proyecto:

```
cd miniblogm2
```

Instalar dependencias:

```
npm install
```

---

## Configuración de la base de datos

El proyecto utiliza PostgreSQL.

Crear la base de datos y ejecutar el script:

```
db/setup.sql
```

Este script crea las tablas *authors* y *posts*, y establece la relación entre ellas.

"Crear un archivo .env basado en el ejemplo .env.example y completar con tus datos de conexión a PostgreSQL."

## Ejecutar el Servidor

Modo desarrollo:

```
npm run dev
```

Modo normal:

```
npm start
```

El servidor se ejecuta por defecto en:

```
http://localhost:3000
```

---

## Endpoints principales

### Authors

GET /authors
Obtiene todos los autores

POST /authors
Crea un nuevo autor

GET /authors/:id
Obtiene un autor por ID

PUT /authors/:id
Actualiza un autor

DELETE /authors/:id
Elimina un autor

---

### Posts

GET /posts
Obtiene todos los posts

POST /posts
Crea un nuevo post

GET /posts/:id
Obtiene un post por ID

PUT /posts/:id
Actualiza un post

DELETE /posts/:id
Elimina un post

GET /posts/author/:authorId
Obtiene todos los posts de un autor específico

---
##  Ejecutar Tests

Este proyecto incluye tests automatizados utilizando **Jest** y **Supertest**.

Para ejecutar los tests:

```bash
npm test
```
---

## Documentación de la API

La documentación completa de la API se encuentra en el archivo:

```
openapi.yaml
```

Este archivo describe todos los endpoints, parámetros y estructuras de datos de la API utilizando la especificación OpenAPI.

---

## Deployment

La aplicación está preparada para ser desplegada en **Railway**.

Pasos básicos para el deploy:

1. Crear un proyecto en Railway.
2. Conectar el repositorio de GitHub.
3. Configurar las variables de entorno necesarias:
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_USER=usuario
   - DB_PASSWORD=password
   - DB_DATABASE=miniblogm2
   - INTERNAL_URL=https://internal-url-ejemplo.up.railway.app
   - PUBLIC_URL=https://public-url-ejemplo.up.railway.app
4. Ejecutar el script SQL de inicialización de base de datos.
5. Railway construirá y ejecutará automáticamente la aplicación.

Una vez desplegada, la API quedará disponible mediante una URL pública generada por Railway.

---

## Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizaron herramientas de inteligencia artificial como apoyo para:

- aclarar conceptos técnicos
- resolver dudas sobre Node.js, Express y PostgreSQL
- mejorar la documentación del proyecto
- revisar estructura del código

Todas las decisiones finales de implementación, pruebas y validación fueron realizadas por el autor del proyecto.

---

## Autor

Proyecto desarrollado por Nadia Starna como parte del módulo 2.
