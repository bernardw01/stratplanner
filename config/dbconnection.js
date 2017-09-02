var mongojs = require("mongojs");
var env = process.env.NODE_ENV || "dev";

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
        databaseUrl: "ds043082.mlab.com:43082",
        collections: ["teams"],
        user: "heroku_2s9g5g4x",
        password: "Lexicon1"
    }
};

//Select the appropriate environment based on the current environment
var dev = connection.dev;
var prod = connection.prod;
var db = {};

if (env == 'prod') {
    console.log("Attempting to connect to production Mongo Instance");
    db = mongojs(prod.user + ':' + prod.password + "@" + prod.databaseUrl + "/" + prod.databaseName, prod.collections);
} else {
    console.log("Attempting to connect to development Mongo Instance");
    db = mongojs(dev.databaseName, dev.collections);
}


module.exports = db;