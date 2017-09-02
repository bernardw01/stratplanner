var db = require("../config/dbconnection.js");
var moment = require("moment");

module.exports = function () {
    "use strict";
// This makes sure that any errors are logged if mongodb runs into an issue
    db.on("error", function (error) {
        console.log("Database Error:", error);
    });

    this.findAll = function (callback) {
        console.log("===== team.findall =====");
        db.teams.find({}, function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                console.log(data);
                callback(data);
            }
        });
    };

    this.delete = function (key, callback) {
        console.log("===== team.delete =====");
        db.teams.remove({_id: key}, true, function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                console.log(data);
                callback(data);
            }
        });
    };
    this.addNew = function (newTeam, callback) {

        var newDate = moment(Date.now());
        newTeam.lastUpdatedUnix = Date.now();
        newTeam.lastUpdatedDate = newDate.format('MM/DD/YYYY HH:mm');

        console.log("===== team.addNew =====");
        db.teams.insert(newTeam, function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            // Otherwise, send the result of this query to the caller
            else {
                console.log(data);
                callback(data);
            }
        });
    };

    this.update = function (key, newTeam, callback) {

        var newDate = moment(Date.now());
        var last
        newTeam.lastUpdatedUnix = Date.now();
        newTeam.lastUpdatedDate = newDate.format('MM/DD/YYYY HH:mm');

        console.log("===== team.update =====");
        var options = {
            query: {_id: key},
            update: { $set: newTeam},
            new: true
        }

        db.teams.findAndModify(newTeam, function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            // Otherwise, send the result of this query to the caller
            else {
                console.log(data);
                callback(data);
            }
        });
    };

};