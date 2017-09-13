let connectInfo = require("../config/config.js");
let mongo = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
let assert = require("assert");
let moment = require("moment");

let DataLayer = function () {
    "use strict";
    this.findAll = function (collectionName, callback) {
        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            assert.equal(null, err);
            db.collection(collectionName).find({}).toArray(function (err, data) {
                assert.equal(err, null);
                callback(data);
            });
        });
    };
    this.deleteOne = function (collectionName, key, callback) {
        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            console.log("===== " + collectionName + ".dl.delete =====");
            console.log("Key:", key);
            assert.equal(null, err);
            let id = new ObjectID(key);
            let filter = {_id: id};
            let collection = db.collection(collectionName);

            collection.deleteOne(filter, function (err, data) {
                // Log any errors if the server encounters one
                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    //console.log("server response ==== >", data);
                    callback(data);
                }
            });

        });
    };
    this.insert = function (collectionName, docArray, callback) {
        var newDate = moment(Date.now());
        var lastUpdated = {
            unixTimeStamp: Date.now(),
            formattedDate: newDate.format('MM/DD/YYYY HH:mm')
        };

        for (var i = 0; i < docArray.length; i++) {
            docArray[i].lastUpdated = lastUpdated;
        }

        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            console.log("===== " + collectionName + ".insert =====");
            assert.equal(null, err);
            db.collection(collectionName).insertMany(docArray, function (err, data) {
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

        });
    };
    this.update = function (collectionName, key, document, callback) {

        var newDate = moment(Date.now());
        var lastUpdated = {
            unixTimeStamp: Date.now(),
            formattedDate: newDate.format('MM/DD/YYYY HH:mm')
        };

        document.lastUpdated = lastUpdated;

        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            console.log("===== " + collectionName + ".update =====");
            assert.equal(null, err);
            let id = new ObjectID(key);
            let filter = {_id: id};
            console.log("Query ID:", id);
            console.log("Query Filter:", filter);
            console.log("Collection Name:", collectionName);
            db.collection(collectionName).updateOne(filter, {$set: document}, function (err, data) {
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

        });
    };
    this.addKeyToArray = function (collectionName, key, fieldName, subKey, callback) {

        var newDate = moment(Date.now());
        var lastUpdated = {
            unixTimeStamp: Date.now(),
            formattedDate: newDate.format('MM/DD/YYYY HH:mm')
        };

        //document.lastUpdated = lastUpdated;

        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            console.log("===== " + collectionName + ".AddsubKey to " + fieldName + " ===== ");
            assert.equal(null, err);

            let id = new ObjectID(key);
            console.log(id);
            let filter = {_id: id};
            //Check the name of the field that we are wanting to push an element into
            console.log("Team ID:", id);
            console.log("Query Filter:", filter);
            console.log("Collection Name:", collectionName);

            if (fieldName === "reviews") {
                var pushObj = {"reviews": subKey};
                console.log("Adding a Review");
            }
            if (fieldName === "teamMembers") {
                var pushObj = {"teamMembers": subKey};
                console.log("Adding a Team Member");
            }
            db.collection(collectionName).updateOne(filter, {$push: pushObj}, function (err, data) {
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
        });
    };
    this.findOne = function (collectionName, fieldName, fieldValue, callback) {
        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            console.log("===== " + collectionName + ".FindOne Based on " + fieldName + " ===== ");
            assert.equal(null, err);

            //select the right filter
            let filter = {};
            if (fieldName === "reviews") {
                filter = {"reviews": fieldValue};
                console.log("Adding a Review");
            }
            if (fieldName === "teamMembers") {
                filter = {"teamMembers": fieldValue};
                console.log("Adding a Team Member");
            }
            if (fieldName === "user_email") {
                filter = {"user_email": fieldValue};
            }

            //Check the name of the field that we are wanting to push an element into
            console.log("Query Filter:", filter);
            console.log("Collection Name:", collectionName);
            db.collection(collectionName).findOne(filter, function (err, data) {
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
        });
    }
};

module.exports = DataLayer;