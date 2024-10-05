"use strict"

import { respondSuccess, respondError } from "../utils/resHandler.js"
import TableService from "../services/table.service.js"
import { tableBodySchema } from "../schema/table.schema.js"
import { handleError } from "../utils/errorHandler.js"

async function getTables(req, res) {
    try {
        const [tables, errorTables] = await TableService.getTables()
        if (errorTables) return respondError(req, res, 404, errorTables)

        tables.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, tables)
    } catch (error) {
        handleError(error, "table.controller -> getTables")
        respondError(req, res, 400, error.message)
    }
}

async function createTable(req, res) {
    try {
        const { body } = req
        const { error: bodyError } = tableBodySchema.validate(body)
        if (bodyError) return respondError(req, res, 400, bodyError.message)

        const [newTable, tableError] = await TableService.createTable(body)

        if (tableError) return respondError(req, res, 400, tableError)
        if (!newTable) {
            return respondError(req, res, 400, "No se creo la mesa")
        }

        respondSuccess(req, res, 201, newTable)
    } catch (error) {
        handleError(error, "table.controller -> createTable")
        respondError(req, res, 500, "No se creo la mesa")
    }
}

async function getTableById(req, res) {
    try {
        const { params } = req
        const { id } = params

        const [table, errorTable] = await TableService.getTableById(id)
        if (errorTable) return respondError(req, res, 404, errorTable)

        respondSuccess(req, res, 200, table)
    } catch (error) {
        handleError(error, "table.controller -> getTableById")
        respondError(req, res, 400, error.message)
    }
}

async function updateTable(req, res) {
    try {
        const { params, body } = req
        const { id } = params
        const { error: bodyError } = tableBodySchema.validate(body)
        if (bodyError) return respondError(req, res, 400, bodyError.message)

        const [table, errorTable] = await TableService.updateTable(id, body)
        if (errorTable) return respondError(req, res, 404, errorTable)

        respondSuccess(req, res, 200, table)
    } catch (error) {
        handleError(error, "table.controller -> updateTable")
        respondError(req, res, 400, error.message)
    }
}

async function deleteTable(req, res) {
    try {
        const { params } = req
        const { id } = params

        const table = await TableService.deleteTable(id)
        if (!table) return respondError(req, res, 404, "No existe la mesa")

        respondSuccess(req, res, 200, table)
    } catch (error) {
        handleError(error, "table.controller -> deleteTable")
        respondError(req, res, 400, error.message)
    }
}

export default {
    getTables,
    createTable,
    getTableById,
    updateTable,
    deleteTable,
};
