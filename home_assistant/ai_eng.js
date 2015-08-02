var http = require('http');
var querry = require('querystring');
var pianobar = require('./radio.js');


var cmd_to_intent = function(ai_eng_inst, ai_eng_cb) {
        console.log('sending request to witd');
        http.get(ai_eng_inst.options, function(response) {
                var str = ''
                response.on('data', function (chunk) {
                        str += chunk;
                });
                response.on('end', function () {
                        //console.log(str);
                        var parsed = JSON.parse(str);
                        var out = parsed.outcomes[0];
                        for (i in out) {
                                console.log('key is ' + i + 'value is ' +
                                                                out[i]);
                        }
                        console.log(out);
                        console.log(out.confidence);
                        console.log('intent is ' + out['confidence']);
                        if (out.confidence > 0.5) {
                                ai_eng_cb(out.intent);
                        } else {
                                console.log ('cannot translate to intent');
                                ai_eng_cb(undefined);
                        } 
                });
        });
}

function ai_eng (command) {
        
        this.command = command;
        this.options = {
                host: 'localhost',
                port: '9877',
                path: '/text?',
        }
        this.err = undefined;
        console.log('Creating ai_eng for ' + command);
        //events.emitter.call(this);
}


ai_eng.prototype.process_cmd = function(cb) {
        var command = this.command;
        command = querry.stringify({ q : command,
                        access_token : 'SZ4QFMIYAQL7ECI7OGXUNC65TJKO5SJ7'});
        path = '/text?' + command;
        this.options.path = path;
        this.cb = cb;
        cmd_to_intent(this, function(intent) {
                if (intent) {
                        var intent_handler = pianobar.cmd_supported(intent);
                        pianobar.exe_cmd(intent_handler, function(err) {
                                if (err) {
                                        this.err = err;
                                        cb(this.err)
                                }
                                else {
                                        cb(this.err);
                                }
                        });
                } else {
                        this.err = 'Unable to understand command';
                        cb(this.err);
                }
        })

};

module.exports = ai_eng;
