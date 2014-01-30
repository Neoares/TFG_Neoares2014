var utils = require('./utils.js');

function iniciar(response, request) {
  console.log("Manipulador de petici�n 'iniciar' fue llamado.");
  var postHTML = '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post" action="/subir">' +
  'Your Fist Name: <input name="first_name"><br>' +
  'Your Last Name: <input name="last_name"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(postHTML);
  response.end();
}

function subir(response, request) {
	console.log("Manipulador de petici�n 'subir' fue llamado.");
	response.writeHead(200, {"Content-Type": "text/html"});
	var body = "";
	request.on('data', function (chunk) {
		body += chunk;
	});
	request.on('end', function () {
		console.log('POSTed: ' + body);
	
		if (body != ''){
			var hash = utils.formValues(body);
	 
			 console.log("input1 = " + hash["first_name"]);
			 console.log("input2 = " + hash["last_name"]);
	 
			 response.writeHead(200);
			 response.write('Hello ' + hash["first_name"] + ', ' + hash["last_name"] + '!');
			 response.end();
			 return;
		}
	response.writeHead(200);
	response.end(postHTML);
	});
}

exports.iniciar = iniciar;
exports.subir = subir;