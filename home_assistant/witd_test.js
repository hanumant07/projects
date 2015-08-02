

var ai_eng = require('./ai_eng.js');
var example = new ai_eng("play music");
example.process_cmd(function (err) {
        if (err) {
                console.log ('Error is ' + err);
        } else {
                console.log ('Processed successfully');
        }
});
