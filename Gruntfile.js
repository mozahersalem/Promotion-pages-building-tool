module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*\n' +
		' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed MIT\n' +
		' */\n\n',
		meta: {
			version: '0.0.0'
		},

		pug: {
			release: {
				options: {
					data: {
						debug: false
					},
					pretty: true
				},
				files: {
					'dist/pug.index.html': 'pug/index.pug',
					'dist/pug.wifi.html': 'pug/wifi.pug'
				}
			}
		},

		'html-prettyprinter': {
			index: {
		      src: 'dist/pug.index.html',
		      dest: 'index.html',
		      options: {
		        indent_size: 1,
		        indent_char: '\t'
		      }
		    },
		    wifi: {
		      src: 'dist/pug.wifi.html',
		      dest: 'wifi.html',
		      options: {
		        indent_size: 1,
		        indent_char: '\t'
		      }
		    }
		},
		
		// concat all .js file to dist/app.js without minification
		concat: {
			options: {
				banner: '<%= banner %>',
				separator: '\n'
			},
			dist: {
				src: ['js/**/*.js'],
				dest: 'dist/app.js'
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
			options: {
				jshintrc: true
			}
		},
		// minify app.js to app/min.js
		uglify : {
			options: {
				mangle: {
					reserved: ['jQuery']
				}
			},
			js: {
				files: {
					'dist/app.min.js' : [ 'dist/app.js' ]
				}
			}
		},
		jasmine: {
			src: 'js/**/*.js',
			options: {
				specs: 'tests/test_*.js',
				helpers: 'tests/helpers/helper_*.js',
				vendor: 'vendor/**/*.js'
			}
		},
		less: {
			production: {
				options: {
					banner: '<%= banner %>',
					// paths for @import directives
					paths: [
					'less/'
					],
					outputSourceFiles: true
				},
				files: {
					'dist/global.css': 'less/global.less'
				}
			}
		},
		cssmin : {
			css:{
				src: 'dist/global.css',
				dest: 'dist/global.min.css'
			}
		},
		// Include app.js in index when (gulp watch), include app.min.js (gulp dist)
		include_js: {
			source: {
				files: {
					'index.html': ['dist/app.js']
				}
			},
			build: {
				files: {
					'index.html': ['dist/app.min.js']
				}
			}
		},
		// when run grunt dist embed all min file and create upload/index
		processhtml: {
			options: {
				// Task-specific options go here. 
			},
			dist: {
				files: {
					'upload/index-unmin.html': ['index.html'],
					'upload/wifi-unmin.html': ['wifi.html']
				}
			}
		},
		htmlmin: {     
			dist: {    
				options: { 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'upload/index.html': ['upload/index-unmin.html'],     
					'upload/wifi.html': ['upload/wifi-unmin.html'],   
					'upload/success.html': ['thank_you/success.html']   
				},
			}
		},
		watch: {
			scripts: {
				files: ['<%= jshint.files %>', 'js/**/*.js', 'less/**/*.less', 'pug/**/*.pug'],
				tasks: ['pug', 'html-prettyprinter', 'concat', 'less'], // templates here ,  'jshint', 'jasmine'
				options: {
					livereload: true,
					debounceDelay: 2000,
				},
			},
		},

	});



		// basics
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-jasmine');

		// pug to html
		grunt.loadNpmTasks('grunt-contrib-pug');
		// indent html output from pug
		grunt.loadNpmTasks('grunt-html-prettyprinter');


		// css framework
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		
		grunt.loadNpmTasks('grunt-contrib-uglify');

		// default
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-watch');
		
		// html include
		grunt.loadNpmTasks('grunt-include-js');
		grunt.loadNpmTasks('grunt-processhtml');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');

		// tasks
		grunt.registerTask('test',    ['jshint', 'jasmine']);
		grunt.registerTask('default', ['pug', 'html-prettyprinter', 'concat', 'less', 'include_js:source']);
		grunt.registerTask('dist',    ['uglify:js', 'cssmin', 'include_js:build', 'processhtml', 'htmlmin' ]);

	};