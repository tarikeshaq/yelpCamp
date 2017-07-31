var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// ROOT
router.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});


//====================================
//AUTH ROUTES
//====================================

//SHOW REGISTER
router.get("/register", function(req, res) {
    res.render("register", {currentUser: req.user});
});

//Handles register
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Successfullly Signed Up as " + req.user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//Login 
router.get("/login", function(req, res) {
    res.render("login", {currentUser: req.user});
});

//Handels Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: "Invalid Username or Password",
    successFlash: "Logged in Successfully"
}), function(req, res){
    req.flash("success", "Successfully Logged In as " + req.user.username);
});

// Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect("/campgrounds");
});


module.exports = router;