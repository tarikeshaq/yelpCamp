var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

//COMMENTS NEW
router.get("/new",middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground, currentUser: req.user});
        }
    });
});

//COMMENTS POST
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    //Add comment to the camground with id
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(function (err){
                        if(err){
                            console.log(err);
                        }
                    });
                    foundCampground.comments.push(comment);
                    foundCampground.save(function(err){
                        if(err) {
                            console.log(err);
                            res.redirect("/campgrounds");
                        }
                        req.flash("success", "Comment Posted!");
                        res.redirect("/campgrounds/" + req.params.id);
                    });
                }
            });
        }   
    });
});

//EDIT COMMENT
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership , function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            req.flash("error", "Error Locating Campground");
            res.redirect("/campgrounds");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err) {
                    req.flash("error", "Error Locating Comment");
                    res.redirect("/campgrounds");
                } else {
                    res.render("comments/edit", {campground: foundCampground, currentUser: req.user, comment: foundComment});
                }
            });
        }
    });
});

//UPDATE comment
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, UpdatedComment){
        if(err) {
            req.flash("error", "Could Not Update Comment, Try Again");
            res.redirect("back");
        } else {
            req.flash("success", "Comment Successfully Updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY comment
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            req.flash("error", "Could Not Delete Comment, Try Again");
            res.redirect("back");
        } else {
            req.flash("success", "Comments Successfully Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


module.exports = router;