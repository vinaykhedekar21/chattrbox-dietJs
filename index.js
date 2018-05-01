/*@VinayKhedekar
  Program for using diet.js for chatterbox application
  use of diet.js API's to get file path and error page
*/
// Create an app
var server = require('diet')
var wss = require("./websockets-server");
var app = server()
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
  $.redirect('/error.html')
  //$.status('404', 'File not found')
  //$.end($.statusCode + ' ' + $.statusMessage) // 404 Page Not Found

})
// Subscribe to all error events
app.error(function($, middleware) {
  // Log the error
  console.trace('Something bad happened.', $.status, $.error.message)
})
