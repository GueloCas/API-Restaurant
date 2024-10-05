"use strict"

import { respondSuccess, respondError } from "../utils/resHandler.js";
import DailySummaryService from "../services/daily_summary.service.js";
import dailySummaryBodySchema from "../schema/daily_summary.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getDailySummaries(req, res) {
    try {
        const [dailySummaries, errorDailySummaries] = await DailySummaryService.getDailySummaries();
        if (errorDailySummaries) return respondError(req, res, 404, errorDailySummaries);

        dailySummaries.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, dailySummaries);
    } catch (error) {
        handleError(error, "daily_summary.controller -> getDailySummaries");
        respondError(req, res, 400, error.message);
    }
}

async function createDailySummary(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = dailySummaryBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newDailySummary, dailySummaryError] = await DailySummaryService.createDailySummary(body);

        if (dailySummaryError) return respondError(req, res, 400, dailySummaryError);
        if (!newDailySummary) {
            return respondError(req, res, 400, "No se creo el resumen diario");
        }

        respondSuccess(req, res, 201, newDailySummary);
    } catch (error) {
        handleError(error, "daily_summary.controller -> createDailySummary");
        respondError(req, res, 500, "No se creo el resumen diario");
    }
}

async function getDailySummaryById(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [dailySummary, errorDailySummary] = await DailySummaryService.getDailySummaryById(id);
        if (errorDailySummary) return respondError(req, res, 404, errorDailySummary);

        respondSuccess(req, res, 200, dailySummary);
    } catch (error) {
        handleError(error, "daily_summary.controller -> getDailySummaryById");
        respondError(req, res, 400, error.message);
    }
}

async function updateDailySummary(req, res) {
    try {
        const { params, body } = req;
        const { id } = params;

        const { error: bodyError } = dailySummaryBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [dailySummary, errorDailySummary] = await DailySummaryService.updateDailySummary(id, body);
        if (errorDailySummary) return respondError(req, res, 404, errorDailySummary);

        respondSuccess(req, res, 200, dailySummary);
    } catch (error) {
        handleError(error, "daily_summary.controller -> updateDailySummary");
        respondError(req, res, 400, error.message);
    }
}

async function deleteDailySummary(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [dailySummary, errorDailySummary] = await DailySummaryService.deleteDailySummary(id);
        if (errorDailySummary) return respondError(req, res, 404, errorDailySummary);

        respondSuccess(req, res, 200, dailySummary);
    } catch (error) {
        handleError(error, "daily_summary.controller -> deleteDailySummary");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getDailySummaries,
    createDailySummary,
    getDailySummaryById,
    updateDailySummary,
    deleteDailySummary,
};