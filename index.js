/*@VinayKhedekar
  Program for using diet.js for chatterbox application
  use of diet.js API's to get file path and error page
*/
// Create an app
var server = require('diet')
var wss = require("./websockets-server");
var app = server()
var fs = require('fs')
app.listen('http://localhost:8000')

// Require the diet-static module and configure it
var diet_static_module = require('diet-static')({
  path: app.path + '/app/'
})

app.footer(diet_static_module)
app.view('file', diet_static_module)

// index page
app.get('/', function($) {
  $.redirect('index.html')
})

// When invalid path entered show error page 404 not found
app.missing(function($) {
  // set "Content-Type" header to "text/html"
  	$.header('Content-Type', 'text/html')
    $.status('404', 'File not found')
    fs.readFile(__dirname+'/app/error.html',function(error, content){
    	// handle error
    	if(error) throw error;
    	// Serve the file to the client
        $.end(content.toString())
    })
})
// Subscribe to all error events
app.error(function($, middleware) {
  // Log the error
  console.trace('Something bad happened.', $.status, $.error.message)
})
