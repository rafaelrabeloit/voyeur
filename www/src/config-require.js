/*global window: false*/

(function (root) {
    "use strict";

    root.require = {
        // paths for the libraries
        paths: {
            jquery: '../libs/jquery/dist/jquery.min',
            bootstrap: '../libs/bootstrap/dist/js/bootstrap.min',
            backbone: '../libs/backbone/backbone',
            underscore: '../libs/underscore/underscore'
        },

        // Defines the shim config 
        shim:  {
            'jquery': {
                exports: '$'
            },
            'underscore': {
                exports: '_'
            },
            backbone: {
                exports: 'Backbone',
                deps: [ 'underscore' ]
            },
            bootstrap: {
                exports: 'Bootstrap',
                deps: [ 'jquery' ]
            },
            'app' : { deps: [ 'jquery', 'underscore', 'backbone', 'bootstrap' ] },
            'core/strings' : { deps: [ 'app' ] },
            'core/mediator' : { deps: [ 'core/strings' ] },
            'core/appParameters' : { deps: [ 'core/strings' ] },
            'core/stringtable' : { deps: [ 'core/strings' ] },
            'core/core': { deps: ['core/strings'] },
            'views/footer': { deps: ['core/strings'] },
            'views/header': { deps: ['core/strings'] },
            'views/slider': { deps: ['core/strings'] },
            'models/watcher': { deps: ['collections/values', 'core/appParameters'] },
            'models/value': { deps: ['core/appParameters'] },
            'models/job': { deps: ['core/appParameters'] },
            'collections/watchers': { deps: ['models/watcher', 'core/appParameters'] },
            'collections/values': { deps: ['models/value', 'core/appParameters'] },
            'collections/jobs': { deps: ['models/job', 'core/appParameters'] },
            'templates/compiled/compiled': { deps: [ 'core/strings' ] },
            'modules/home/view': { deps: ['templates/compiled/compiled'] },
            'modules/watchers/view': { deps: ['templates/compiled/compiled', 'collections/watchers', 'modules/watcher/view'] },
            'modules/values/view': { deps: ['templates/compiled/compiled', 'collections/values'] },
            'modules/jobs/view': { deps: ['templates/compiled/compiled', 'collections/jobs'] },
            'modules/watcher/view': { deps: ['templates/compiled/compiled', 'models/watcher'] },
            'modules/value/view': { deps: ['templates/compiled/compiled', 'models/value'] },
            'modules/job/view': { deps: ['templates/compiled/compiled', 'models/job'] },
            'init': {
                deps: [
                    'core/strings',
                    'core/mediator',
                    'core/appParameters',
                    'core/stringtable',
                    'core/core',
                    'views/footer',
                    'views/header',
                    'views/slider',
                    'templates/compiled/compiled',
                    'models/watcher',
                    'models/value',
                    'models/job',
                    'collections/watchers',
                    'collections/values',
                    'collections/jobs',
                    'modules/home/view',
                    'modules/watchers/view',
                    'modules/values/view',
                    'modules/jobs/view',
                    'modules/watcher/view',
                    'modules/value/view',
                    'modules/job/view'
                ]
            }
        }
    };
}(window));