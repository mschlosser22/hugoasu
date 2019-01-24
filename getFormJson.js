const request = require('request');
const fs = require('fs');

// Polsone Forms
request('http://dev.polsone.cds-store.com/api/v1/forms', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body);
  let data = JSON.stringify(body);
  fs.writeFileSync('data/forms/polsone/forms.json', data);
});

// ASU Programs
request('https://asuonline.asu.edu//lead-submissions-v3.3/programs', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body);
  let data = JSON.stringify(body);
  fs.writeFileSync('data/programs/asu-programs.json', data);
});

// ASU Interest Areas
request('https://asuonline.asu.edu//lead-submissions-v3.3/programs', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  let data = [];
  body.forEach(function(element){
  	let interestareas = element.interestareas;
  	interestareas.forEach(function(area) {
  		data.push(area);
  	});
  });
  let unique = [...new Set(data)];
  unique = JSON.stringify(unique);
  console.log(unique);
  fs.writeFileSync('data/programs/interestareas.json', unique);
});