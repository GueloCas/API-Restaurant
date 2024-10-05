"use strict"

import { Schema, model } from "mongoose";

const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        menu_category: {
            type: Schema.Types.ObjectId,
            ref: "MenuCategory",
        },
        note: {
            type: String,
        },
    },
    {
        versionKey: false,
    }
);

const Menu = model("Menu", menuSchema);

export default Menu;