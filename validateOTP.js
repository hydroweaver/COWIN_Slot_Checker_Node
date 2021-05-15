var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'cdn-api.co-vin.in',
  'path': '/api/v2/auth/public/confirmOTP',
  'headers': {
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
    console.log(cowin_response.token);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "otp": "SHA256 OF OTP",
  "txnId": "TRANSACTION ID WRITTEN TO FILE"
});

req.write(postData);

req.end();