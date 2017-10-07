var express = require('express');

// Requiring our models
var mdl_user = require("../models/mdl_user")
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
router.post("/findone", function (req, res) {
    // find everything
    user.findOne(req.body.user_email, function (data) {
        res.json(data);
    });
});

router.post("/finduser", function (req, res) {
    // find everything
    var User = new mdl_user();
    User.find({"user_email": req.body.user_email}, function (data) {
        res.json(data);
    });
});
router.post("/addnew", function (req, res) {
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mi: req.body.mi,
        user_email: req.body.user_email,
        job_title: req.body.job_title,
        job_role: req.body.job_role,
        team_membership: [req.body.team_id],
        tags: [],
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cell_phone: req.body.cell_phone,
        home_phone: req.body.home_phone,
        current_manager_id: req.body.current_manager_id,
        roles: {
            admin: req.body.role_admin,
            user: req.body.role_user,
            super_user: req.body.role_super_user,
            manager: req.body.role_manager,
        },
        reviews: []
    }
    user.addNew(newUser, function (data) {
        res.json(data);
    });
});

router.post("/adduser", function (req, res) {
    var User = new mdl_user(req.body);

    User.save(function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise, send the new doc to the browser
        else {
            res.send(doc);
        }
    });

});

router.post("/update", function (req, res) {
    var newUser = {
        user_id: req.body.userID,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mi: req.body.mi,
        user_email: req.body.user_email,
        job_title: req.body.job_title,
        job_role: req.body.job_role,
        team_membership: [],
        tags: [],
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cell_phone: req.body.cell_phone,
        home_phone: req.body.home_phone,
        current_manager_id: req.body.current_manager_id,
        roles: {
            admin: req.body.role_admin,
            user: req.body.role_user,
            super_user: req.body.role_super_user,
            manager: req.body.role_manager,
        },
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