
pianobar = require('./radio.js');

var i = pianobar.cmd_supported('play music');
pianobar.exe_cmd(i);
//var i = pianobar.cmd_supported('pause');
//console.log('pausing');
//setTimeout(pianobar.exe_cmd(i), 6000);