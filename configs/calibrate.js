var env = require('./env.json');
var fs = require('fs');

env.current = process.argv[2];

var json = JSON.stringify(env);
fs.writeFile('./configs/env.json', json, 'utf8', function(){
    console.log(env);
});
