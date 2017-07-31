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
          'css/'
          ],
          outputSourceFiles: true
        },
        files: {
          'dist/global.css': 'css/global.less'
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
    // when run grunt dist concat all min file and create upload/index
    processhtml: {
      options: {
        // Task-specific options go here. 
      },
      dist: {
        files: {
          'upload/index.html': ['index.html']
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>', 'js/**/*.js', 'css/**/*.less', 'index.html'],
        tasks: ['concat', 'less'], // templates here ,  'jshint', 'jasmine'
        options: {
          livereload: true 
        },
      },
    },
  });


    // basics
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

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

    // tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['watch', 'concat', 'less', 'include_js:source']);
    grunt.registerTask('dist', ['uglify', 'cssmin', 'include_js:build', 'processhtml']);

  };