function Connection(host, port, passkey, options) {
	if(!(this instanceof Connection)) return new Connection(host, port, passkey, options);
	options = options || {};
	this.host = host;
	this.port = port;
	this.passkey = passkey;
	this.hasAuthed = false;
	this.outstandingData = null;
	this.tcp = options.tcp == null ? true : options.tcp;
	this.challenge = options.challenge == null ? true : options.challenge;
};

Connection.prototype.end = function() {
	
};

module.exports = Connection;