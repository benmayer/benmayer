module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {// 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          'js/main.js',  // This specific file
          'js/functions.js'
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
            'css/<%= pkg.name %>.min.css': 'css/style.scss'
        }
      } 
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false,
        }
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
      } 
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};