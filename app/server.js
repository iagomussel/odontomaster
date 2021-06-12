var express = require("express");
var serveStatic = require("serve-static");

var app = express();

app.use(serveStatic("dist", { index: ["index.html", "index.htm"] }));
app.listen(3000);
