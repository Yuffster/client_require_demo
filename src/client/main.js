var common = require('common_file.js');

var $ = require('jquery');

$('#regen').css('display', 'inline').on('click', function(e) {
	e.preventDefault();
	$('#uuid').html(require('uuid-v4')());
	$('#animal').html(common.get_spirit_animal());
	$('#name').html(require('sillyname')());
	$('#env').html("client");
});

console.log("Main module loaded!");
console.log("We have access to jQuery, too!", $);