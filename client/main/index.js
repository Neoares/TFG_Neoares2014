var utils = require('./utils.js');
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8888');
ws.on('open', function() {
    ws.send('something');
    
});
ws.on('message', function(data, flags) {
    // flags.binary will be set if a binary data is received
    // flags.masked will be set if the data was masked
	console.log('received: %s', data);
	if (flags.binary){console.log('Me has enviado un binario');} else { console.log('No me has enviado un binario');}
});