const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ["admin", "usuario"],
        default: "usuario",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;