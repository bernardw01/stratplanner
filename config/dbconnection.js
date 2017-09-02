var mongojs = require("mongojs");
var env = process.env.NODE_ENV || "dev";
var MONGODB_URI = process.env.MONGODB_URI || null;
mongodb://heroku_2s9g5g4x:hv9va9r4onbd5r39d79sb5bade@ds043082.mlab.com:43082/heroku_2s9g5g4x
// Database configuration
// Save the URL of our database as well as the name of our collection

var connection = {
    dev: {
        databaseName: "stratplanner",
        databaseUrl: "localhost",
        collections: ["teams", "users"],
        user: null,
        password: null
    },
    prod: {
        databaseName: "stratplanner",
    }
};

//Select the appropriate environment based on the current environment
var dev = connection.dev;
var prod = connection.prod;
var db = {};

if (env == 'prod') {
    console.log("Attempting to connect to production Mongo Instance");
    db = mongojs(MONGODB_URI);
} else {
    console.log("Attempting to connect to development Mongo Instance");
    db = mongojs(dev.databaseName, dev.collections);
}


module.exports = db;