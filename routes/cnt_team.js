var express = require('express');

// Requiring our models
var db = require("../models/team");
var router = express.Router();

"use strict";
var team = new db();

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {
// find everything
    team.findAll(function (data) {
        res.json(data);
    });

});

router.post("/addnew", function (req, res) {
    var newTeam = {
        teamName: req.body.teamName,
        teamLeadUserName: req.body.teamLeadUserName,
        lastUser: req.body.userName
    }
    team.addNew(newTeam, function (data) {
        res.json(data);
    });
});

router.post("/update", function (req, res) {
    var newTeam = {
        teamName: req.body.teamName,
        teamLeadUserName: req.body.teamLeadUserName,
        lastUser: req.body.userName
    }
    team.update(req.body.key, newTeam, function (data) {
        res.json(data);
    });
});

router.post("/delete", function (req, res) {

    team.delete(req.body.key, function (data) {
        res.json(data);
    });
});

module.exports = router;