if(process.argv.length !== 3) {
	console.log("Missing the Post URL you want to promote.");
	process.exit();
}

require('dotenv').config()
const steem = require('steem');
const async = require('async');
const wif = steem.auth.toWif(process.env.USERNAME, process.env.PASSWORD, 'active');
const sendList = require('./sendlist');
const stdin = process.stdin;
const postURL = process.argv.pop();

let toatlSend = 0;
for(let i in sendList) {
	toatlSend  += sendList[i];
}

console.log(`Are you sure you want to use ${toatlSend} SBD to promote ${postURL}? (Y/n)`);

stdin.on('data', function(chunk) {
	chunk = chunk.toString();
	if(chunk.toString().trim() == "y") return sendPayments();
	console.log("Send Cancelled");
	process.exit();
})

function sendPayments() {
	async.eachOf(sendList, function(amount, to, next) {
		console.log(`Sending ${amount} to ${to}`);
		steem.broadcast.transfer(wif, process.env.FROM, to, `${amount} SBD`, postURL, function(err, result) {
			next(err);
		});
		
	}, function(err) {
		if(err) console.log(err);
		console.log("SEND COMPLETE");
		process.exit();
	})
}