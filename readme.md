




RESTFUL ROUTS
name       url                             verb    desc
====================================================================
INDEX     /campgrounds                     GET     Get all campgrounds
NEW       /campgrounds/new                 GET     Display form to post new campground
CREATE    /campgrounds                     POST    Create a new campground
SHOW      /campgrounds/:id                 GET     Display specific campground discription

For comments

NEW       /campgrounds/:id/comments/new    GET     form to create a new comment
CREATE    /campgrounds/:id/comments        POST    Create a new comment for a campground