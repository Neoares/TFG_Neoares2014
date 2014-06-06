
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var http = require('http');
var path = require('path');

var db = require('./db/mainDB');

var index = require('./routes/index');
var player = require('./routes/player');
var user = require('./routes/user');
var game = require('./routes/game');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// all environments
app.set('port', process.env.PORT || 3000);	//sets the port number.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({
	  store: new MongoStore({
	    db: 'test',
	    host: 'localhost',
	    port: 27017
	  }),
	  secret: 'AW350M3'
	}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * Defines which method is going to be called when the browser goes
 * to the indicated path.
 * app.method(route, action);
 */
app.get('/', routes.index);
//app.get('/players', player.index);
//app.get('/players/:name', player.show);
app.get('/signUp', function(req,res){res.render('signup')});

app.get('/game', game.index);
app.get('/game/index', game.index);	//go to the main game page
app.get('/game/resources', game.resources);
app.get('/game/buildings', game.buildings);
app.get('/game/research', game.research);
app.get('/game/mercenaries', game.mercenaries);
app.get('/game/empire', game.empire);
app.get('/logout', game.logout);

app.post('/playerCreate', player.create);
app.post('/playerRemove', player.remove);

app.post('/userCreate', user.create);
app.post('/enterGame', user.check);

app.post("/upgrade", game.upgrade);
app.post("/hire", game.hire);
app.post("/attack", game.attack);

db.init(io);

/*
 * Creates the server listening on port 'port'.
 */
/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

io.on('connection', function(){ 
	console.log('Express server listening on port ' + app.get('port'));
	//console.log('socket: '+socket);
});
/*io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);
});*/
server.listen(3000);
