"use strict";

// Importar módulos necesarios
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Obtener __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Obtener la ruta absoluta del archivo .env */
const envFilePath = path.resolve(__dirname, ".env");

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: envFilePath });

// Exportar las variables de entorno
/** Puerto del servidor */
export const PORT = process.env.PORT;
/** Host del servidor */
export const HOST = process.env.HOST;
/** URL de la base de datos */
export const DB_URL = process.env.DB_URL;
/** Secreto para el token de acceso */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Secreto para el token de refresco */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

