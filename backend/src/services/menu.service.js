"use strict"

import Menu from "../models/menu.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getMenus() {
    try {
        const menus = await Menu.find().exec();
        if (!menus) return [null, "No hay menús"];

        return [menus, null];
    } catch (error) {
        handleError(error, "menu.service -> getMenus");
    }
}

async function createMenu(menu) {
    try {
        const { name, price, category } = menu;

        const menuFound = await Menu.findOne({ name: menu.name });
        if (menuFound) return [null, "Ya existe un menú con ese nombre"];

        const newMenu = new Menu({
            name,
            price,
            category,
        });

        await newMenu.save();

        return [newMenu, null];
    } catch (error) {
        handleError(error, "menu.service -> createMenu");
    }
}

async function getMenuById(id) {
    try {
        const menu = await Menu.findById(id).exec();
        if (!menu) return [null, "No existe el menú"];

        return [menu, null];
    } catch (error) {
        handleError(error, "menu.service -> getMenuById");
    }
}

async function updateMenu(id, menu) {
    try {
        const { name, price, category } = menu;

        const menuFound = await Menu.findById(id);
        if (!menuFound) return [null, "No existe el menú"];

        menuFound.name = name;
        menuFound.price = price;
        menuFound.category = category;

        await menuFound.save();

        return [menuFound, null];
    } catch (error) {
        handleError(error, "menu.service -> updateMenu");
    }
}

async function deleteMenu(id) {
    try {
        const menu = await Menu.findById(id);
        if (!menu) return [null, "No existe el menú"];

        await menu.remove();

        return [menu, null];
    } catch (error) {
        handleError(error, "menu.service -> deleteMenu");
    }
}

export default {
    getMenus,
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
}
