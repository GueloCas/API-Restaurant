"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Schema, model } from "mongoose";

// Crea el esquema de la coleccion 'tables'
const tableSchema = new Schema(
  {
    number: {
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
  },
);

// Crea el modelo de datos 'Table' a partir del esquema 'tableSchema'
const Table = model("Table", tableSchema);

export default Table;