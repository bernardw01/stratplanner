var DataLayer = require("../config/dataLayer");
var Firebase = require("../config/firebaseDB");

let dl = new DataLayer();
let fb = new Firebase();
module.exports = function () {
    "use strict";
    this.findAll = function (callback) {
        console.log("===== user.findall =====");
        //fb.addEventLogEntry('bernard', 'This is the type', 'This is the text');

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
    this.findOne = function (userEmail, callback) {
        console.log("===== user.findOne =====");

        dl.findOne('users', 'user_email', userEmail, function (err, data) {
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
    //Relationships
    this.addReview = function (key, reviewKey, callback) {

        console.log("===== review-user.update =====");

        dl.addKeyToArray('users', key, 'reviews', reviewKey, function (err, data) {
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

