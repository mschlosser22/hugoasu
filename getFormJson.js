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

  let data = JSON.stringify(body);
  fs.writeFileSync('data/programs/asu-programs.json', data);

  // Convert to Polsone Data Structure
  let formattedData = {
  	"program__code":[
  	]
  };

  body.forEach(function(program){
  	let tempProgramObject = {};
  	tempProgramObject["key"] = program.progcode;
  	tempProgramObject["text"] = program.title;
  	tempProgramObject["data_attr"] = [];
  	let tempDataAttrLevel = {
  		"key": "program__level",
  		"value": program.category
  	};
  	let tempDataAttrTest = {
  		"key": "program__interest-areas",
  		"value": "test"
  	};
  	tempProgramObject["data_attr"].push(tempDataAttrLevel);
  	tempProgramObject["data_attr"].push(tempDataAttrTest);
  	formattedData["program__code"].push(tempProgramObject);
  });
  formattedData = JSON.stringify(formattedData);
  fileOutput = 'var frontendOptions = ' + formattedData + ';';
  fs.writeFileSync('static/dist/js/asu-programs-formatted.js', fileOutput);
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
  //console.log(unique);
  fs.writeFileSync('data/programs/interestareas.json', unique);
});

// ASU Programs by Interest Area TEST
request('https://asuonline.asu.edu//lead-submissions-v3.3/programs', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }

  let data = {};

  body.forEach(function(element){

  	let interestareas = element.interestareas;
  	let programtitle = element.title;
  	let programcode = element.code;
  	let programcategory = element.category;
  	let programprogcode = element.progcode;
  	let programplancode = element.plancode;
  	let programsubplancode = element.subplancode;
  	let programconcentration = element.concentration;
  	let programcrmdestination = element.crmdestination;
  	let programshortdesc = element.shortdesc;
  	let programdegreeimage = element.degreeimage;
  	let programheroimage = element.heroimage;
  	let programdetailpage = element.detailpage;

  	interestareas.forEach(function(area) {
  		if(!(area in data)) {
  			data[area] = []
  		}

  		let tempProgramObject = {};
  		tempProgramObject['title'] = programtitle;
  		tempProgramObject['code'] = programcode;
  		tempProgramObject['category'] = programcategory;
  		tempProgramObject['progcode'] = programprogcode;
  		tempProgramObject['shortdesc'] = programshortdesc;

  		data[area].push(tempProgramObject);
  	});
  });

  data = JSON.stringify(data);
  console.log(data);
  fs.writeFileSync('data/programs/programsbyinterestareas.json', data);
  // TODO CLEANUP CODE
  // TODO CHECK PERFORMANCE
  // TODO CHECK FOR DIFFERENCE IN OBJECTS BEFORE REWRITING WITHOUT NEED - POSSIBLY USE LODASH
});
