"use strict"

import { Schema, model } from "mongoose";

const OrderItemSchema = new Schema(
    {
        menu: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const OrderBodySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        table: {
            type: Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        items: [OrderItemSchema],
        total: {
            type: Number,
            required: true,
        },
        tip: {
            type: Number,
            required: true,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Order = model("Order", OrderBodySchema);

export default Order;