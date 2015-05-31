module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'public/css/app.css': 'scss/app.scss'
        }
      }
    },

    uglify: {
      js: {
        options: {
          preserveComments: false,
          sourceMap: true,
          sourceMapName: 'public/js/app.js.map'
        },
        files: {
          'public/js/app.js': ['bower_components/modernizr/modernizr.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/foundation/js/foundation.js', 'bower_components/jQuery-Mask-Plugin/dist/jquery.mask.min.js', 'jssrc/app.js']
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      uglify: {
        files: 'jssrc/**/*.js',
        tasks: ['uglify']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['sass', 'uglify']);
  grunt.registerTask('default', ['build','watch']);
}
