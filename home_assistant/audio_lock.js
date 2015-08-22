var ee = require('events').EventEmitter;
var util = require('util');
var audio_lock = 'free';
var lock_req_q = [];
var current_owner = undefined;
var lock_q_entries = 0;


var check_and_grant_lock = function () {
	if (audio_lock === 'free') {
		if (lock_q_entries > 0) {
			next_req = lock_req_q.shift();
			audio_lock = 'locked';
			current_owner = next_req;
			lock_q_entries--;
			next_req.emit("acquired", next_req);
		}
	} else
		current_owner.emit("req_release", current_owner);
};
/*req : Create a new request object
 *data : data associated with the request.
 */
function req(data) {
	this.data = data;
	ee.call(this);
        lock_req_q.push(this);
        lock_q_entries++;
}

var request_lock = function (data, cb) {
	var lock_req = new req(data);
	cb(lock_req);
	check_and_grant_lock();
};

var release_lock = function(req, persist) {
	if (persist === true) {
		lock_req_q.push(req);
		lock_q_entries++;
	} else
		delete req;
	audio_lock = 'free';
	check_and_grant_lock();
};
util.inherits(req, ee);
module.exports.request_lock = request_lock;
module.exports.release_lock = release_lock;