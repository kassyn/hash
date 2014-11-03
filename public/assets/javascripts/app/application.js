Module( 'JEDAI.Application', function(Application) {	

	Application.init = function(container) {
		JEDAI.socket = io();
	};

	Application.home = function(container) {
		
	};

	Application.register = function(container) {
		var form = container.byElement( 'form' );

		form.on( 'submit', function(event) {
			event.preventDefault();

			form.hideAnimateCSS();	

			JEDAI.Player(
				  container
				, form.transformInObject()
			).init();
		});
	};

}, {} );