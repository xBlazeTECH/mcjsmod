var Rcon = require('rcon');

var conn = new Rcon('direct.lansing.io', 25575, 'RemoteConnect123');
conn.on('auth', function() {
  console.log("Authed!");

}).on('response', function(str) {
  console.log("Got response: " + str);

}).on('end', function() {
  console.log("Socket closed!");
  process.exit();
});

conn.connect();

require('keypress')(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var buffer = "";

process.stdin.on('keypress', function(chunk, key) {
  if (key && key.ctrl && (key.name == 'c' || key.name == 'd')) {
    conn.disconnect();
    return;
  }
  process.stdout.write(chunk);
  if (key && (key.name == 'enter' || key.name == 'return')) {
    conn.send(buffer);
    buffer = "";
    process.stdout.write("\n");
  } else if (key && key.name == 'backspace') {
    buffer = buffer.slice(0, -1);
    process.stdout.write("\033[K"); // Clear to end of line
  } else {
    buffer += chunk;
  }

});
var dothing = function(text) {
	conn.send(text)
}

module.exports = conn;