var express = require('express');

// Requiring our models
var db = require("../models/user");
var router = express.Router();

"use strict";
var user = new db();

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {
// find everything
    user.findAll(function (data) {
        res.json(data);
    });

});

router.post("/addnew", function (req, res) {
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mi: req.body.mi,
        team_id: [req.body.team_id],
        tags: [],
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cell_phone: req.body.cell_phone,
        home_phone: req.body.home_phone,
    }
    user.addNew(newUser, function (data) {
        res.json(data);
    });
});

router.post("/update", function (req, res) {
    var newUser = {
        user_id: req.body.userID,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mi: req.body.mi,
        team_id: [],
        tags: [],
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cell_phone: req.body.cell_phone,
        home_phone: req.body.home_phone
    }
    user.update(req.body.key, newUser, function (data) {
        res.json(data);
    });
});

router.post("/delete", function (req, res) {

    user.delete(req.body.key, function (data) {
        res.json(data);
    });
});

module.exports = router;