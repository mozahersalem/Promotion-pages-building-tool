module.exports.tasks = {

  /*****************************************************************
  ******************************************************************
  ******************************************************************
  loop
  <!-- build:js inline -->
  Get the Javascript code from 'src' script tag from index.html
  and embed it in _FINAL_UPLOADS/unmin/index-unmin.html
  <!-- /build -->
  ******************************************************************
  ******************************************************************
  *****************************************************************/
  processhtml: {
    options: {
      // Task-specific options go here. 
    },
    dist: {
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'dist/min/html/',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: 'dist/min/embed',   // Destination path prefix.
          ext: '.embed.html',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }
      ],
    }
  },


  /*****************************************************************
  ******************************************************************
  ******************************************************************
  
  Minify _FINAL_UPLOADS/unmin/index-unmin.html
  to _FINAL_UPLOADS/index.html

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
       files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'dist/min/embed',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: 'dist/min/html_min',   // Destination path prefix.
          ext: '.html',   // Dest filepaths will have this extension.
          // extDot: 'first'   // Extensions in filenames begin after the first dot
        }
      ],
    }
  }
  
}