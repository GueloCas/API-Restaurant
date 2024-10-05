"use strict"

import { Router } from "express";

import menuController from "../controllers/menu.controller.js";

import { isAdmin } from "../middlewares/authorization.middleware.js";

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", menuController.getMenus);
router.post("/", isAdmin, menuController.createMenu);
router.get("/:id", menuController.getMenuById);
router.put("/:id", isAdmin, menuController.updateMenu);
router.delete("/:id", isAdmin, menuController.deleteMenu);

export default router;