const connect = require("connect");
const serveStatic = require("serve-static");
const opn = require('opn');
const fs = require('fs');
const config = require("app-settings")("config.json");

const port = process.env.PORT || 8080;

connect()
  .use(serveStatic(__dirname))
  .listen(port, () => console.log("Server running on 8080..."));

process.argv.forEach((val, index, array) => {
  if (index == 2 && (val == "-open" || val == "-o")) opn("http://localhost:" + port + "/");
});



//Load current settings.json


read = function(path){
  try{
      let rawdata = fs.readFileSync(path);
      return JSON.parse(rawdata);
  } catch(err){
      console.error("Parse error: No settings.json or config.json found, if there is a config.json file, the path to settings.json might be incorrect, else run setup.bat again");
      throw err;
  }
}

const jsonPath = config.jsonPath;
let js = read(jsonPath);

console.log(js);

write = function(data,filename){
  let sJson = JSON.stringify(data,null,4);
  fs.writeFileSync(filename, sJson,{encoding:'utf8',flag:'w'});
}

write(js,"temp.json");

