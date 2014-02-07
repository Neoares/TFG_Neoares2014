var server = require("./assets/js/server");
var router = require("./assets/js/router");
var requestHandlers = require("./assets/js/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;

//server.iniciar(router.route, handle);
server.iniciar();