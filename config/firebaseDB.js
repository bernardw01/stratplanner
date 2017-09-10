var firebase = require('firebase');
var moment = require("moment");


var config = {
    apiKey: "AIzaSyBPe65KqvuSXl5O7ZWEaAX7DbUzzhjx1_4",
    authDomain: "stratplanner-179201.firebaseapp.com",
    databaseURL: "https://stratplanner-179201.firebaseio.com",
    projectId: "stratplanner-179201",
    storageBucket: "stratplanner-179201.appspot.com",
    messagingSenderId: "78793308042"
};

var app = firebase.initializeApp(config);

var Firebase = function () {
    this.addEventLogEntry = function (userEmail, eventType, eventText) {
        console.log('---------Add Event function');
        //Prepare the user object
        var event = {
            userEmail: userEmail,
            eventType: eventType,
            eventText: eventText,
            eventDate: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
            //latitude: sessionStorage.getItem('currentLat'),
            //longitude: sessionStorage.getItem('currentLong'),
        };

        //Get a unique key
        //Get a key for a new Post.
        var newEventID = app.database().ref().child('events').push().key;

        //Add the event
        app.database()
            .ref('events/' + newEventID)
            .set(event);
    };

    this.findAll = function (collectionName, callback) {
        mongo.connect(connectInfo.getConnectString(), function (err, db) {
            assert.equal(null, err);
            db.collection(collectionName).find({}).toArray(function (err, data) {
                assert.equal(err, null);
                callback(data);
            });
        });
    };
    this.insert = function (collectionName, doc, callback) {
        var newDate = moment(Date.now());
        var lastUpdated = {
            unixTimeStamp: Date.now(),
            formattedDate: newDate.format('MM/DD/YYYY HH:mm')
        };

        doc.lastUpdated = lastUpdated;
        //Get a unique key
        //Get a key for a new Post.
        var newID = app.database().ref().child(collectionName).push().key;

        //Add the event
        app.database()
            .ref(collectionName + '/' + newID)
            .set(docArray);

        callback(response)
    };
};


module.exports = Firebase;

