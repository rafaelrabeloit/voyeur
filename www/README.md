HTML5 Application Template
==========================

HTML5 Application template for Telium 3 platform.

## General Notes  

Notes applied to all HTML5 applications.

### Dev Environment

* Install [Ruby](https://www.ruby-lang.org/en/installation/) and put its `bin` folder in the PATH environment variable
* Install [compass](http://compass-style.org/install/) using Ruby (for proxy, use `--http-proxy http://"[user]":"[password]"@[proxy_host]:[port]` option)
    ```bash
    gem update --system
    gem install compass
    ```
* Install [NodeJS](http://nodejs.org/download/) and put its folder in the PATH environment variable
* Install [Grunt](http://gruntjs.com/getting-started) globally using:
    ```bash
    npm install grunt-cli -g
    ```
    The command should output where Grunt will be installed, for instance, `C:\Users\Admin\AppData\Roaming\npm\grunt`. Put this folder in the PATH environment variable.  
    If you are using a web proxy, a valid workaround is to config the proxy host on npm config.  
    Note that the last line must be also used on [bin/build.bat](file://./bin/build.bat) and [bin/watch.bat](file://./bin/watch.bat) and change [user], [password], [proxy_host] and [port] according to our environment.  
    Use:
    ```bash
    set HTTPS_PROXY=http://"[user]":"[password]"@[proxy_host]:[port]
    set HTTP_PROXY=http://"[user]":"[password]"@[proxy_host]:[port]
    npm config set registry http://registry.npmjs.org/
    npm config set proxy %HTTP_PROXY%
    npm config set https-proxy %HTTP_PROXY%
    npm config set strict-ssl false
    
    npm --proxy %HTTP_PROXY% --without-ssl --insecure -g install [package]
    ```  
* [Brackets](https://github.com/adobe/brackets/releases) recommended as code editor.


### Build, Watch and Tests

Use [bin/build.bat](file://./bin/build.bat) to build and [bin/watch.bat](file://./bin/watch.bat) to generate css from sass and to pre-compiling jst templates.  
This configuration uses Static Analyses with JSLint and Unit Test with QUnit, Sinon and Cobertura (for test coverage reports).  
The TemplateApp provide some tests for some `core` objects, and for basic application functionalities, like `modules`.  
For those tests to work, we recommend that all `modules` can be accessed in the app without setting previous objects. This way, the basic test wont fail if a var is not setted by another previous `module`, for example, before the module is constructed. If an object is indeed necessary, please, set it to a default value on the `module`.  
Every application should also implement its specific unit test cases.
To run a standalone Unit test [test/index.html](file://./test/index.html).  
To generate test reports, use [bin/build.bat](file://./bin/build.bat) and the reports will be saved in [test/output/coverage/index.html](file://./test/output/coverage/index.html) and [test/output/report/index.html](file://./test/output/report/cobertura-coverage.xml) for coverage report, and [test/output/results/TEST-index.xml](file://./test/output/results/TEST-index.xml) for Unit test reports.
Use [bin/release.bat](file://./bin/release.bat) to generate an release version in [dist/](file://./dist/) directory. This release version will override an byPassReadCard to undefined and logger endpoint to the production configuration, and will also override and HEAD 0 in CHANGELOG.md and consts.version by the version specified on `package.json`. Once a release is made, the CHANGELOG.md must include another HEAD 0 and the package.json must be update with a new version, otherwise the new release will fail.
There is also a [bin/packing.bat](file://./bin/packing.bat) that validates if there is any pending changes to commit, and is used after the release to ensure that nothing is left uncommitted. If everything is OK, then a zip package is generated with the application folder, and the ignored files and directories in subversion are ignored to generate this package. This script needs 7zip and subversion to be on `PATH` environment variable.

### SVN tricks

Use the command below to ignore all the non-essentials project files.

```bash
svn propset svn:ignore -RF svn-ignore.txt .
```

And for deleting .orig from merge tool. Remove /p to non-prompt.

```bash
del /s /p *.orig
```

### Project Basic Structure (Single Page Application)

`Gruntfile.js` - `Grunt` config file, with automated tasks  
`package.json` - `npm` packages to be installed with `npm install`  
`bin/` - folder with custom binaries and executables  
`bin/build.bat` - Execute 3 tasks: generate dist files (Build) unit test the application (Test) and run static analyses (Lint)  
`bin/watch.bat` - Generate .css from sass (.scss) and combined.js from JST templates (.tpl) until it is closed.  
`bin/packing.bat` - Exports a zip from svn, checking if there is a new version and if there is nothing more to commit  
`bin/release.bat` - Generate release with semver from package.json  
`dist/` - Distributable folder, with compressed files (get cleaned every build)  
`doc/` - folder with documentation for app  
`src/` - Application source folder  
`src/.bowerrc` and `src/bower.json` - `Bower` config files, that is used to manager application libs  
`src/config.rb` - `Compass` config file, with css destination file  
`src/config-require.js` - Application config of loading components, to be used by `requirejs` in app development environment and test environment  
`src/consts.js` - Application specific constants, doesn't get minified nor combined.  
`src/index.html` - Single page for application  
`src/app/` - folder with application .js files  
`src/app/app.js` - Application main file  
`src/app/init.js` - Bootstrap application. Initialization of app components and mocked data goes here.  
`src/app/load.js` - `requirejs` load file, just to start `src/app/init.js`   
`src/app/collections/` - folder with Backbone collections files   
`src/app/core/` - folder with core files  
`src/app/core/appParameters.js` - app parameters (like appName) and log function  
`src/app/core/mediator.js` - fire services and views like footer and header  
`src/app/core/core.js` - abstract location, print and other core functions  
`src/app/core/pos.js` - integrated with PoS functions  
`src/app/core/strings.js` - Strings in i18n and its loading  
`src/app/core/stringtable.js` - helper functions to i18n  
`src/app/models/` - folder with Backbone models files (like user.js or product.js)  
`src/app/modules/` - folder with view modules files (like `src/app/modules/home/view.js`). On most cases, `home` is the module that is initialized after the splash screen.  
`src/app/services/` - folder with application services files, like `modal.js`  
`src/app/templates/` - folder with template .tpl files, that will be wrapped in js functions in `src/app/templates/compiled/compiled.js`  
`src/app/templates/compiled/compiled.js` - JST compiled file, from .tpl files on `src/app/templates/`  
`src/app/views/` - folder with views for header, footer and slider  
`src/app/views/footer.js` - View for footer, with usually 2 buttons.  
`src/app/views/header.js` - View for header, with a title and a back button.  
`src/app/views/slider.js` - View for slider, responsible for application flow (change of views).  
`src/css/` - folder with application STATIC .css files  
`src/css/app.css` - App static css, generated by `src/sass/app.scss` sass file, with `compass`  
`src/css/reset.css` - Clear css properties   
`src/data/` - folder with application data files, like base64 images  
`src/data/data.js` - data-include Grunt plug-in will search for include directives like `/*include -bu order-appetizer.jpg */` and, on the case of the example convert the image in base64, to be saved on a similar data.js, called `src/data/include.data.js`  
`src/fonts/` - folder with application font files  
`src/libs/` - folder with application dependencies (like `zepto`, `backbone` and `requirejs`). Managed by `bower`.  
`src/sass/` - folder with application .scss files  
`src/sass/app.scss` - , to be used by `compass` to generate `src/css/app.css`  
`test/index.html` - Run application Unit Tests  
`test/load-config.js` - Load Unit tests using `requirejs`  
`test/app/` - Unit test folder  
`test/libs/` - Test libs, Sinon and QUnit  
`test/output/` - Test Reports output folder (get cleaned every build)   

## Application Notes  

Notes applied only to this specific application.

### Applying the Template

Use kdiff3 to update all applications with changes made to this Template.  
To do this, use [bin/compare.bat](file://./bin/compare.bat) with [kdiff3](http://sourceforge.net/projects/kdiff3/files/kdiff3/) on the PATH.
The script will ask for the application folder, put the app ABSOLUTE folder to be updated there, choose the appliable diff's and merge the file, that will be saved on the app-to-be-updated folder.  
Note that some folders and files are ignore on the diff. This is configured on [bin/kdiff3.config](file://./bin/kdiff3.config). 
This project will soon be transformed on template to be scaffold easily using [GruntJS Scaffolding](http://gruntjs.com/project-scaffolding).