var DataLayer = require("../config/dataLayer")

let dl = new DataLayer();
module.exports = function () {
    "use strict";
    this.findAll = function (callback) {
        console.log("===== team.findall =====");
        dl.findAll("teams", function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                //console.log(data);
                callback(data);
            }
        });
    };

    this.addNew = function (newTeam, callback) {

        console.log("===== team.addNew =====");
        dl.insert("teams", [newTeam], function (err, data) {
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

    this.delete = function (key, callback) {
        console.log("===== team.delete =====");
        console.log("Key:", key);
        dl.deleteOne("teams", key, function (err, data) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                //console.log(data);
                callback(data);
            }
        });
    };
    this.update = function (key, newTeam, callback) {

        console.log("===== team.update =====");

        dl.update('teams', key, newTeam, function (err, data) {
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

