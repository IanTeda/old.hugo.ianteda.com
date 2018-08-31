---
title: Ember Electron SQL - The Initialisation
type: blog
description: Scaffold out the Ember Electron Application
excerpt: Part 1 - How to scaffold out the Ember Electron App
date: 2018-08-17
categories: ["programming"]
tags: ["stock market", "investment"]
series: "The Ember Electron SQL Demonstration"
cover: cover-tree-teddy
slug: the-ember-electron-sql-initialisation
---

### Scaffolding Ember

We are going to start by scaffold out a [new Ember app](https://guides.emberjs.com/release/getting-started/quick-start/) in the terminal. Open up your favourite [terminal](https://hyper.is/) and `cd` into your workspace. Then run the new Ember application command:

`cd ~\Workspaces\`

`ember new EmberElectronSQL`

You should see Ember create a bunch of files and then fetch some npm packages in your terminal window. After Ember tells us the initialisation was successful, lets double check by `cd`'ing into the generated Ember application directory, starting up Ember and browsing to [http://localhost:4200/](http://localhost:4200/) in your favourite [browser](https://www.google.com/chrome/).

`cd EmberElectronSQL`

`npm start`

You should see the Ember Tomster welcome screen in your browser. Awesome! It worked and we are off and running.

{{< image src="EmberElectronSQL-Chrome" alt="Tomster Welcome Screen" width="100%">}}


### Scaffold Electron

Now that Ember is working it is time to add Electron through the [Ember Electron](https://ember-electron.js.org/) addon. Going back to your terminal install the addon with:

`ember install ember-electron`

After a successful install, update the npm run scripts so it starts the Ember Electron app by default by editing the _./package.json_ "scripts" to:

_./package.json_
~~~json
"scripts": {
    "build": "ember electron:make",
    "ember": "ember serve",
    "lint:js": "eslint .",
    "start": "ember electron",
    "test": "ember electron:test"
  },
~~~

Now lets double check that Ember Electron works by running `npm start`. You should see the Ember Tomster again, but this time within an Electron window.

{{< image src="EmberElectronSQL-Electron" alt="Tomster Welcome Screen" width="100%">}}

Awesome, Ember is now running in its own stand alone Electron app.

### Ember Electron Development Tweaks

Since Electron uses web technologies we can leverage the Chrome DevTools. So fire up your favourite [code editor](https://code.visualstudio.com/) and dive into the Electron entry point _./ember-electron/main.js_

_./ember-electron/main.js_
~~~javascript
// Open Chrome DevTools
mainWindow.openDevTools();
~~~

Lets configure Ember to add some extra log info to the DevTools console. Jump back into your code editor and un-comment some lines in the Ember config file _./config/environment.js_

_./config/environment.js_
~~~javascript
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
~~~

Now when you run your Ember Electron app (`npm start`) you should see the Chrome DevTools along with the Ember Tomster.

### Remove Welcome Addon

The last part of the initilisation is removing the ember-welcome addon. Time to get back into the code editor to change _./package.json_ and _./app/templates/application.hbs_

_./package.json_
~~~json
  "devDependencies": {
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "broccoli-asset-rev": "^2.7.0",
    "devtron": "^1.4.0",
    "electron-forge": "^5.2.2",
    "electron-prebuilt-compile": "2.0.4",
    "ember-ajax": "^3.0.0",
    "ember-cli": "~3.3.0",
    "ember-cli-app-version": "^3.0.0",
    "ember-cli-babel": "^6.6.0",
    "ember-cli-dependency-checker": "^2.0.0",
    "ember-cli-eslint": "^4.2.1",
    "ember-cli-htmlbars": "^2.0.1",
    "ember-cli-htmlbars-inline-precompile": "^1.0.0",
    "ember-cli-inject-live-reload": "^1.4.1",
    "ember-cli-qunit": "^4.3.2",
    "ember-cli-shims": "^1.2.0",
    "ember-cli-sri": "^2.1.0",
    "ember-cli-uglify": "^2.0.0",
    "ember-data": "~3.3.0",
    "ember-electron": "^2.8.0",
    "ember-export-application-global": "^2.0.0",
    "ember-load-initializers": "^1.1.0",
    "ember-maybe-import-regenerator": "^0.1.6",
    "ember-resolver": "^4.0.0",
    "ember-source": "~3.3.0",
-   "ember-welcome-page": "^3.0.0",
    "eslint-plugin-ember": "^5.0.0",
    "loader.js": "^4.2.3",
    "qunit-dom": "^0.6.2"
  },
~~~


Delete welcome-page template block from the application template:

_./app/templates/application.hbs_
~~~html
- {{!-- The following component displays Ember's default welcome message. --}}
- {{welcome-page}}
- {{!-- Feel free to remove this! --}}
+ <h1>Application</h1>

 {{outlet}}
~~~


We would like to use the node process environment in our application. So lets make the _'process.env.debug'_ flag to true in the Electron entry file _./ember-electron/main.js_. 

_./ember-electron/main.js_
~~~javascript
 app.on('ready', () => {
+   // Allow process environment
+   process.env.debug = true;
~~~