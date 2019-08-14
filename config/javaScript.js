module.exports.tasks = {

  /*****************************************************************
  ******************************************************************
  ******************************************************************

  Concat all Javascript files from js/ >>> in to one file dist/app.js

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  concat: {
    options: {
      banner: '<%= banner %>',
      separator: '\n'
    },
    dist: {
      src: ['app/js/**/*.js'],
      dest: 'dist/unmin/js/app.js'
    }
  },

  /*****************************************************************
  ******************************************************************
  ******************************************************************

  Minify dist/app.js to dist/app.min.js

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  uglify : {
    options: {
      mangle: {
        reserved: ['jQuery']
      }
    },
    js: {
      files: {
        'dist/min/js/app.min.js' : [ 'dist/unmin/js/app.js' ]
      }
    }
  },

  /*****************************************************************
  ******************************************************************
  ******************************************************************

  Javascript hinting errors

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  jshint: {
    files: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js'],
    options: {
      jshintrc: true
    }
  }

}