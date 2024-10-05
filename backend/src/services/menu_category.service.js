"use strict"

import MenuCategory from "../models/menu_category.model.js"
import { handleError } from "../utils/errorHandler.js"

async function getMenuCategories() {
    try {
        const menuCategories = await MenuCategory.find().exec()
        if (!menuCategories) return [null, "No hay categorías de menú"]

        return [menuCategories, null]
    } catch (error) {
        handleError(error, "menu_category.service -> getMenuCategories")
    }
}

async function createMenuCategory(menuCategory) {
    try {
        const { name } = menuCategory

        const menuCategoryFound = await MenuCategory.findOne({ name: menuCategory.name })
        if (menuCategoryFound) return [null, "Ya existe una categoría de menú con ese nombre"]

        const newMenuCategory = new MenuCategory({
            name,
        })
        await newMenuCategory.save()

        return [newMenuCategory, null]
    } catch (error) {
        handleError(error, "menu_category.service -> createMenuCategory")
    }
}

async function deleteMenuCategory(id) {
    try {
        const menuCategory = await MenuCategory.findById(id)
        if (!menuCategory) return [null, "No existe la categoría de menú"]

        await menuCategory.remove()

        return [menuCategory, null]
    } catch (error) {
        handleError(error, "menu_category.service -> deleteMenuCategory")
    }
}

export default {
    getMenuCategories,
    createMenuCategory,
    deleteMenuCategory,
}