var child_process = require('child_process');
var fs = require('fs');

var state = "off";


var play_pause =  "echo -n p > /home/pi/.config/pianobar/ctl";
var like_song = "echo -n + > /home/pi/.config/pianobar/ctl";
var dislike_song = "echo -n - > /home/pi/.config/pianobar/ctl";
var next_song = "echo -n n > /home/pi/.config/pianobar/ctl";
var vol_up = "echo -n ')' > /home/pi/.config/pianobar/ctl";
var vol_down = "echo -n '(' > /home/pi/.config/pianobar/ctl";
var off = "echo -n q > /home/pi/.config/pianobar/ctl";

/*
 * msg_radio_inst: Send command to pianobar instance and transition state
 * @radio_inst: pianobar instance
 * @msg: message to be sent, including state to transition to.
 * @result_cb: callback to be invoked once message has been sent.
 */
var msg_radio_inst = function(radio_inst, msg, result_cb) {
	var res = child_process.exec(msg.cmd,
			function(err, stdout, stderr) {
				if (err !== null) {
					console.log('failed to exe ' +
								msg.cmd);
					result_cb('failed');
				} else {
					radio_inst.state = msg.state;
					result_cb(undefined);
				}
			});

}

var play = function(radio_inst, translation, result_cb) {

	var err = undefined;
	if (radio_inst.state == "paused") {
		var res = child_process.exec(play_pause);
		radio_inst.state = "play";
	} else if (radio_inst.state == "off") {
		radio_inst.pianobar_ps = child_process.spawn("pianobar");
		//radio_inst.pianobar_ps.stdout.on('data', function(data) {
		//console.log('stdout: ' + data);
		//});
		radio_inst.state = "play";
	} else {
		console.log('unknown state');
		err = "Invalid state";
	}
	result_cb(err);
}

var pause = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = "paused";
	msg.cmd = play_pause;
	if (radio_inst.state == "play") {
		msg_radio_inst(radio_inst, msg, result_cb);
	} else {
		result_cb('Music not playing');
	}
}

var nextsong = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = radio_inst.state;
	msg.cmd = next_song;
	msg_radio_inst(radio_inst, msg, result_cb);
}

var volume_up = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = radio_inst.state;
	msg.cmd = vol_up;
	msg_radio_inst(radio_inst, msg, result_cb);
}

var volume_down = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = radio_inst.state;
	msg.cmd = vol_down;
	msg_radio_inst(radio_inst, msg, result_cb);
}

var love_song = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = radio_inst.state;
	msg.cmd = like_song;
	msg_radio_inst(radio_inst, msg, result_cb);
}

var hate_song = function(radio_inst, translation, result_cb) {
	var msg = {};
	msg.state = radio_inst.state;
	msg.cmd = dislike_song;
	msg_radio_inst(radio_inst, msg, result_cb)
}

var init = function() {
	state = "off"
}

var quit = function(radio_inst, translation, result_cb) {
	var res = undefined;
	radio_inst.pianobar_ps.on('close', function(code, signal) {
		console.log('child process terminated with signal ' + signal);
		result_cb(undefined);
	});
	res = child_process.exec(off);
	radio_inst.state = "off";
}


var play_cmd = {commands : "play_radio", action : play};
var pause_cmd = {commands : "pause_radio", action : pause};
var like_cmd = {commands : "like_song", action : love_song};
var dislike_cmd = {commands : "hate_song", action : hate_song};
var next_song_cmd = {commands : "next_song", action : nextsong};
var vol_up_cmd = {commands : "Increase_volume", action : volume_up};
var vol_down_cmd = {commands : "lower_volume", action : volume_down};
var off_cmd = {commands : "stop_music", action : quit};
var radio_cmds = new Array(8);
radio_cmds[0] = play_cmd;
radio_cmds[1] = pause_cmd;
radio_cmds[2] = like_cmd;
radio_cmds[3] = dislike_cmd;
radio_cmds[4] = next_song_cmd;
radio_cmds[5] = vol_up_cmd;
radio_cmds[6] = vol_down_cmd;
radio_cmds[7] = off_cmd;


var exports = module.exports;
exports.intents = radio_cmds;
exports.state = state;
