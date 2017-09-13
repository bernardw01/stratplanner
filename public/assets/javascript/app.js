/**
 * Created by bernardwilliams on 8/31/17.
 */
var sessionUser = sessionStorage.getItem('email');

var config = {
    apiKey: "AIzaSyBPe65KqvuSXl5O7ZWEaAX7DbUzzhjx1_4",
    authDomain: "stratplanner-179201.firebaseapp.com",
    databaseURL: "https://stratplanner-179201.firebaseio.com",
    projectId: "stratplanner-179201",
    storageBucket: "stratplanner-179201.appspot.com",
    messagingSenderId: "78793308042"
};

$(document).ready(function () {
    $('.panel').hide();
    hideMenuItems();
    var initApp = function () {

        // Initialize Firebase

        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                // User is signed in.
                $('#loginBanner').hide();
                $('#signOutLink').show();
                $('#signInLink').hide();
                console.log('Signing in a user ' + moment(Date.now()).calendar());
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;

                user.getToken().then(function (accessToken) {
                    console.log('Function get token');

                    sessionStorage.setItem('displayName', displayName);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('emailVerified', emailVerified);
                    sessionStorage.setItem('photoURL', photoURL);
                    sessionStorage.setItem('uid', uid);
                    sessionStorage.setItem('phoneNumber', phoneNumber);
                    sessionStorage.setItem('providerData', providerData);

                    //Write the current login back to the database
                    //updateUser(userProfileKey, userUpdate);

                    //Go back to the data base and get the user role based on the logged in user.
                    $('#currentUserImage').attr('src', photoURL);
                    $('#currentUserImage').attr('width', '48px');
                    $('#currentUserName').text(displayName);
                    $('#currentUserInfo').text(email);
                    getUserProfile(email);
                    $('.panel').show();
                });
            } else {
                // User is signed out.
                $('#signOutLink').hide();
                $('#signInLink').show();
                $('#sign-in-status').text('You are currently signed out');
            }
        }, function (error) {
            console.log(error);
        });
    };
    initApp();
});

$('#signOutLink').click(function () {
    console.log('Signing out');
    firebase.auth().signOut().then(function () {
        $('#loginBanner').show();
        console.log('Signed Out');
        window.location.assign('/');
        sessionStorage.clear();
    }, function (error) {
        console.error('Sign Out Error', error);
    });
});

$('#signInLink').click(function () {
    $('#loginBanner').hide();
    console.log('Signing In');
    window.location.assign('/signin');
});

$("#myProfileBtn").click(function () {
    $("#myProfileSection").show();
    $("#myPeopleSection").hide();
    $("#adminSection").hide();
});

$("#myPeopleBtn").click(function () {
    $("#myProfileSection").hide();
    $("#myPeopleSection").show();
    $("#adminSection").hide();
});

$("#adminBtn").click(function () {
    $("#myProfileSection").hide();
    $("#myPeopleSection").hide();
    $("#adminSection").show();
    loadUsers();
});

function setAuthorizedMenu(userProfile) {
    //This method sets up the menu based on privileges of the signed in user.
    //is the person an admin?
    console.log(userProfile);
    if (userProfile.roles.admin) {
        $('#myPeopleBtn').show();
        $('#adminBtn').show();
    }
    //Is the person a people manager?
    if (userProfile.roles.people_manager) {
        $('#myPeopleBtn').show();
    }
    //is the person an authorized user?
    if (userProfile.roles.user) {
        $('#myProfileBtn').show();
    }
}

function getUserProfile(email) {

    console.log("Searching for this email:", email);
    let queryURL = "/api/user/findone"
    let options = {
        user_email: email
    };
    return $.ajax({
        url: queryURL,
        method: 'POST',
        data: options
    }).done(function (response) {
        sessionStorage.setItem('user_profile', response);
        console.log(response);
        setAuthorizedMenu(response);
    });
};

function hideMenuItems() {
    $('#myPeopleBtn').hide();
    $('#adminBtn').hide();
    $('#myProfileBtn').hide();
    $("#myProfileSection").hide();
    $("#myPeopleSection").hide();
    $("#adminSection").hide();
};

function loadUsers() {
    console.log("Searching for this email:", email);
    let queryURL = "/api/user/findall";
    let options = {
    };
    return $.ajax({
        url: queryURL,
        method: 'GET',
        data: options
    }).done(function (response) {
        console.log(response);
    });
};

