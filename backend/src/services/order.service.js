"use strict"

import Order from "../models/order.model.js";
import { handleError } from "../utils/errorHandler.js";

async function getOrders() {
    try {
        const orders = await Order.find().exec();
        if (!orders) return [null, "No hay órdenes"];

        return [orders, null];
    } catch (error) {
        handleError(error, "order.service -> getOrders");
    }
}

async function createOrder(order) {
    try {
        const { user, table, number, items, total, tip } = order;

        const newOrder = new Order({
            user,
            table,
            number,
            items,
            total,
            tip,
        });

        await newOrder.save();

        return [newOrder, null];
    } catch (error) {
        handleError(error, "order.service -> createOrder");
    }
}

async function getOrderById(id) {
    try {
        const order = await Order.findById(id).exec();
        if (!order) return [null, "No existe la orden"];

        return [order, null];
    } catch (error) {
        handleError(error, "order.service -> getOrderById");
    }
}

async function updateOrder(id, order) {
    try {
        const { user, table, number, items, total, tip } = order;

        const orderFound = await Order.findById(id);
        if (!orderFound) return [null, "No existe la orden"];

        orderFound.user = user;
        orderFound.table = table;
        orderFound.number = number;
        orderFound.items = items;
        orderFound.total = total;
        orderFound.tip = tip;

        await orderFound.save();

        return [orderFound, null];
    } catch (error) {
        handleError(error, "order.service -> updateOrder");
    }
}

async function deleteOrder(id) {
    try {
        const order = await Order.findById(id);
        if (!order) return [null, "No existe la orden"];

        await order.remove();

        return [order, null];
    } catch (error) {
        handleError(error, "order.service -> deleteOrder");
    }
}

export default {
    getOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
