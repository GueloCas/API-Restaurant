"use strict"

import { Router } from "express";

import menuCategoryController from "../controllers/menu_category.controller.js";

import { isAdmin } from "../middlewares/authorization.middleware.js";

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", isAdmin, menuCategoryController.getMenuCategories);
router.post("/", isAdmin, menuCategoryController.createMenuCategory);
router.delete("/:id", isAdmin, menuCategoryController.deleteMenuCategory);

export default router;