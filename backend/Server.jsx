const express = require("express");
const cors = require('cors');
const routes = require("./router");
const mysqlDb = require('./model'); 
const app = express();
const port = 800;

app.use(express.json())

app.use(express.static(__dirname + '/public/build'));
console.log(__dirname + '/public/build')

app.use("/api", routes);


mysqlDb.connection();

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });