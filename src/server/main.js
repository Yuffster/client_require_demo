var client_require = require('client_require'),
    http   = require('http'),
    app    = http.createServer(),
    common = client_require.require('common_file.js');

app.on('request', function (req, res) {
	if (client_require.handle(req, res)) return;
	var links = {
		'uuid'  : 'https://npmjs.org/package/uuid-v4',
		'names' : 'https://npmjs.org/package/sillyname',
		'jquery': 'https://npmjs.org/package/jquery'
	};
	res.writeHead(200);
	res.write("<html><body>");
	var content = 'Hello, user! Your <a href="'+links.uuid+'">UUID</a> '+
	              ' was generated on the '+
	              '<span id="env">server</span> and is '+
	              '<span id="uuid">'+require('uuid-v4')()+'</span>. <br/>'+
	              'Your spirit animal is '+
	              '<span id="animal">'+common.get_spirit_animal()+"</span> "+
	              '<a href="'+links.names+'">named</a> <span id="name">'+
	              common.get_animal_name()+
	              '</span>. <p><a href="/" id="regen">Regenerate</a></p>'+
	              '<p>This application uses <a href="'+links.jquery+'">'+
	              'jQuery</a>, but you won\'t find it in the global scope!</p>'+
	              '<a href="'+client_require.get_src()+'">View main JS</a>'+
	              '<br/>Current Environment: '+
	              ((process.NODE_ENV=='production') ? 
	                  'production' : 'developoment')+
	              '.';
	res.write(content);
	res.write("<script src='"+client_require.get_src()+"'></script>");
	res.write("</body></html>");
	res.end();
});

app.listen(8000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8000/');