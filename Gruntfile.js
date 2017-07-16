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

    concat: {
      options: {
        banner: '<%= banner %>',
        separator: '\n'
      },
      dist: {
        src: ['js/src/**/*.js'],
        dest: 'dist/app.js'
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'js/src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    },

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
      src: 'js/src/**/*.js',
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
        'css/src'
        ],
        outputSourceFiles: true
      },
      files: {
        'dist/global.css': 'css/src/global.less'
      }
    }
  },

  cssmin : {
    css:{
      src: 'dist/global.css',
      dest: 'dist/global.min.css'
    }
  },

  include_js: {
    source: {
      files: {
        'index.html': [
        'dist/app.js'
        ]
      }
    },
    build: {
      files: {
        'index.html': [
        'dist/app.min.js'
        ]
      }
    }
  },

  processhtml: {
    options: {
      // Task-specific options go here. 
    },
    dist: {
      files: {
        'dist/upload/index.html': ['index.html']
      }
    }
  },

  watch: {
    files: ['<%= jshint.files %>', '*.js', '*.css'],
    tasks: ['concat', 'less',  'jshint', 'jasmine'] // templates here
  }
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
    grunt.registerTask('default', ['concat', 'less', 'include_js:source']);
    grunt.registerTask('dist', ['uglify', 'cssmin', 'include_js:build', 'processhtml']);

  };