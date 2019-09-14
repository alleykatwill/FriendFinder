// npm packages that we will use to give our server useful functionality

var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server.
var app = express();

// Sets initial port.
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// starts the server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
