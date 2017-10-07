var mongoose = require("mongoose");
let connectInfo = require("../config/config.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
var DB = function () {

    this.start = function () {
        mongoose.Promise = Promise;

        mongoose.connect(connectInfo.getConnectString());

        // Save our mongoose connection to db
        var db = mongoose.connection;

        // If there's a mongoose error, log it to console
        db.on("error", function (error) {
            console.log("Mongoose Error: ", error);
        });

// Once we "open" a connection to mongoose, tell the console we're in
        db.once("open", function () {
            console.log("Mongoose connection successful.");
        });
    };
}


module.exports = DB;