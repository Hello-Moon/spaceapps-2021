const { AuthenticationServer } = require('./AuthenticationServer');
const { WsCommunicationHandler, handleWS } = require('./WsCommunicationHandler');
const { DB } = require('./DB');

const http = require('http');
const WebSocket = require('ws').WebSocket;

const express = require('express');
const app = express();

app.use(express.static('test-client'));

const cors = require('cors');
app.use(cors());

// for session cookies
const session = require('express-session');
// TODO: change secret, and use environment vars
// TODO: store session info in a db, and store the map as well...?
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});
app.use(sessionParser);

// for handling JSON POST data
app.use(express.json());

const map = new Map();

// init db
new DB();

// handle only authentication, via http
new AuthenticationServer(app, map).initServer();

const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', function (request, socket, head) {
    // TODO: session cookies in react doesn't work properly
    // console.log('Parsing session from request...');
    // sessionParser(request, {}, () => {
    //     if (!request.session.userInfo) {
    //         console.log("sending Unauthorized");
    //         socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    //         socket.destroy();
    //         return;
    //     }
    // console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
    });
});

// handle WebSocket communications
wss.on('connection', (ws, request) => {
    handleWS(ws, request, map);
});


server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});
