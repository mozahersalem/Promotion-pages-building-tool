 module.exports.tasks = {
     'string-replace': {
         dev: {
             files: [{
                 expand: true, // Enable dynamic expansion.
                 cwd: 'dist/html/**', // Src matches are relative to this path.
                 src: ['*.html'], // Actual pattern(s) to match.
                 dest: 'dist/html/**', // Destination path prefix.
                 ext: '.html', // Dest filepaths will have this extension.
                 // extDot: 'first'   // Extensions in filenames begin after the first dot
             }],
             // files: {
             //     'index.html': 'index.html',
             //     'index-wifi.html': 'index-wifi.html'
             // },
             options: {
                 replacements: [{
                     pattern: 'style/app.min.css',
                     replacement: 'style/app.css'
                 }, {
                     pattern: 'style/app.min.js',
                     replacement: 'style/app.js'
                 }]
             },

         },
         build: {
             files: [{
                 expand: true, // Enable dynamic expansion.
                 cwd: 'dist/unmin/html', // Src matches are relative to this path.
                 src: ['**/*.html'], // Actual pattern(s) to match.
                 dest: 'dist/min/html', // Destination path prefix.
                 ext: '.html', // Dest filepaths will have this extension.
                 // extDot: 'first'   // Extensions in filenames begin after the first dot
             }],
             // files: {
             //     'index-build.html': 'index.html',
             //     'index-wifi-build.html': 'index-wifi.html'
             // },
             options: {
                 replacements: [{
                     pattern: 'style/app.css',
                     replacement: 'style/app.min.css'
                 }, {
                     pattern: 'js/app.js',
                     replacement: 'js/app.min.js'
                 }, {
                     // pattern: 'src="img/',
                     pattern: /src="assets/ig,
                     replacement: 'src="../assets'
                 }]
             },

         }
     }
 }