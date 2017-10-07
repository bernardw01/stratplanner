let env = process.env.NODE_ENV || "development";
let MONGODB_URI = process.env.MONGODB_URI || null;

module.exports = {
    getConnectString: function () {
        if (env === 'production') {
            console.log("Server running in production environment");
            return MONGODB_URI;
        } else {
            console.log("Server running on the localhost");
            return "mongodb://localhost/stratplanner2";
        }
    }
};
