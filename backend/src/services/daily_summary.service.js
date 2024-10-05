"use strict"

import DailySummary from "../models/daily_summary.model.js"
import { handleError } from "../utils/errorHandler.js"

async function getDailySummaries() {
    try {
        const dailySummaries = await DailySummary.find().exec()
        if (!dailySummaries) return [null, "No hay resúmenes diarios"]

        return [dailySummaries, null]
    } catch (error) {
        handleError(error, "daily_summary.service -> getDailySummaries")
    }
}

async function createDailySummary(dailySummary) {
    try {
        const { name, total_sales, total_tips, orders } = dailySummary

        const newDailySummary = new DailySummary({
            name,
            total_sales,
            total_tips,
            orders
        })

        await newDailySummary.save()

        return [newDailySummary, null]
    } catch (error) {
        handleError(error, "daily_summary.service -> createDailySummary")
    }
}

async function getDailySummaryById(id) {
    try {
        const dailySummary = await DailySummary.findById(id).exec()
        if (!dailySummary) return [null, "No existe el resumen diario"]

        return [dailySummary, null]
    } catch (error) {
        handleError(error, "daily_summary.service -> getDailySummaryById")
    }
}

async function updateDailySummary(id, dailySummary) {
    try {
        const { name, total_sales, total_tips, orders } = dailySummary

        const dailySummaryFound = await DailySummary.findById(id)
        if (!dailySummaryFound) return [null, "No existe el resumen diario"]

        dailySummaryFound.name = name
        dailySummaryFound.total_sales = total_sales
        dailySummaryFound.total_tips = total_tips
        dailySummaryFound.orders = orders

        await dailySummaryFound.save()

        return [dailySummaryFound, null]
    } catch (error) {
        handleError(error, "daily_summary.service -> updateDailySummary")
    }
}

async function deleteDailySummary(id) {
    try {
        const dailySummary = await DailySummary.findByIdAndDelete(id).exec()
        if (!dailySummary) return [null, "No existe el resumen diario"]

        return [dailySummary, null]
    } catch (error) {
        handleError(error, "daily_summary.service -> deleteDailySummary")
    }
}

export default {
    getDailySummaries,
    createDailySummary,
    getDailySummaryById,
    updateDailySummary,
    deleteDailySummary
}
