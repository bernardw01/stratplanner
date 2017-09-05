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
            console.log("===== " + collectionName + ".insert =====");
            assert.equal(null, err);
            let id = new ObjectID(key);
            let filter = {_id: id};
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
};

module.exports = DataLayer;