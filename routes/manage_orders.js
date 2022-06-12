const express = require("express");
const manageorderRoute = express.Router();
const { Order, ProductCart } = require("../models/order");

//get all orders

manageorderRoute.route("/allorders").get((req, res) => {
    Order.find()
        .populate("user", "name address email")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found",
                });
            } else {
                res.json(orders);
            }
        });
});

//get single order

manageorderRoute.route("/read-order/:id").get((req, res) => {
    Order.findById(req.params.id, (error, data) => {
        if (error) {
            console.log("error in get single order manageorder rote.js");
            console.log(error);
        } else {
            res.json(data);
        }
    });
});

//update order

manageorderRoute.route("/update-order/:id").put((req, res, next) => {
    Order.findByIdAndUpdate(
        req.params.id, {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                console.log("error in update rote manage.js");
                console.log(error);
            } else {
                res.json(data);
                console.log("update success");
            }
        }
    );
});

module.exports = manageorderRoute;