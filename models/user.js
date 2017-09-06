var DataLayer = require("../config/datalayer")

let dl = new DataLayer();
module.exports = function () {
    "use strict";
    this.findAll = function (callback) {
        console.log("===== user.findall =====");
        dl.findAll("users", function (err, data) {
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

    this.addNew = function (newUser, callback) {

        console.log("===== user.addNew =====");
        dl.insert("users", [newUser], function (err, data) {
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
        console.log("===== user.delete =====");
        console.log("Key:", key);
        dl.deleteOne("users", key, function (err, data) {
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
    this.update = function (key, newUser, callback) {

        console.log("===== user.update =====");

        dl.update('users', key, newUser, function (err, data) {
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

