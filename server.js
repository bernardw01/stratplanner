//testing pull request
//Responding to new test
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var path = require("path");
var app = express();
var port = normalizePort(process.env.PORT || '3020');

"use strict";
app.set('port', port);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

//the css and image
app.use(express.static(path.join(__dirname, "/public")));


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var index_route = require("./routes/cnt_index.js");
app.use("/", index_route);
app.use("/signin", index_route);

var team_route = require("./routes/cnt_team.js");
app.use("/api/team", team_route);

var user_route = require("./routes/cnt_user.js");
app.use("/api/user", user_route);

var review_route = require("./routes/cnt_review.js");
app.use("/api/review", review_route);

app.listen(port,
    function () {
        console.log("App listening on PORT " + port);
    });


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
