var http = require("http");
const Airtable = require("airtable");

// connect to a base with the right credentials
// Check to airtable api for more information

// start an simple http server
http
  .createServer(function(req, res) {
    res.write("Hello World!!!\n"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
