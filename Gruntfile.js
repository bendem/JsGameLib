module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jscs: {
            options: {
                disallowFunctionDeclarations: true,
                disallowNewlineBeforeBlockStatements: true,
                disallowSpacesInFunction: {
                    beforeOpeningRoundBrace: true
                },
                disallowSpacesInNamedFunctionExpression: {
                    beforeOpeningRoundBrace: true
                },
                disallowSpacesInsideParentheses: true,
                disallowSpacesInsideParentheses: true,
                disallowTrailingWhitespace: true,
                requireBlocksOnNewline: true,
                requireCamelCaseOrUpperCaseIdentifiers: true,
                requireCapitalizedConstructors: true,
                requireCommaBeforeLineBreak: true,
                requireLineBreakAfterVariableAssignment: true,
                requireLineFeedAtFileEnd: true,
                requireSemicolons: true,
                requireSpaceAfterBinaryOperators: true,
                requireSpaceBeforeBinaryOperators: true,
                safeContextKeyword: 'self',
                validateIndentation: 4,
                validateLineBreaks: 'LF',
                validateParameterSeparator: ', ',
                validateQuoteMarks: {
                    mark: "'",
                    escape: true
                },
            },
            all: ['src/*.js']
        },

        concat: {
            options: {
                banner: '/* <%= pkg.name %> - <%= pkg.version %> */\n\'use strict\';\n'
            },
            dist: {
                src: [
                    'src/Utils.js',
                    'src/Vector.js',
                    'src/Point.js',
                    'src/Positions.js',
                    'src/Sprite.js',
                    'src/ResourceManager.js',
                    'src/Box.js',
                    'src/Entity.js',
                    'src/Rectangle.js',
                    'src/Circle.js',
                    'src/Text.js',
                    'src/EntityList.js',
                    'src/EventManager.js',
                    'src/Game.js',
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                globalstrict: true,
                freeze: true,
                futurehostile: true,
                undef: true,
                latedef: true,
                browser: true,
                // TODO This is deprecated, remove it in the next jshint release
                laxbreak: true,
            },
            all: ['dist/<%= pkg.name %>.js']
        },

        // TODO Maybe use uglify?

    });

    grunt.registerTask('default', ['jscs', 'concat', 'jshint']);
};
