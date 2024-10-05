"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

import tableRoutes from "./table.routes.js";
import menuCategoryRoutes from "./menu_category.routes.js";
import menuRoutes from "./menu.routes.js";
import orderRoutes from "./order.routes.js";
import dailySummaryRoutes from "./daily_summary.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/tables", authenticationMiddleware, tableRoutes);

router.use("/menu_categories", authenticationMiddleware, menuCategoryRoutes);

router.use("/menus", authenticationMiddleware, menuRoutes);

router.use("/orders", authenticationMiddleware, orderRoutes);

router.use("/daily_summaries", authenticationMiddleware, dailySummaryRoutes);


// Exporta el enrutador
export default router;
