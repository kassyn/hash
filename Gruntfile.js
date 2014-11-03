module.exports = function(grunt) {
	var config = {
		package : grunt.file.readJSON( 'package.json' ),

		concat : {
		    options : {
				separator : ';'
		    },
		    site : {
				src : [
					'public/assets/javascripts/libs/*.js',
					'public/assets/javascripts/templates/*.js',
					'public/assets/javascripts/vendor/*.js',
					'public/assets/javascripts/app/*.js',
					'public/assets/javascripts/boot.js'
				],
				dest : 'public/built.js',
		    },
  		},

  		jshint: {
			options: {
				jshintrc : true
			},
    		beforeconcat : '<%= concat.site.src %>'    		
  		},

  		uglify : {
			site : {
				files : {
					'<%= concat.site.dest %>' : '<%= concat.site.dest %>'
				}
			}
    	},

		watch: {
		    script : {
		    	files : '<%= concat.site.src %>',
		    	tasks : ['jshint', 'concat']
		    }
  		},
	};

	grunt.initConfig( config );
	
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.registerTask( 'js', ['jshint', 'concat'] );
	grunt.registerTask( 'jsmin', ['jshint', 'concat', 'uglify'] );
};