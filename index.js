const connect = require("connect");
const serveStatic = require("serve-static");
const opn = require('opn');

const port = process.env.PORT || 8080;

connect()
  .use(serveStatic(__dirname))
  .listen(port, () => console.log("Server running on 8080..."));

process.argv.forEach(function (val, index, array) {
  if (index == 2 && (val == "-open" || val == "-o")) opn("http://localhost:" + port + "/");
});