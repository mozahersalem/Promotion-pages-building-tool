module.exports.tasks = {
  /*****************************************************************
  ******************************************************************
  ******************************************************************

  WHEN | grunt watch
  Run ['pug', 'html-prettyprinter', 'concat', 'less'] tasks

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  watch: {
    scripts: {
      files: ['<%= jshint.files %>', 'Gruntfile.js', 'config//**/*.js', 'app/js/**/*.js', 'app/less/**/*.less', 'app/pug/**/*.pug'],
      tasks: ['pug', 'concat', "copy:less_responsive", 'less'], // templates here ,  'jshint', 'jasmine'
      options: {
        debounceDelay: 2000,
        livereload: true,
      },
    }
  },

  /*****************************************************************
  ******************************************************************
  ******************************************************************

  WHEN | grunt serve
  open localhost:9000 run index.html

  WHEN | grunt serve-dist
  open localhost:8000 run _FINAL_UPLOADS/index.html

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  connect: {
    serverDev: {
      options: {
        port: 9000,
        protocol: "http",
        hostname: '0.0.0.0',
        livereload: 35729,
        open: false,
        base: {
          path: "dist/unmin",
          index: 'index.html'
        }
      }
    },
    serverBuild: {
      options: {
        port: 8000,
        protocol: "http",
        hostname: '0.0.0.0',
        livereload: false,
        keepalive: true,
        base: {
          path: 'dist/min',
          index: 'index.html'
        }
      }
    }
  }
}
