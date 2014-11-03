;(function($) {
	
	$.fn.byElement = function(attr) {
		return this.find( '[data-element-' + attr + ']' );
	};

	$.fn.isExist = function(selector, callback) {
		var element = $( this ).find( selector );

		if ( element.length && typeof callback == 'function' ) {
			callback.call( null, element, $( this ) );
		}

		return element.length;
	};

	$.fn.hideAnimateCSS = function() {
		this.removeClass( 'show-element' )
			.addClass( 'hide-element' )
		;	
	};

	$.fn.showAnimateCSS = function() {
		this.removeClass( 'hide-element' )
			.addClass( 'show-element' )
		;
	};

	$.fn.hideCSS = function() {
		this.removeClass( 'show' )
			.addClass( 'hide' )
		;	
	};

	$.fn.showCSS = function() {
		this.removeClass( 'hide' )
			.addClass( 'show' )
		;
	};

	$.fn.transformInObject = function() {
		var serialize = this.serialize()
		  , returned  = {}
		  , separate  = false
		;

		function urlDecode(url) {
			var decode = decodeURIComponent( url );
			return decode.replace( /\+/g, ' ' );
		}

		if ( !serialize ) {
			return returned;
		}

		serialize.split( '&' ).forEach(function(partial) {
			separate              = partial.split( '=' );
			returned[separate[0]] = urlDecode( separate[1] );
		});

		return returned;
	};

})( Zepto );
