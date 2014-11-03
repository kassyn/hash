Module( 'JEDAI.Logic', function(Logic) {
		
	var MAX_ROWS    = 3
	  , MAX_COLUMNS = 3
	;

	Logic.fn.initialize = function() {
		this.table     = this.getEmptyTable();
		this.symbol    = -1;
		this.positions = [];
	};

	Logic.fn.isPointerAvailable = function(x, y) {
		return ( !this.table[x][y] );
	};

	Logic.fn.getEmptyTable = function() {
		return [
		    [0, 0, 0],
		    [0, 0, 0],
		    [0, 0, 0]
		];
	};

	Logic.fn.clear = function() {
		this.table     = this.getEmptyTable();
		this.positions = [];
	};

	Logic.fn.setPointer = function(x, y) {
		this.table[x][y] = this.symbol;
	};

	Logic.fn.rendered = function() {
		return Handlebars.templates.table( this.table );
	};

	Logic.fn.isWinner = function() {
		return ( 
			this.hasWinnerDiagonal()       ||
			this.hasWinnerLine( 'row' )    ||
			this.hasWinnerLine( 'column' )
		);
	};	

	Logic.fn.isAllPopulate = function() {
		for ( var row = 0; row < MAX_ROWS; row++ ) {
			for ( var col = 0; col < MAX_COLUMNS; col++ ) {
				if ( !( this.table[row][col] ) ) {
					return false;
				}
			}
		}
		
		return true;
	};

	Logic.fn.hasWinnerLine = function(type) {
		var sum    = 0
		  , triple = ( this.symbol * 3 );

		for ( var row = 0; row < MAX_ROWS; row++ ) {
			for ( var col = 0; col < MAX_COLUMNS; col++ ) {
				sum += ( type == 'row' ? this.table[row][col] : this.table[col][row] );
				//set positions possible winner
				this.positions.push( ( type == 'row' ? [ row, col ].join( ',' ) : [ col, row ].join( ',' ) ) );
			}

			if ( sum == triple ) {
				return true;
			}

			this.positions = [];
			sum            = 0;
		}
		
		return false;
	};

	Logic.fn.hasWinnerDiagonal = function() {		
		var triple = ( this.symbol * 3 );

		if ( ( this.table[0][0] + this.table[1][1] + this.table[2][2] ) == triple ) {
			this.positions = [ '0,0', '1,1', '2,2' ];
			return true;
		}

		if ( ( this.table[0][2] + this.table[1][1] + this.table[2][0] ) == triple ) {
			this.positions = [ '0,2', '1,1', '2,0' ];
			return true;
		}

		this.position = [];
		return false;
	};

});	