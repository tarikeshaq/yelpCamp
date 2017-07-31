var express               = require("express"), 
    app                   = express(), 
    bodyParser            = require("body-parser"), 
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    flash                 = require("connect-flash"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    Campground            = require("./models/campgrounds"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user"), 
    seedDB                = require("./seeds"),
    expressSanitizer      = require("express-sanitizer");
    
    
// Requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp_13", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//seedDB(); // Seed the database
//====================
// PASSPORT CONFIG
//====================
app.use(require("express-session")({
    secret: "dude you are one sick mofu if you find this",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//====================
// Importing Routes
//====================

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//Listen for PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Inititated");
});

