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
        requirejs: {
            compile : {
                options : {
                    baseUrl : "scripts",
                    mainConfigFile: "scripts/main.js",
                    name : "SlotMachine",
                    out : "target/app-<%= pkg.version %>.js",
                    optimize : "none"
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'target/app-<%= pkg.version %>.min.js': ['target/app-<%= pkg.version %>.js']
                }
            }
        },
		jasmine : {
            src : 'scripts/*.js',
            options : {
                specs : ['tests/*.spec.js'],
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
	      },
          requirejs : {
            files : ['js/*.js','js/**/*.js'],
                tasks : ['requirejs']
          }
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('build', ['less', 'requirejs', 'uglify', 'jasmine']);
}

