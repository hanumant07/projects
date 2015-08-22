var Ivona = require('ivona-node');
var fs = require('fs');
var audio_lock = require('./audio_lock.js')
var player = "mpg123 text.mp3";
var child_process = require('child_process');


var ivona = new Ivona({
        accessKey: 'GDNAIZRONLFUTVZPSW6A',
        secretKey: '1w7yEniP59r3Hv/8YupPkJRYqsdlErJyfVyr+l0B'
});

function tts(str) {
        ivona.createVoice(str, {
                body: {
                        voice: {
                                name: 'Salli',
                                language: 'en-US',
                                gender: 'Female'
                        }
                }
        }).pipe(this.stream = fs.createWriteStream('text.mp3'));
}

var play_audio = function(lock_req) {
    var tts_instance = lock_req.data;
    var cb = tts_instance.cb;
    var res = child_process.exec(player,
                function(err, stdout, stderr) {
                    fs.unlinkSync('text.mp3');
                    audio_lock.release_lock(lock_req, false);
                    cb();
                });
};

/*TODO: This seems incorrect
 */
var unlikely = function(lock_req) {
    audio_lock.release_lock(lock_req, false);
}

tts.prototype.speak = function(cb) {
        this.stream.on('finish', function() {
            this.cb = cb;
            audio_lock.request_lock(this, function(lock_req) {
                lock_req.on("acquired", play_audio);
                lock_req.on("release_requested", unlikely);
            });
        });        
};

module.exports = tts;
