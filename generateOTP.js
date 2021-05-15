var https = require('follow-redirects').https;
var fs = require('fs');
var keys = require('./keys')

var auth = 'Bearer ' + keys.bearer_token;
var mobile = keys.mobile_number.toString()

var options = {
  'method': 'POST',
  'hostname': 'cdn-api.co-vin.in',
  'path': '/api/v2/auth/public/generateOTP',
  'headers': {
    'Authorization': auth,
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var cowin_response = JSON.parse(body);
    fs.writeFile('./txnID.txt', cowin_response.txnId, ()=>{
        console.log('Transaction ID written to file, note OTP sent to ' + mobile);
    })
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "mobile": mobile
});

req.write(postData);

req.end();