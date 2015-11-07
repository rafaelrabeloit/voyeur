/*global window: false*/

(function (root) {
    "use strict";

    root.require = {
        // paths for the libraries
        paths: {
            jquery: '../libs/jquery/dist/jquery.min',
            bootstrap: '../libs/bootstrap/dist/js/bootstrap.min',
            backbone: '../libs/backbone/backbone',
            'backbone.epoxy': '../libs/backbone.epoxy/backbone.epoxy',
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
                deps: [ 'underscore', 'jquery' ]
            },
            'backbone.epoxy': {
                exports: 'Backbone.Epoxy',
                deps: [ 'backbone' ]
            },
            bootstrap: {
                exports: 'Bootstrap',
                deps: [ 'jquery' ]
            },
            'app' : { deps: [ 'jquery', 'underscore', 'backbone', 'bootstrap', 'backbone.epoxy' ] },
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
            
            'modules/home': { deps: ['templates/compiled/compiled'] },
            'modules/watchers': { deps: ['templates/compiled/compiled', 'views/watchers/list', 'views/watchers/add'] },
            'modules/jobs': { deps: ['templates/compiled/compiled', 'views/jobs/list', 'views/jobs/add'] },
            'modules/values': { deps: ['templates/compiled/compiled', 'views/values/list'] },
            
            'views/watchers/add': { deps: ['templates/compiled/compiled', 'models/watcher'] },
            'views/watchers/view': { deps: ['templates/compiled/compiled', 'models/watcher'] },
            'views/watchers/list': { deps: ['templates/compiled/compiled', 'collections/watchers', 'views/watchers/view'] },
            
            'views/jobs/add': { deps: ['templates/compiled/compiled', 'models/job'] },
            'views/jobs/view': { deps: ['templates/compiled/compiled', 'models/job'] },
            'views/jobs/list': { deps: ['templates/compiled/compiled', 'collections/jobs', 'views/jobs/view'] },
            
            'views/values/view': { deps: ['templates/compiled/compiled', 'models/value'] },
            'views/values/list': { deps: ['templates/compiled/compiled', 'collections/values', 'views/values/view'] },
            
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
                    'modules/home',
                    'modules/watchers',
                    'modules/values',
                    'modules/jobs',
                    'views/watchers/view',
                    'views/watchers/list',
                    'views/values/view',
                    'views/values/list',
                    'views/jobs/list',
                    'views/jobs/view'
                ]
            }
        }
    };
}(window));