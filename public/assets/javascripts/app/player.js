Module( 'JEDAI.Player', function(Player) {

	Player.fn.initialize = function(container, attrs) {
		this.container  = container;
		this.table      = this.container.byElement( 'draw-table' );
		this.winner     = this.container.byElement( 'winner' );
		this.loser      = this.container.byElement( 'loser' );
		this.profile    = this.container.byElement( 'profile' );
		this.equalizer  = this.container.byElement( 'equalizer' );
		this.identifier = ( new Date() ).getTime();
		this._isLock    = true;
		this._isLoser   = false;
		this.logic      = null;
		this.name       = null;
		this.avatar     = null;
		this._assign( attrs );
	};

	Player.fn.init = function() {
		this._registerHelper();
		this._initDependence();
		this.addUser();
		this.addEventListner();

		this.show();
	};

	Player.fn.addUser = function() {
		JEDAI.socket.emit( 'add user', this.toAttrsObject() );
	};

	Player.fn.renderProfile = function() {
		this.profile.html( Handlebars.templates.user( this.toAttrsObject() ) );
		this.profile.showCSS();
	};

	Player.fn.show = function() {
		this.table.showCSS();
	};

	Player.fn.toAttrsObject = function() {
		return {
			name       : this.name,
			avatar     : this.avatar,
			identifier : this.identifier,
			symbol     : this.logic.symbol,
			table      : this.logic.table,
			positions  : this.logic.positions
		};
	};	

	Player.fn._assign = function(attrs) {
		$.extend( this, attrs );
	};

	Player.fn.addEventListner = function() {
		JEDAI.socket
			.on( 'set symbol', this._onSocketSetSymbol.bind( this ) )
			.on( 'render table', this._onSocketRenderTable.bind( this ) )
			.on( 'unlock player', this._onSocketUnlock.bind( this ) )
			.on( 'loser player', this._onSocketLoserPlayer.bind( this ) )
			.on( 'equalizer player', this._onSocketEqualizerPlayer.bind( this ) )
			.on( 'new game', this._onSocketNewGame.bind( this ) )
		;

		this.container
			.on( 'click', '[data-position]', this._onClickPosition.bind( this ) )
			.on( 'click', '[data-action=again]', this._onClickActionAgain.bind( this ) )
		;
	};

	Player.fn._onClickActionAgain = function() {
		this.reset();
		this.draw();

		JEDAI.socket.emit( 'again player' );
	};

	Player.fn.reset = function() {
		this.logic.clear();
		this.winner.hideCSS();
		this.loser.hideCSS();
		this.equalizer.hideCSS();

		this._isLock  = false;
		this._isLoser = false;
	};

	Player.fn._onClickPosition = function(event) {
		var position = event.target.dataset.position;

		this.setPositionLogic.apply( this, position.split( ',' ) );
	};

	Player.fn.setPositionLogic = function(x, y) {
		if ( this._isLock || this._isLoser ) {
			return;
		}

		if ( !this.logic.isPointerAvailable( x, y ) ) {
			return;
		}

		this._isLock = true;
		this.insert( x, y );
	};

	Player.fn.insert = function(x, y) {
		this.logic.setPointer( x, y );
		this.draw();

		JEDAI.socket.emit( 'set table', this.toAttrsObject() );

		if ( this.logic.isWinner() ) {
			this.setStatusWinner();
			JEDAI.socket.emit( 'set winner', this.toAttrsObject() );
			return;
		}

		if ( this.logic.isAllPopulate() ) {
			this.setStatusEqualizer();
			JEDAI.socket.emit( 'all equalizer' );
		}
	};

	Player.fn.setStatusEqualizer = function() {
		this.equalizer.showCSS();
	};

	Player.fn.setStatusWinner = function() {
		this.winner.showCSS();
		this.setHighLightPositions();
	};

	Player.fn.setHighLightPositions = function(positions) {
		positions = ( positions || this.logic.positions );

		positions.forEach( this.setWinnerButton.bind( this ) );
	};

	Player.fn.setWinnerButton = function(position) {
		this.container
			.find( '[data-position="' +  position + '"]' )
			.addClass( 'winner' )
		;
	};

	Player.fn._onSocketRenderTable = function(table) {
		this.logic.table = table;
		this.draw();
	};

	Player.fn._onSocketUnlock = function() {
		this._isLock = false;
	};

	Player.fn._onSocketLoserPlayer = function(player) {
		this._isLoser = true;
		this.loser.showCSS();
		this.setHighLightPositions( player.positions );
	};

	Player.fn._onSocketNewGame = function() {
		this.reset();
		this.draw();
	};

	Player.fn._onSocketEqualizerPlayer = function() {
		this.setStatusEqualizer();
	};

	Player.fn.draw = function() {
		this.table.html( this.logic.rendered() );
	};

	Player.fn._onSocketSetSymbol = function(symbol) {
		this._isLock      = false;
		this.logic.symbol = symbol;
		this.renderProfile();
	};

	Player.fn._registerHelper = function() {
		Handlebars.registerHelper( 'define-symbol', function(symbol) {
			return ( symbol && ( symbol == 1 ? 'x' : 'o' ) || '' );
		});
	};

	Player.fn._initDependence = function() {
		this.logic = JEDAI.Logic();
	};

});