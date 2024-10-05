"use strict"

import { respondSuccess, respondError } from "../utils/resHandler.js";
import MenuService from "../services/menu.service.js";
import menuBodySchema from "../schema/menu.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getMenus(req, res) {
    try {
        const [menus, errorMenus] = await MenuService.getMenus();
        if (errorMenus) return respondError(req, res, 404, errorMenus);

        menus.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, menus);
    } catch (error) {
        handleError(error, "menu.controller -> getMenus");
        respondError(req, res, 400, error.message);
    }
}

async function createMenu(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = menuBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newMenu, menuError] = await MenuService.createMenu(body);

        if (menuError) return respondError(req, res, 400, menuError);
        if (!newMenu) {
            return respondError(req, res, 400, "No se creo el menú");
        }

        respondSuccess(req, res, 201, newMenu);
    } catch (error) {
        handleError(error, "menu.controller -> createMenu");
        respondError(req, res, 500, "No se creo el menú");
    }
}

async function getMenuById(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [menu, errorMenu] = await MenuService.getMenuById(id);
        if (errorMenu) return respondError(req, res, 404, errorMenu);

        respondSuccess(req, res, 200, menu);
    } catch (error) {
        handleError(error, "menu.controller -> getMenuById");
        respondError(req, res, 400, error.message);
    }
}

async function updateMenu(req, res) {
    try {
        const { params, body } = req;
        const { id } = params;

        const [updatedMenu, errorUpdatedMenu] = await MenuService.updateMenu(id, body);
        if (errorUpdatedMenu) return respondError(req, res, 404, errorUpdatedMenu);

        respondSuccess(req, res, 200, updatedMenu);
    } catch (error) {
        handleError(error, "menu.controller -> updateMenu");
        respondError(req, res, 400, error.message);
    }
}

async function deleteMenu(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [menu, errorMenu] = await MenuService.deleteMenu(id);
        if (errorMenu) return respondError(req, res, 404, errorMenu);

        respondSuccess(req, res, 200, menu);
    } catch (error) {
        handleError(error, "menu.controller -> deleteMenu");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getMenus,
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
}