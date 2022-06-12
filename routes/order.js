const express = require("express");
const router = express.Router();

const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrder,
    getOrderStatus,
    updateStatus
} = require("../controllers/order");


router.param("orderId", getOrderById);

router.post(
    "/order/create",

    createOrder
);
router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrder);

module.exports = router;