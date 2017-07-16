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
                dest: 'js/dist/app.js'
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
                    reserved: ['jQuery', 'Backbone']
                }
            },
            js: {
                files: {
                    'js/dist/app.min.js' : [ 'js/dist/app.js' ]
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
                    'css/dist/global.css': 'css/src/global.less'
                }
            }
        },
        
        cssmin : {
            css:{
                src: 'css/dist/global.css',
                dest: 'css/dist/global.min.css'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jasmine'] // templates here
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
    

    // tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['concat', 'less']);
    grunt.registerTask('minify', ['uglify', 'cssmin']);

};