module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
    grunt.initConfig({
	    // Configure a mochaTest task
	    mochaTest: {
		    test: {
			    options: {
				    reporter: 'spec'
			    },
			    src: [ 'tests/**/*.js' ]
		    }
	    }
    });

	// Run tests //
	grunt.registerTask('test', [ 'mochaTest' ]);
};