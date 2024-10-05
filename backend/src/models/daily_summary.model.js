"use strict"

import { Schema, model } from "mongoose";

const dailySummaryOrdersSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        tip: {
            type: Number,
            required: true,
        },
    }
);

const dailySummarySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        total_sales: {
            type: Number,
            required: true,
        },
        total_tips: {
            type: Number,
            required: true,
        },
        orders: [dailySummaryOrdersSchema],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const DailySummary = model("DailySummary", dailySummarySchema);

export default DailySummary;