/*
    NODE JS: Ejemplo que demuestra el uso de router
*/

import "dotenv/config";
import express from "express";
import { config as configCors } from "./config/cors.config.js";
import { config as configJson } from "./config/json.config.js";
import { connectDB } from "./config/mongoose.config.js";
import { config as configStatic } from "./config/static.config.js";

import inquiryRouter from "./routes/inquiry.router.js";
import institutionRouter from "./routes/institution.router.js";
import productRouter from "./routes/product.router.js";

const app = express();
configJson(app);
configStatic(app);
configCors(app);
connectDB();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Declaración de rutas
app.use("/api/institutions", institutionRouter);
app.use("/api/products", productRouter);
app.use("/api/inquiry", inquiryRouter);

// Control de rutas inexistentes
app.use((req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Método oyente de solicitudes
if( process.env.NODE_ENV !== "production") {
    app.listen(PORT, HOST, () => {
        console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    });
}

export default app;