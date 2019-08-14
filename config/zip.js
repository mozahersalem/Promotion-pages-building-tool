
module.exports.tasks = {
 compress: {
  main: {
    options: {
      archive: '_FINAL_UPLOADS/site.zip',
  },
  files: [{
    expand: true,
            // cwd: '/',
            src: ['_FINAL_UPLOADS/**'],
            dest: '/'
        }],
    },
},
}