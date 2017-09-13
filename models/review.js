var DataLayer = require("../config/dataLayer")

let dl = new DataLayer();
module.exports = function () {
    "use strict";
    this.findAll = function (callback) {
        console.log("===== review.findall =====");
        dl.findAll("reviews", function (err, data) {
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

    this.addNew = function (newReview, callback) {

        console.log("===== review.addNew =====");
        dl.insert("reviews", [newReview], function (err, data) {
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
        console.log("===== review.delete =====");
        console.log("Key:", key);
        dl.deleteOne("reviews", key, function (err, data) {
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
    this.update = function (key, newReview, callback) {

        console.log("===== review.update =====");

        dl.update('reviews', key, newReview, function (err, data) {
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

