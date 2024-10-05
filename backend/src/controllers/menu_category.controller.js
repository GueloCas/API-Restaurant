"use strict"

import { respondSuccess, respondError } from "../utils/resHandler.js";
import MenuCategoryService from "../services/menu_category.service.js";
import menuCategoryBodySchema from "../schema/menu_category.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getMenuCategories(req, res) {
    try {
        const [menuCategories, errorMenuCategories] = await MenuCategoryService.getMenuCategories();
        if (errorMenuCategories) return respondError(req, res, 404, errorMenuCategories);

        menuCategories.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, menuCategories);
    } catch (error) {
        handleError(error, "menu_category.controller -> getMenuCategories");
        respondError(req, res, 400, error.message);
    }
}

async function createMenuCategory(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = menuCategoryBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newMenuCategory, menuCategoryError] = await MenuCategoryService.createMenuCategory(body);

        if (menuCategoryError) return respondError(req, res, 400, menuCategoryError);
        if (!newMenuCategory) {
            return respondError(req, res, 400, "No se creo la categoría de menú");
        }

        respondSuccess(req, res, 201, newMenuCategory);
    } catch (error) {
        handleError(error, "menu_category.controller -> createMenuCategory");
        respondError(req, res, 500, "No se creo la categoría de menú");
    }
}

async function deleteMenuCategory(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [menuCategory, errorMenuCategory] = await MenuCategoryService.deleteMenuCategory(id);
        if (errorMenuCategory) return respondError(req, res, 404, errorMenuCategory);

        respondSuccess(req, res, 200, menuCategory);
    } catch (error) {
        handleError(error, "menu_category.controller -> deleteMenuCategory");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getMenuCategories,
    createMenuCategory,
    deleteMenuCategory,
}