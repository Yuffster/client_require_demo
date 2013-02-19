# client_require Example

This is an example repository which shows you how easy it is to use
[client_require](http://github.com/Yuffster/client_require). In this case,
we're loading jQuery on the client and using the uuid-v4 NPM module on both
the client and the server to generate a UUID.

## To Run

	$ git clone git@github.com:Yuffster/client_require_example.git
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