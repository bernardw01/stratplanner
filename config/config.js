let env = process.env.NODE_ENV || "dev";
let MONGODB_URI = process.env.MONGODB_URI || null;

module.exports = {
    getConnectString: function () {
        if (env === 'prod') {
            console.log("Server running in production environment");
            return MONGODB_URI;
        } else {
            console.log("Connected correctly to local server");
            return "mongodb://localhost/stratplanner";
        }
    }
};
