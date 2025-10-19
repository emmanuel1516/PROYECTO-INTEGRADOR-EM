# PROYECTO-INTEGRADOR-EIT-3

# ⚙️ Backend E-commerce Store – Proyecto Integrador F3

Este proyecto fue desarrollado en el marco del **Bootcamp de Full Stack Engineering**, como la tercera fase del **Proyecto Integrador**.

En esta etapa se implementa el **backend completo de la tienda web**, migrando la lógica de negocio y la persistencia de datos desde el frontend hacia un **servidor Node.js con Express** conectado a **MongoDB Atlas**.
El objetivo principal es aplicar buenas prácticas de desarrollo backend, arquitectura de APIs RESTful y despliegue profesional en producción.

---

## 🎯 Objetivo

- Desarrollar un **backend funcional y escalable** con Node.js y Express.
- Migrar toda la gestión de datos del cliente al servidor.
- Integrar la API con el frontend desarrollado en la Fase 2.
- Aplicar **validaciones, manejo de errores y estructura modular por capas**.
- Desplegar tanto el backend como el frontend en **Vercel**, garantizando una integración completa.

---

## 🛠️ Tecnologías y herramientas

- **Node.js**: entorno de ejecución para JavaScript del lado del servidor.
- **Express.js**: framework para construir APIs RESTful.
- **MongoDB Atlas**: base de datos NoSQL en la nube.
- **Mongoose**: ODM para definir esquemas y modelos de datos.
- **Cloudinary**: servicio de almacenamiento e integración de imágenes en la nube.
- **Nodemailer**: envío de correos electrónicos mediante servicio SMTP (Brevo).
- **Joi**: validación de datos de entrada.
- **dotenv**: manejo de variables de entorno.
- **CORS & express.json()**: middlewares para comunicación cliente-servidor.
- **Postman**: testeo de endpoints y validación de respuestas.
- **Vercel**: despliegue en producción.

---

## 🧱 Estructura del proyecto

- El backend está organizado por capas para mantener un código **modular, mantenible y escalable**:

- src/
    - **config/** → configuración general (CORS, DB, etc.)  
    - **models/** → esquemas de Mongoose  
    - **routes/** → definición de rutas API  
    - **controllers/** → lógica de negocio por endpoint  
    - **services/** → funciones auxiliares (envío de mails, validaciones, etc.)  
    - **validators/** → validaciones de entrada con Joi  
    - **utils/** → utilidades generales (mailer, uploader, etc.)  
    - **app.js** → punto de entrada del servidor  

## 📦 Requerimientos funcionales

### 🛍️ Gestión de productos
- Listar todos los productos (20 por defecto).
- Filtrar productos por nombre o si son destacados.
- Obtener un producto por ID.
- Crear, modificar y eliminar productos con validaciones completas.
- Los productos se almacenan en la colección **`products`** en MongoDB.

### 💬 Gestión de consultas
- Enviar mensajes de contacto por correo electrónico (nombre, apellido, email, teléfono y mensaje).
- Responder al frontend con notificación de éxito o error.
- Se utiliza **Nodemailer** para el envío y **Brevo (Sendinblue)** como servidor SMTP.

### 🏢 Gestión institucional
- Obtener información de la institución: nombre, dirección, teléfono y email.
- Cargar información de “Nosotros”: misión, visión y valores.
- Datos almacenados en la colección **`institutions`** (documento único).

### 🖼️ Gestión de imágenes (Cloudinary) -- (Adicional)
- Integración con **Cloudinary** para almacenar y servir imágenes de productos.
- Subida automática desde el formulario de creación o edición.
- Eliminación y reemplazo de imágenes desde el panel de administración.
- Configuración mediante variables de entorno:

### 🧾 Envío de orden de compra
- Al realizar una compra, el backend envía automáticamente un **correo electrónico al administrador** con todos los detalles de la transacción.
- El correo incluye:
- **Datos del comprador:** nombre, apellido, email y teléfono.
- **Tabla HTML con el detalle de productos comprados**, incluyendo nombre, cantidad, precio unitario, subtotal y total general.
- Se utiliza **Nodemailer** para el envío y **Brevo (Sendinblue)** como servidor SMTP.

### 🔗 Integración con el frontend
- Reemplazo del uso de localStorage por llamadas a la API.
- Conexión del formulario de productos al backend (soporte para subida de imágenes).
- Envío de datos con **FormData** cuando incluye archivos.

---

## 🧩 Requerimientos técnicos

- **Estructura organizada por capas.**
- Archivo `.env` con variables de entorno y `.env.example` sin datos sensibles.
- Puerto configurable mediante `PORT`.
- Validación y manejo de errores con códigos HTTP (200, 201, 400, 404, 500).
- Esquemas y validaciones en Mongoose.
- Mensajes de error descriptivos y consistentes.
- Servir archivos estáticos desde el backend (imágenes).
- Testing de endpoints con Postman.
- Variables de entorno configuradas en Vercel.
- Código en inglés, comentarios en español si es necesario.
- Nomenclatura camelCase y modularización correcta.

---

## 📡 Endpoints principales

| Método | Ruta | Descripción |
|:--------|:------|:-------------|
| **GET** | `/api/products?name=value&highlighted=true` | Listar o filtrar productos |
| **POST** | `/api/products` | Crear producto |
| **GET** | `/api/products/:id` | Obtener producto por ID |
| **PUT** | `/api/products/:id` | Editar producto |
| **DELETE** | `/api/products/:id` | Eliminar producto |
| **POST** | `/api/inquiry` | Enviar consulta por correo |
| **GET** | `/api/institutions/first` | Obtener datos institucionales |

---

## ✅ Requerimientos de entrega

- Entrega en formato `.zip` a través del formulario indicado por el instructor.
- Incluir el enlace al proyecto desplegado en **Vercel** dentro de este README.
- La entrega es **individual**, aunque el desarrollo fue **colaborativo e iterativo** durante las clases.
- Fecha de entrega: **Domingo 19 de octubre de 2025**.

---

## 🤝 Trabajo colaborativo

El desarrollo se realizó de manera **colaborativa y cooperativa**, emulando un entorno de trabajo real.
Cada estudiante presenta su propia versión personalizada, partiendo del repositorio de la **Fase 2**:
- Se resguarda el contenido previo en la rama `fase-2`.
- El desarrollo del backend se continúa en la rama `fase-3`.
- Al finalizar el contenido de la rama `fase-3` se lleva al `main`.

---

## 🚀 Despliegue

- **Vercel:** [https://proyecto-integrador-f1.vercel.app/](https://proyecto-integrador-f1.vercel.app/)


---

## 🙏 Agradecimiento especial

Quiero expresar mi más sincero agradecimiento al **Profe Sergio**,
por su cariño, compromiso, paciencia y enorme dedicación durante todo el proceso formativo.
Su manera de enseñar es clara transmitiendo esa pasión por la programación, eso fue clave para comprender cada etapa del desarrollo. Además nos ayudo a tener la motivación para poder terminar el curso.
Gracias por compartir su conocimiento y motivarme a seguir creciendo como desarrollador profesional. Nos vemos pronto.
