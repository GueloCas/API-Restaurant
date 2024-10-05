"use strict"

import { Router } from "express";

import tableController from "../controllers/table.controller.js";

import { isAdmin } from "../middlewares/authorization.middleware.js";

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", isAdmin, tableController.getTables);
router.post("/", isAdmin, tableController.createTable);
router.get("/:id", tableController.getTableById);
router.put("/:id", isAdmin, tableController.updateTable);
router.delete("/:id", isAdmin, tableController.deleteTable);

export default router;