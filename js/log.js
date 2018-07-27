write_log = function(_data) {
	console.log("test");
	var data = {"log": _data}
	$(function() {
		$.post("http://127.0.0.1:8080/post", JSON.stringify(data), function() {}, "json")
		.done(function(data) {
			console.log("done");
		})
		.fail(function(data) {
			console.log("fail");
			console.log(data.statusText);
		})
		.always(function(data) {
			console.log("always");
		});
	});
}