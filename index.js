var express     = require("express"),
    bodyParser  = require("body-parser"),
    apiRoutes	= require("./routes/routes"),
    app         = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
    secret : "October API Project",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));

// Specify the path to routes
app.use("/", apiRoutes);

// Launch the server
var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("October app is being served at http://localhost:%s/", port);
});