var Ivona = require('ivona-node');
var fs = require('fs');
var ee = require('events').EventEmitter;
var util = require('util');
var player = "mpg123 text.mp3";
var child_process = require('child_process');
var audio_lock = 'free';

var ivona = new Ivona({
        accessKey: 'GDNAIZRONLFUTVZPSW6A',
        secretKey: '1w7yEniP59r3Hv/8YupPkJRYqsdlErJyfVyr+l0B'
});

function audio_eng() {
        ee.call(this);
}

audio_eng.prototype.get_lock(persist, cb) {
        if (audio_lock === 'free')
                cb(true);
        else

}

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

tts.prototype.speak = function(cb) {
        this.stream.on('finish', function() {
                var res = child_process.exec(player,
                                function(err, stdout, stderr) {
                                        console.log('stdout :' + stdout);
                                        fs.unlinkSync('text.mp3');
                                });
        });        
};

util.inherits(audio_eng, ee);
var test = new tts('this is a test');
test.speak(function () {});
