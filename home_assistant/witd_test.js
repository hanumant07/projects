var http = require('http');
var querry = require('querystring');

//The url we want is `www.nodejitsu.com:1337/`
var options = {
  host: 'localhost',
  //path: '/text?q=play%20music&access_token=SZ4QFMIYAQL7ECI7OGXUNC65TJKO5SJ7',
  //since we are listening on a custom port, we need to specify it by hand
  port: '9877',
  //This is what changes the request to a POST request
};
var command = "play music";
command = querry.stringify({ q: command, access_token : 'SZ4QFMIYAQL7ECI7OGXUNC65TJKO5SJ7'});
console.log('command ' + command);
var path = '/text?' + command;
console.log('path ' + path);
options.path = path;
callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    //console.log(str);
    var parsed = JSON.parse(str);
    
    
    var out = parsed.outcomes[0];
    for (i in out) {
      console.log('key is ' + i + 'value is ' + out[i]);
    }
    console.log(out);
    console.log(out.confidence);
    console.log('intent is ' + out['confidence']); 
  });
}

//var req = http.get(options, callback);
console.log('sending request');
http.get(options, callback);

var cmd_to_intent = function(ai_eng_inst, ai_eng_cb) {
        http.get(ai_eng_inst.options, cb(response) {
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
                        ai_eng_cb(intent); 
                });
        });
             
}

function ai_eng (command) {
        
        this.command = command;
        this.options = {
                host: 'localhost',
                port: '9877'
                path: '/text?'
        }
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
                var intent_handler = pianobar.cmd_supported(intent);
                pianobar.exe_cmd(intent_handler);
                if (intent) {
                        var intent_handler = pianobar.cmd_supported(intent);
                        pianobar.exe_cmd(intent_handler, function(result)) {
                                if (result.err)
                                        /* Handle error. Emit appropriate event*/
                                else
                                        /* Emit succes when returned. */
                        });
                } else {
                        /* Unable to find corresponding intent with any confidence */

                }
        })

};

var example = new ai_eng("play music");
example.process_cmd(function (result) {
});

//This is the data we are posting, it needs to be a string or a buffer
//req.write("hello world!");
//req.end();
