var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middlewareObj = require("../middleware");
// INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
    // get all campgrounds
    Campground.find({}, function(err, campgrounds){
        if(err) {
            console.log("Something wrong happened");
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    });
});

//CREATE - CREATE A NEW CAMPGROUND
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name= req.body.name;
    var imageUrl = req.body.image;
    var desc = req.body.description;
    var id = req.user._id;
    var username = req.user.username;
    var author = {id, username};
    var price = req.body.price;
    var newCampground = {name: name, image: imageUrl, description: desc, author: author, price: price};
    // redirect to the route
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            req.flash("error", "Failed To Create Campground, Try Again");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Successfully Created");
            res.redirect("/campgrounds");
        }
    });
});

// NEW - DISPLAY FORM TO CREATE CAMPGROUND
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("campgrounds/new", {currentUser: req.user});
});

//SHOW  - shows more info about one campground
router.get("/:id", function(req, res) {
    // find campground with provided ID, 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership , function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground, currentUser: req.user});
    }); 
});

//UPDATE ROUTE
router.put("/:id", middlewareObj.checkCampgroundOwnership , function (req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
       if(err) {
           req.flash("error", "Could Not Update Campground, Try Again");
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Campground Successfullly Updated");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY Route
router.delete("/:id", middlewareObj.checkCampgroundOwnership , function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
        }
        req.flash("error", "Campground Successfly Deleted");
        res.redirect("/campgrounds");
    });
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCampgroundOwnership(req, res, next) {
//     if(req.isAuthenticated()) {
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if (err){
//                 res.redirect("back");
//             } else if (foundCampground.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 res.redirect("back");
//             }
//         }); 
//     } else {
//         res.redirect("back");
//     }
// }

module.exports = router;
