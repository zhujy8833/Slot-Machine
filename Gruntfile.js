module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less: {
		  development: {
		    files: {
		      "styles/css/main.css": "styles/less/all.less"
		    }
		  }
		},
		watch: {
	      styles: {
	        files: ['styles/**/*.less'], // which files to watch
	        tasks: ['less'],
	        options: {
	          nospawn: true
	        }
	      }
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['less']);
}

