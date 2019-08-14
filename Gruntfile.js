
module.exports = function (grunt) {
    
  /*****************************************************************
  ******************************************************************
  ******************************************************************
  
  Load NPM tasks

  ******************************************************************
  ******************************************************************
  *****************************************************************/
  require("time-grunt")(grunt);
  require("jit-grunt")(grunt);

  //loads the various task configuration files
  var configs = require("load-grunt-configs")(grunt);
  grunt.initConfig(configs);
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  /*********************************************************************
  **********************************************************************
  **********************************************************************

  grunt 
  grunt serve 
  grunt build
  grunt serve-build 
  grunt copy
  grunt zip 

  **********************************************************************
  **********************************************************************
  *********************************************************************/
  grunt.registerTask("test",            ["jshint", "jasmine"]);


  grunt.registerTask("default",         ["pug", "concat", "copy:less_responsive", "less", "copy:assets_dev"]);
  // grunt.registerTask("default",         ["pug", "concat", "copy:less_responsive", "less"]);
  grunt.registerTask("serve",           ["default", "connect:serverDev", "watch"]);


  // grunt.registerTask("build",           ["default", "uglify:js", "cssmin", "string-replace:build", "processhtml", "htmlmin", "copy:min_folder" ,"copy:img_build", "copy:image_to_FINAL_UPLOADS"]);
  grunt.registerTask("build",           ["default", "uglify:js", "cssmin", "string-replace:build", "processhtml", "htmlmin", "copy:min_folder"]);
  grunt.registerTask("serve-build",     ["build", "connect:serverBuild"]);
  
  grunt.registerTask("upload",          ["build", "copy:unmin_folder", "copy:html_embed", "copy:assets_to_FINAL_UPLOADS"]);

  // grunt.registerTask("zip",             ["copy-html", "copy-img", "compress"]);
  grunt.registerTask("zip",             ["upload", "compress"]);

  grunt.registerTask("karma",           ["karma"]);
}