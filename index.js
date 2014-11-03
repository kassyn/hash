var express = require( 'express' ) 
  , app     = express()
  , http    = require( 'http' ).Server( app )
  , io      = require( 'socket.io' )( http )  
;

var __public = __dirname + '/public';

//vars control game
var players = []
  , symbols = [1, 5]
;

var MAX_PLAYERS = 2;

app.use( express.static( __public ) );

app.get( '/', function(req, res) {
  res.sendFile( __public + '/index.html' );
});

io.on( 'connection', function(socket) {
  
    if ( players.length >= MAX_PLAYERS ) {
        return;
    }

    socket.on( 'add user', function(player) {
        player.symbol = symbols.shift();
        socket.player = player;
        
        players.push( player );
        socket.emit( 'set symbol', player.symbol );
        socket.emit( 'set players', players );
    });

    socket.on( 'set table', function(player) {
        socket.broadcast.emit( 'render table', player.table );
        socket.broadcast.emit( 'unlock player' );
    });

    socket.on( 'again player', function() {
        socket.broadcast.emit( 'new game' );
    });

    socket.on( 'all equalizer', function() {
        socket.broadcast.emit( 'equalizer player' );
    });

    socket.on( 'set winner', function(player) {        
        socket.broadcast.emit( 'winner player', player );
        socket.broadcast.emit( 'loser player', player );
    });

    socket.on( 'disconnect', function() {
        if ( socket.player ) {
            removePlayer( socket.player );
        }
    });

});

http.listen( 3000, function() {
    console.log( 'listening on *:3000' );
});

function removePlayer(player) {
    players = players.filter(function(item) {
        return item.identifier != player.identifier;
    });

    //return symbol in array
    symbols.push( player.symbol );
}