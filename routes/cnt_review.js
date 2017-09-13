var express = require('express');

// Requiring our models
var db = require("../models/review");
var dbUser = require("../models/user");

var router = express.Router();

"use strict";
var review = new db();
var user = new dbUser();

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {
// find everything
    review.findAll(function (data) {
        res.json(data);
    });

});

router.post("/addnew", function (req, res) {
    var newReview = {
        review_period_start: req.body.review_period_start,
        review_period_end: req.body.review_period_end,
        user_id: req.body.user_id,
        reviewer_id: req.body.reviewer_id,
        rating: req.body.rating,
        review_text: req.body.review_text,
        type: req.body.type,
        review_status: req.body.review_status
    }
    review.addNew(newReview, function (data) {
        var reviewKey = data.ops[0]._id;
        //console.log("Review ID:",reviewID);
        //Update the user and set the review array to contain the review id
        user.addReview(newReview.user_id, reviewKey, function (revData) {

            res.json(data + revData);
        });
    });
});

router.post("/update", function (req, res) {
    var newReview = {
        review_id: req.body.key,
        review_period_start: req.body.review_period_start,
        review_period_end: req.body.review_period_end,
        user_id: req.body.user_id,
        rating: req.body.rating,
        review_text: req.body.review_text,
        type: req.body.type,
        review_status: req.body.review_status
    }
    review.update(req.body.key, newReview, function (data) {
        res.json(data);
    });
});

router.post("/delete", function (req, res) {

    review.delete(req.body.key, function (data) {
        res.json(data);
    });
});

module.exports = router;