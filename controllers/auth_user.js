const express = require("express");

const User = require("../models/user");
const { check, validationResult, cookie } = require("express-validator");


var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    // const user = new User(req.body);
    const user = new User({
        password: req.body.password,
        ...req.body,
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
                .save()
                .then((user) =>
                    res.json({
                        name: user.name,
                        email: user.email,
                        id: user._id,
                    })
                )
                .catch((err) => console.log(err));
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exists",
            });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // send response to front end
                const { _id, name, email } = user;
                return res.json({ user: { _id, name, email } });
            } else {
                return res.status(401).json({
                    error: "Email and password do not match",
                });
            }
        });
    });
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
                error: "No Users found",
            });
        }
        res.json(users);
    });
};

exports.getOneUser = (req, res, next, id) => {
    User.findById(id).exec((err, users) => {
        if (err) {
            return res.status(400).json({
                error: "No Users found",
            });
        }
        res.json(users);
    });
};

exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id, {
            $set: req.body,
        },

        (error, data) => {
            console.log(this.req.params.id);
            if (error) {
                console.log("error in update route user.js");
                console.log(error);
            } else {
                res.json(data);
                console.log("update success");
            }
        }
    );
};