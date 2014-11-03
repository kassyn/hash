$(function() {
	var context = $( 'body' );
	//app, route, args
	Route( JEDAI.Application, context.data( 'route' ), [context] );
});