// All the middleware goes here
var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");



middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have authorization to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                next();
                } else {
                req.flash("error", "You do not have authorization to do that");
                res.redirect("back");
                }
            }
        }); 
        
    } else {
        req.flash("error", "Please Login");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
        if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login");
    res.redirect("/login");
};

module.exports = middlewareObj;