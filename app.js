var express = require('express');

var app = express();

app.listen(env.NODE_PORT || 2080, env.NODE_IP || 'localhost', function () {
	  console.log('Application running in 2080');	 
	});