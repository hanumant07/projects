var audio_lock = require('./audio_lock.js');

var acquired_count = 0;

var acquired = function(lock_req) {
	acquired_count++;
	console.log("Acquired count : " + acquired_count + ' intance id : ' + lock_req.data);
}

var release = function(lock_req) {
	acquired_count--;
	console.log("Count after release: " + acquired_count + ' instance id : ' + lock_req.data);
	audio_lock.release_lock(lock_req);
}

for (var i = 0; i < 5; i++) {
	audio_lock.request_lock(i, function (lock_req) {
		lock_req.on("acquired", acquired);
		lock_req.on("req_release", release); 
	});
};
