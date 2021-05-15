var crypto = require('crypto');

var pwd = 123456

//https://stackoverflow.com/questions/19236327/nodejs-sha256-password-encryption
var shaOTP = crypto.createHash('sha256').update(pwd.toString()).digest('hex');

console.log(shaOTP)