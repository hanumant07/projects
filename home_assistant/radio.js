var child_process = require('child_process');
var fs = require('fs');

var state = "off";


var play_pause =  "echo -n p > /home/pi/.config/pianobar/ctl";
var like_song = "echo -n + > /home/pi/.config/pianobar/ctl";
var dislike_song = "echo -n - > /home/pi/.config/pianobar/ctl";
var next_song = "echo -n n > /home/pi/.config/pianobar/ctl";
var vol_up = "echo -n ) > /home/pi/.config/pianobar/ctl";
var vol_down = "echo -n ( > /home/pi/.config/pianobar/ctl";
var off = "echo -n q > /home/pi/.config/pianobar/ctl";


var supported_cmd = function (input_cmd) {
	var i = 0;
	for (i = 0; i < radio_cmds.length; i++ ) {
		var entry = radio_cmds[i];
		console.log('current entry value ' + i);
		for (cmd in entry.commands) {
			console.log('command is ' + cmd);
			if (entry.commands[cmd] == input_cmd) {
				console.log ('current command' + entry.commands[cmd]);
				return entry;
			}
		}
	}
	return undefined;
}

var exe_cmd = function(entry) {
	entry.action(this);
}

var play = function(radio_inst) {

	if (radio_inst.state == "paused") {
		var res = child_process.exec(play_pause);
		radio_inst.state = "play";
	} else if (radio_inst.state == "off") {
		radio_inst.pianobar_ps = child_process.spawn("pianobar");
		radio_inst.pianobar_ps.stdout.on('data', function(data) {
		//console.log('stdout: ' + data);
		});
		radio_inst.state = "play";
	} else
		console.log('unknown state');
}

var pause = function(radio_inst) {
	if (radio_inst.state == "play") {
		var res = child_process.exec(play_pause);
		radio_inst.state = "paused";
	}
}

var nextsong = function(radio_inst) {
	var res = child_process.exec(next_song);
}

var volume_up = function(radio_inst) {
	var res = child_process.exec(vol_up);
}

var volume_down = function(radio_inst) {
	var res = child_process.exec(vol_down);
}

var love_song = function(radio_inst) {
	var res = child_process.exec(like_song);
}

var hate_song = function(radio_inst) {
	var res = child_process.exec(dislike_song);
}
/*
var toggle_station = function() {
	var res = child_process.exec(change_station);
}
*/
var quit = function(radio_inst) {
	var res = child_process.exec(off);
	radio_inst.state = "off";
}


var play_cmd = {commands : ["play music", "resume", "play"], action : play};
var pause_cmd = {commands : ["pause music", "pause"], action : pause};
var like_cmd = {commands : ["like song", "like"], action : love_song};
var dislike_cmd = {commands : ["dislike song", "hate song"], action : hate_song};
var next_song_cmd = {commands : ["next", "next song"], action : next_song};
var vol_up_cmd = {commands : ["volume up", "increase volume"], action : volume_up};
var vol_down_cmd = {commands : ["volume down", "decrease volume"], action : volume_down};
var off_cmd = {commands : ["quit radio", "turn off music"], action : quit};
var radio_cmds = new Array(8);
radio_cmds[0] = play_cmd;
radio_cmds[1] = pause_cmd;
radio_cmds[2] = like_cmd;
radio_cmds[3] = dislike_cmd;
radio_cmds[4] = next_song_cmd;
radio_cmds[5] = vol_up_cmd;
radio_cmds[6] = vol_down_cmd;
radio_cmds[7] = off_cmd;

/*
pianobar = new radio();
console.log('state is ' + pianobar.state);
var entry = pianobar.supported_cmd("play music");
console.log ('entry value is ' + entry);
pianobar.exe_cmd(entry);
*/
var exports = module.exports;
exports.radio_cmds = radio_cmds;
exports.cmd_supported = supported_cmd;
exports.exe_cmd = exe_cmd;
exports.state = state;


