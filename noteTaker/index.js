var express = require("express");
var fs = require("fs");
var path = require("path");

// Create express server
var app = express();
// Set port
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Note page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Set up routes
// GET
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", function(error, data) {
    if (error)
      return console.log(error);
    return res.json(JSON.parse(data));
  });
});
// POST
app.post("/api/notes", function(req, res) {
  console.log(req.body);
});
// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
