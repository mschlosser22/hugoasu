const request = require('request');
const fs = require('fs');

// Polsone Forms
request('http://dev.polsone.cds-store.com/api/v1/forms', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  let data = JSON.stringify(body);
  fs.writeFileSync('data/forms/polsone/forms.json', data);
});

// ASU Programs
request('https://asuonline.asu.edu//lead-submissions-v3.3/programs', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  let data = JSON.stringify(body);
  fs.writeFileSync('data/programs/asu-programs.json', data);
});