var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's eggs",
            image: "https://www.campsitephotos.com/photo/camp/8396/Dogwood_04.jpg",
            description: "Lorem ipsum dolor sit amet, varius amet dapibus, in eget neque integer lacus, sapien dis vitae integer aenean, imperdiet rutrum sed. Nisl nulla velit vestibulum montes, potenti donec risus erat. Dolor at viverra augue blandit, gravida pede, luctus nibh sed hac mi rutrum, pellentesque iaculis. Urna turpis arcu nunc pretium scelerisque, sollicitudin commodo turpis eget, vestibulum velit fusce wisi nunc pede. Augue non tellus id. In malesuada vel nec lorem."
        },
        {
            name: "Mom's Kid",
            image: "https://www.campsitephotos.com/photo/camp/11549/Ellery_Creek_001.jpg",
            description: "Lorem ipsum dolor sit amet, varius amet dapibus, in eget neque integer lacus, sapien dis vitae integer aenean, imperdiet rutrum sed. Nisl nulla velit vestibulum montes, potenti donec risus erat. Dolor at viverra augue blandit, gravida pede, luctus nibh sed hac mi rutrum, pellentesque iaculis. Urna turpis arcu nunc pretium scelerisque, sollicitudin commodo turpis eget, vestibulum velit fusce wisi nunc pede. Augue non tellus id. In malesuada vel nec lorem."
        },
        {
            name: "Lambo Lingre",
            image: "https://www.campsitephotos.com/photo/camp/7991/Lake_Powell_Wahweap_Campground_Lakeview.jpg",
            description: "Lorem ipsum dolor sit amet, varius amet dapibus, in eget neque integer lacus, sapien dis vitae integer aenean, imperdiet rutrum sed. Nisl nulla velit vestibulum montes, potenti donec risus erat. Dolor at viverra augue blandit, gravida pede, luctus nibh sed hac mi rutrum, pellentesque iaculis. Urna turpis arcu nunc pretium scelerisque, sollicitudin commodo turpis eget, vestibulum velit fusce wisi nunc pede. Augue non tellus id. In malesuada vel nec lorem."
        }
    ];



function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Campgrounds");
            // data.forEach(function(seed){
            //   Campground.create(seed, function(err, campground){
            //       if (err) {
            //           console.log(err);
            //         } else {
            //           console.log("Added Campground");
            //           //Create a comment
            //             Comment.create({
            //              text: "I love this place!",
            //              author: "Jonny"
            //             }, function(err, comment){
            //                 if (err){
            //                     console.log(err);
            //                 } else {
            //                     campground.comments.push(comment);
            //                     campground.save(function(err){
            //                         if (err) {
            //                           console.log(err);
            //                         } else {
            //                           console.log("Created New Comment!");
            //                         }
            //                     });
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });
    // add a few Campgrounds]

    
    // add a few comments
    
}

module.exports = seedDB;