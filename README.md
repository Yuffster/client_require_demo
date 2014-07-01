# client_require Example

This is an example repository which shows you how easy it is to use
[client_require](http://github.com/Yuffster/client_require). In this case,
we're loading jQuery on the client and using the uuid-v4 NPM module on both
the client and the server to generate a UUID.

## To Run

	$ git clone git@github.com:Yuffster/client_require_demo.git
	$ npm install
	$ node src/server/main.js

## Production Mode

To see the production mode output, set your `NODE_ENV` to production:

	$ export NODE_ENV=production

Alternatively, you could set the `env` configuration setting within your
application code:

	client_require.set('env', 'production');

By default, the compiled script can be found at
<http://localhost:8000/js/client_require.js>.

## How Does it Work?

### package.json

Our project's `package.json` file is fairly standard.

	{
		"name" : "client_require_demo",
		"description" : "A demonstration of client_require.",
		"version" : "0.0.1",
		"author" : "Michelle Steigerwalt <msteigerwalt.com>",
		"repository" : {
			"type" : "git",
			"url" : "git://github.com/Yuffster/client_require_demo.git"
		},
		"dependencies":{
			"client_require":"*", 
			"uuid-v4":"*",
			"jquery":"1.8.3",
			"sillyname":"0.0.1"
		},
		"client_dependencies": ["uuid-v4","jquery", "sillyname"],
		"client_require":"./src",
		"main": "src/server/main.js"
	}

The three things that are worth noting are the last three lines of the file.

Notice that `client_dependencies` doesn't list version numbers. It simply lists
the name of **external dependencies** (NPM modules) listed in the main
`dependencies` object.  This tells client_require to look into those modules to
pull out the relevant files (as defined by each module) and serve them on the
client side.

The `client_require` property is next. It tells client_require which parts of
the source tree should be considered client-side code. If this isn't provided,
only the file listed as `main` will be loaded.

Notice that the `main` property lists a *server* JavaScript file. As with any
other paths, client_require will discard the "server/" part of the path, and
then try to require either src/main.js or src/client/main.js.

Since `main` is provided, client_require will automatically run that file on
initial load, meaning that the code inside of src/client/main.js will be
executed on the page as soon as it's ready, without us having to manually
call it.

### Source Tree

Our source tree is a combination of server and client-side modules, as well as
a common module.

	src/
		server/
			main.js
		client/
			main.js
		common.js

Note that server/main.js is never included in the client-side scripts. This
means you can store things like API secret keys and database connection details
within your code without having to worry about it being compromised on the 
client side.

If you were to type `require('common.js')` from the src/client/main.js, the
client/ distinction would be dropped from the canonical file path, and 
src/common.js would be loaded.

### Dependencies

client_require has surprisingly good backwards-compatible support for existing
NPM modules. Let's look at uuid-v4 as an example.

Once you run `npm install`, you should be able to find the package.json file
for this module in node_modules/uuid-v4/package.json.

This is a standard package.json file, with nothing within it made specific to
client_require.

	{
		"author": "James Brumond (http://jbrumond.me)",
		"name": "uuid-v4",
		"description": "A simple v4 UUID generator",
		"version": "0.1.0",
		"main": "index.js",
		"dependencies": {},
		"devDependencies": {},
		"optionalDependencies": {},
		"engines": {
			"node": "*"
		}
	}

The module works because it has a `main` file defined (index.js). This lets
client_require know that, when the developer requires "uuid-v4", he expects to
load the uuid-v4 package's main module, which is index.js. Therefor, index.js
is packed up and delievered to the client as "node_modules/uuid-v4".
