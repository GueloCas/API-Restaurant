"use strict"

import { Router } from "express";

import dailySummaryController from "../controllers/daily_summary.controller.js";

import { isAdmin } from "../middlewares/authorization.middleware.js";

import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", isAdmin, dailySummaryController.getDailySummaries);
router.post("/", isAdmin, dailySummaryController.createDailySummary);
router.get("/:id", dailySummaryController.getDailySummaryById);
router.put("/:id", isAdmin, dailySummaryController.updateDailySummary);
router.delete("/:id", isAdmin, dailySummaryController.deleteDailySummary);

export default router;