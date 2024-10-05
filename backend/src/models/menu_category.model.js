"use strict"

import { Schema, model } from "mongoose";

const menuCategorySchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
    },
    {
        versionKey: false,
    }
);

const MenuCategory = model("MenuCategory", menuCategorySchema);

export default MenuCategory;