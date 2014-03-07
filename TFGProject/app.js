
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

var app = express();

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
app.get('/players', player.index);
app.get('/players/:name', player.show);
app.get('/game', game.index);

app.post('/playerCreate', player.create);
app.post('/playerRemove', player.remove);

app.post('/userCreate', user.create);

app.post('/enterGame', user.check);

db.init();

/*
 * Creates the server listening on port 'port'.
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
