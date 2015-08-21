var Ivona = require('ivona-node');
var fs = require('fs');
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

tts.prototype.speak = function(cb) {
        this.stream.on('finish', function() {
                var res = child_process.exec(player,
                                function(err, stdout, stderr) {
                                       fs.unlinkSync('text.mp3');
                                       cb();
                                });
        });        
};

module.exports = tts;
