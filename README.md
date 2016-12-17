Meesho - Restaurant Finder
==========================

### Install from source

First, clone the project:

```bash
$ git clone https://github.com/khanna91/meesho <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check to see it works, assuming you have npm and bower installed globally ;)

```bash
$ npm install                   # Install project dependencies
$ bower install                 # Install project dependencies
$ gulp buildlocal               # Compile and build assets and all in local mode
$ gulp builddev                 # Compile and build assets and all in dev mode
$ gulp buildprod                # Compile and build assets and all in prod mode
$ static -p 3010 dist/          # Starts the server and launch app (in case, you find any error please install node-static globally)
```

##### Points to keep in mind
I'm using my personnel keys for zomato and google map. In case you find any issues while fetching data, I strongly recemmond use your personnel keys.

Still if you find any issues, feel free to ping me.

##### For developers out there
I also gave support for browser sync which is very useful while developing. In order to use that, after installing all dependencies, simple use

```bash
$ gulp serve
```

## Run Application locally

```bash
$ http://localhost:3010
```

## Application Structure

```
.
├── dist                     # Build/Start scripts
├── gulp                     # Gulp task to compile and build client side scripts
├── config                   # Project configuration settings
├── gulp                     # Gulp task to compile and build client side scripts
├── middleware               # Functions that control/modify application’s request-response cycle
├── routes                   # Definition of application end points (URIs) and how they respond to client requests
├── src                      # Application source code
│   ├── app                  # Contains all the controllers, views, services, scss files
│   └── assets               # Contains images used in app, and can be used for any other static assets
├── .gitignore               # Git uses it to determine which files and directories to ignore, before you make a commit.
├── bower.json               # Contains all the bower components dependencies which is required by app
├── gulpfile.js              # Contains gulp build methods which define the environment specific task to build the final app.
└── package.json             # Contains all the node module components dependencies which is required by app
```

## Thank You
