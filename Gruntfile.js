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
		jasmine : {
            src : 'scripts/*.js',
            options : {
                specs : ['tests/*.spec.js'],
                //helpers : 'jtest/helpers/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'scripts/main.js',
                    requireConfig : {
                        baseUrl : "scripts"
                    }
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
	grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('build', ['less', 'jasmine']);
}

