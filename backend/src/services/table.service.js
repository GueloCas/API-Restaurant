"use strict"

import Table from "../models/table.model.js"
import { handleError } from "../utils/errorHandler.js"

async function getTables() {
    try {
        const tables = await Table.find().exec()
        if (!tables) return [null, "No hay mesas"]

        return [tables, null]
    } catch (error) {
        handleError(error, "table.service -> getTables")
    }
}

async function createTable(table) {
    try {
        const { number } = table

        const tableFound = await Table.findOne({ number: table.number })
        if (tableFound) return [null, "Ya existe una mesa con ese número"]

        const newTable = new Table({
            number,
        })
        await newTable.save()

        return [newTable, null]
    } catch (error) {
        handleError(error, "table.service -> createTable")
    }
}

async function getTableById(id) {
    try {
        const table = await Table.findById(id).exec()
        if (!table) return [null, "No existe la mesa"]

        return [table, null]
    } catch (error) {
        handleError(error, "table.service -> getTableById")
    }
}

async function updateTable(id, table) {
    try {
        const { number, status } = table

        const tableFound = await Table.findById(id)
        if (!tableFound) return [null, "No existe la mesa"]

        if (status) tableFound.is_active = status

        tableFound.number = number

        await tableFound.save()

        return [tableFound, null]
    } catch (error) {
        handleError(error, "table.service -> updateTable")
    }
}

async function deleteTable(id) {
    try {
        const table = await Table.findByIdAndDelete(id).exec()
        if (!table) return [null, "No existe la mesa"]

        return table
    } catch (error) {
        handleError(error, "table.service -> deleteTable")
    }
}

export default {
    getTables,
    createTable,
    getTableById,
    updateTable,
    deleteTable,
};