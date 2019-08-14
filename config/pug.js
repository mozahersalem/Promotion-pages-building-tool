/*****************************************************************
******************************************************************
******************************************************************

compile index.pug to dist/pug.index.html
compile  wifi.pug to dist/pug.wifi.html

******************************************************************
******************************************************************
*****************************************************************/


module.exports.tasks = {

   pug: {

    release: {
      options: {
        pretty: true
      },
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'app/pug/_index',      // Src matches are relative to this path.
          src: ['**/*.pug', '!**/variables/*.pug', '!**.pug'], // Actual pattern(s) to match.
          dest: 'dist/unmin/html',   // Destination path prefix.
          ext: '.html',   // Dest filepaths will have this extension.
          // extDot: 'first'   // Extensions in filenames begin after the first dot
        }
      ],
    },
  },
};