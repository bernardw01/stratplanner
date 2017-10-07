var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    comments: [{body: String, date: Date, userName: String}],
    first_name: {
        type: String,
        trim: true,
        required: "First name is Required"
    },
    last_name: {
        type: String,
        trim: true,
        required: "Last name is Required"
    },
    mi: String,
    user_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
        required: "Email is required"
    },
    job_title: String,
    job_role: String,
    team_membership: Array,
    tags: Array,
    address: String,
    city: String,
    state: String,
    zip: String,
    cell_phone: String,
    home_phone: String,
    current_manager_id: String,
    roles: {
        admin: Boolean,
        user: Boolean,
        super_user: Boolean,
        manager: Boolean,
    },
    reviews: Array

});

var User = mongoose.model('User', userSchema)

module.exports = User;