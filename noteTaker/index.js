var express = require("express");
var fs = require("fs");
var path = require("path");
var util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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
  app.get("/api/notes",async function(req, res) {
    var data = await readFileAsync("./db/db.json","utf8");
    return res.json(JSON.parse(data));
  });
  // POST
  app.post("/api/notes",async function(req, res) {
    // load data
    var data = await readFileAsync("./db/db.json","utf8");
    data = JSON.parse(data);
    // Append new data into file
    data.push(req.body);
    await writeFileAsync("./db/db.json",JSON.stringify(data));
    return res.json(data);
  });
  // DELETE
  app.delete("/api/notes/:id",async function(req, res) {

  });

  // Start the server
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
