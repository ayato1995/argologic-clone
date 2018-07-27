var http = require('http');
var fs = require('fs');
var p = "../log/log.txt";

function appendFile(path, data) {
	fs.appendFile(path, data, function (err) {
		if (err) {
			throw err;
		}
	});
}

var server = http.createServer();
server.on('request', function (request, response) {
	if (request.method == 'POST') {
		console.log('post');
		var data = '';
		request.on('data', function (chunk) {
			data += chunk;
		});
		request.on('end', function() {
			var obj = JSON.parse(data);
			appendFile(p, obj.log);
			console.log(obj.log);
		});
	}

	response.end();
});

server.listen(8080, '127.0.0.1');
