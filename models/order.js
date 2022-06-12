const mongoose = require("mongoose");
const User = require('./user')
var ObjectId = mongoose.Schema.Types.ObjectId;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    amount: { type: Number },
    status: {
        type: String,
        default: "Placed"
    },

    user: {
        type: String,
        ref: "User"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };