"use strict"

import { respondSuccess, respondError } from "../utils/resHandler.js";
import OrderService from "../services/order.service.js";
import orderBodySchema from "../schema/order.schema.js";
import { handleError } from "../utils/errorHandler.js";

async function getOrders(req, res) {
    try {
        const [orders, errorOrders] = await OrderService.getOrders();
        if (errorOrders) return respondError(req, res, 404, errorOrders);

        orders.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, orders);
    } catch (error) {
        handleError(error, "order.controller -> getOrders");
        respondError(req, res, 400, error.message);
    }
}

async function createOrder(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = orderBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newOrder, orderError] = await OrderService.createOrder(body);

        if (orderError) return respondError(req, res, 400, orderError);
        if (!newOrder) {
            return respondError(req, res, 400, "No se creo la orden");
        }

        respondSuccess(req, res, 201, newOrder);
    } catch (error) {
        handleError(error, "order.controller -> createOrder");
        respondError(req, res, 500, "No se creo la orden");
    }
}

async function getOrderById(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [order, errorOrder] = await OrderService.getOrderById(id);
        if (errorOrder) return respondError(req, res, 404, errorOrder);

        respondSuccess(req, res, 200, order);
    } catch (error) {
        handleError(error, "order.controller -> getOrderById");
        respondError(req, res, 400, error.message);
    }
}

async function updateOrder(req, res) {
    try {
        const { params, body } = req;
        const { id } = params;

        const { error: bodyError } = orderBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [updatedOrder, errorOrder] = await OrderService.updateOrder(id, body);
        if (errorOrder) return respondError(req, res, 404, errorOrder);

        respondSuccess(req, res, 200, updatedOrder);
    } catch (error) {
        handleError(error, "order.controller -> updateOrder");
        respondError(req, res, 400, error.message);
    }
}

async function deleteOrder(req, res) {
    try {
        const { params } = req;
        const { id } = params;

        const [order, errorOrder] = await OrderService.deleteOrder(id);
        if (errorOrder) return respondError(req, res, 404, errorOrder);

        respondSuccess(req, res, 200, order);
    } catch (error) {
        handleError(error, "order.controller -> deleteOrder");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};