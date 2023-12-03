const express = require("express");
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const routes = require("./router");
const mysqlDb = require('./database/mysql')
const app = express();
const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' }, forceNew: true })
app.set('port', process.argv[2] || 8000);
const port = process.env.PORT || app.get('port');
const bodyParser = require('body-parser')
const session = require('express-session');
const MessageModel = require('./model/message.repo')

// Middleware

app.use(express.json())

app.use(cors())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '12345',
  cookie: { secure: false }
}));
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(__dirname + '/public'));

app.use("/api", routes);

mysqlDb.connection();

io.on('connection', (socket) => {
  console.log('a user connected');
  // Code su kien
  socket.on("sendMessage", (message) => {
    console.log(message)
    socket.broadcast.emit("receiveMessage", message)
    // luu du lieu
    const { messageId, text, userId, from, to, timestamp} = message
    MessageModel.updateMessage({
      messageId: messageId,
      messageObj: {
        userId, text, timestamp, from, to
      }
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
