var https = require('follow-redirects').https;
var fs = require('fs');
var keys = require('./keys')

var auth = 'Bearer ' + keys.token;

var options = {
  'method': 'GET',
  'hostname': 'cdn-api.co-vin.in',
  'path': '/api/v2/appointment/sessions/public/calendarByPin?pincode=560066&date=15-05-2021&vaccine=COVISHIELD',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': auth
  },
  'maxRedirects': 20
};

setInterval(() => {
  //POSTMAN Generated
  var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var slots = JSON.parse(body);
      for(var val=0;val<slots.centers.length;val++)
      {
        console.log(slots.centers[val].name, ' ', slots.centers[val].address, ' ', slots.centers[val].sessions[0].available_capacity);
      }
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });  

  req.end();
}, 10000);