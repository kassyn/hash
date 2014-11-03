;(function(context) {

	'use strict';

	function call(callback, args) {
		if ( typeof callback === 'function' ) {
			callback.apply( null, ( args || [] ) );
		}		
	}

	function Route(application, route, args) {
		//execute all application
		call( application.init, args );
		call( application[route], args );
	}

	context.Route = Route;

})( window );