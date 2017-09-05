let mongo = require("mongodb").MongoClient;
let assert = require("assert");
let env = process.env.NODE_ENV || "dev";
let MONGODB_URI = process.env.MONGODB_URI || null;

// Database configuration
// Save the URL of our database as well as the name of our collection


//Select the appropriate environment based on the current environment

var dbconnection = {};

module.exports = {
    connectToServer: function (callback){
        if (env === 'prod') {

            mongo.connect(MONGODB_URI, function (err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to remote server");
                dbconnection = db;
                return callback( err );
            });
        } else {
            mongo.connect("mongodb://localhost/stratplanner", function (err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to local server");
                dbconnection = db;
                return callback( err );
            });
        }
    },
    getDB: function(){
        return dbconnection;
    }
}



