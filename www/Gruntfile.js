/*global module: false*/

var source = 'src';
var destination = 'dist';

/**
 * Version from AppTemplate
 */
var version = '0.1.1';

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jst: {
            precompile: {
                src: source + '/app/templates/**/*.tpl',
                dest: source + '/app/templates/compiled/compiled.js'
            }
        },
        concat: {
            css: {
                src: [
                    source + '/css/reset.css',
                    source + '/css/app.css',
                    source + '/css/*.css',
                    source + '/libs/**/*.css'
                ],
                dest: destination + '/css/combined.css'
            },
            js: {
                src: [
                    source + '/libs/zepto/zepto.min.js',
                    source + '/libs/underscore/underscore.js',
                    source + '/libs/backbone/backbone.js',
                    source + '/libs/iscroll/build/iscroll.js',
                    source + '/libs/roller/roller.js',
                    source + '/libs/sign/sign.js',
                    source + '/libs/datepick/datepick.js',
                    source + '/libs/num_keyboard/num_keyboard.js',
                    source + '/libs/slideshow/slideshow.js',
                    source + '/libs/qrcode/qrcode.min.js',
                    source + '/libs/telium/telium.js',

                    source + '/app/app.js',
                    source + '/data/include.data.js',
                    source + '/app/core/strings.js',
                    source + '/app/core/mediator.js',
                    source + '/app/core/appParameters.js',
                    source + '/app/core/stringtable.js',
                    source + '/app/core/pos.js',
                    source + '/app/core/*.js',
                    source + '/app/templates/compiled/*.js',
                    source + '/app/views/*.js',
                    source + '/app/models/*.js',
                    source + '/app/collections/*.js',
                    source + '/app/modules/*/view.js',
                    source + '/app/services/*.js',
                    source + '/app/init.js'
                ],
                dest: destination + '/combined.js'
            }
        },
        cssmin: {
            css: {
                src: destination + '/css/combined.css',
                dest: destination + '/css/combined.css'
            }
        },
        uglify: {
            js: {
                src: destination + '/combined.js',
                dest: destination + '/combined.js'
            }
        },
        processhtml: {
            build: {
                src: source + '/index.html',
                dest: destination + '/index.html'
            }
        },
        copy: {
            /* web -------------------------------------------- */
            webimg: {
                cwd: source + '/img', // set working folder / root to copy
                src: '**/*', // copy just all files
                dest: destination + '/img', // destination folder
                expand: true // required when using cwd
            },
            webfonts: {
                cwd: source + '/fonts', // set working folder / root to copy
                src: '*', // copy just all files
                dest: destination + '/fonts', // destination folder
                expand: true // required when using cwd
            },
            webvideos: {
                cwd: source + '/video', // set working folder / root to copy
                src: '**/*', // copy just all files
                dest: destination + '/video', // destination folder
                expand: true // required when using cwd
            },
            consts: {
                src: source + '/consts.js',
                dest: destination + '/consts.js'
            }
        },
        jslint: {
            check: {
                src: [
                    source + '/app/app.js',
                    source + '/data/include.data.js',
                    source + '/app/init.js',
                    source + '/consts.js',

                    source + '/app/core/*.js',

                    source + '/app/views/*.js',

                    source + '/app/models/*.js',

                    source + '/app/collections/*.js',

                    source + '/app/modules/*/view.js',

                    source + '/app/services/*.js'
                ],
                directives: {
                    plusplus: true,
                    browser: true,
                    nomen: true,
                    todo: true,
                    // add predefined libraries
                    predef: [
                        '$',
                        '_',
                        'Backbone'
                    ]
                },
                options: {
                    edition: 'latest',
                    jslintXml: 'test/output/lint/app-jslint.xml',
                    checkstyle: 'test/output/lint/app-checkstyle.xml',
                    errorsOnly: false,
                    failOnError: false
                }
            }
        },
        qunit_junit: {
            options: {
                dest: 'test/output/results'
            }
        },
        qunit: {
            all: ['test/index.html'],
            options: {
                timeout: 10000,
                coverage: {
                    src: ['src/app/**/*.js', '!src/app/templates/compiled/*.js'],
                    instrumentedFiles: 'tmp/',
                    htmlReport: 'test/output/coverage',
                    coberturaReport: 'test/output/report',
                    linesThresholdPct: 40,
                    statementsThresholdPct: 40,
                    functionsThresholdPct: 40,
                    branchesThresholdPct: 40
                }
            }
        },
        imagemin: {
            data: {
                options: {
                    optimizationLevel: 2,
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: source + '/data/',
                        dest: source + '/data/',
                        src: ['**/*.{png,jpg,JPG}']
                    }
                ]
            },
            build: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: destination + '/img/',
                        dest: destination + '/img/',
                        src: ['**/*.{png,jpg}']
                    }
                ]
            }
        },
        compass: {
            options: {
                config: source + '/config.rb',
                basePath: source
            }
        },
        clean: {
            build: ["test/output", destination, "tmp"],
            post_build: [destination + "/img/spr", "tmp"]
        },
        version: {
            consts: {
                options: {
                    prefix: 'root\.consts\.version += +[\'"]'
                },
                src: [source + '/consts.js', destination + '/consts.js']
            },
            changelog: {
                options: {
                    prefix: '### +HEAD +'
                },
                src: ['CHANGELOG.md']
            }
        },
        replace: {
            logger: {
                src: [destination + '/consts.js'],
                overwrite: true,
                replacements: [{
                    from: /root\.consts\.log_endpoint += +["\'](.+)["\'];/g,
                    to: "root.consts.log_endpoint = '" + "http://wam.ingenico.com/events/" + "';"
                }]
            },
            bypass: {
                src: [destination + '/consts.js'],
                overwrite: true,
                replacements: [{
                    from: /root\.consts\.byPassReadCard += +(.+);/g,
                    to: "root.consts.byPassReadCard = undefined;"
                }]
            },
            changelog: {
                src: ['CHANGELOG.md'],
                overwrite: true,
                replacements: [{
                    from: /HEAD ([0-9a-zA-Z\-_\+\.]+)/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return regexMatches[0] + " (" + grunt.template.today('mmmm d, yyyy') + ")"; //
                    }
                }]
            }
        },
        search: {
            changelog: {
                files: {
                    src: ['CHANGELOG.md']
                },
                options: {
                    searchString: /### +HEAD +0/g,
                    logFile: "tmp/results.json",
                    onComplete: function (matches) {
                        if (matches.numMatches > 1) {
                            grunt.fail.warn("There is an error in the CHANGELOG.md.\n");
                        } else if (matches.numMatches === 0) {
                            grunt.fail.warn("Missing entry on CHANGELOG.md for release.\n");
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-qunit-istanbul');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-search');

    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['clean:build', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:build', 'copy:webimg', 'copy:webfonts', 'copy:webvideos', 'copy:consts', 'clean:post_build']);

    grunt.registerTask('build', ['imagemin:data', 'jst:precompile', 'compass', 'clean:build', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:build', 'copy:webimg', 'copy:webfonts', 'copy:webvideos', 'copy:consts', 'clean:post_build', 'imagemin:build', 'jslint', 'qunit_junit', 'qunit']);

    grunt.registerTask('release', ['search:changelog', 'imagemin:data', 'jst:precompile', 'compass', 'clean:build', 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'processhtml:build', 'copy:webimg', 'copy:webfonts', 'copy:webvideos', 'copy:consts', 'clean:post_build', 'imagemin:build', 'jslint', 'qunit_junit', 'qunit:all', 'version:consts', 'version:changelog', 'replace:changelog', 'replace:logger', 'replace:bypass']);

    grunt.registerTask('test', ['jslint:check', 'qunit_junit', 'qunit']);

    grunt.registerTask('compile', ['imagemin:data', 'jst:precompile']);
};