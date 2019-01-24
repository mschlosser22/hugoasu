const request = require('request');
const fs = require('fs');

request('http://dev.polsone.cds-store.com/api/v1/forms', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);

  // Lead Forms - Single Step
  let data = JSON.stringify(body['leads']);
  fs.writeFileSync('data/forms/polsone/leads.json', data);

  // Step Forms - Multi Step
  let stepforms = JSON.stringify(body['step-forms']);
  fs.writeFileSync('data/forms/polsone/stepforms.json', stepforms);

});