
'use strict';

const express = require('express');
const session = require('express-session');
const http = require('http');
const uuid = require('uuid');

// import { WebSocketServer } from 'ws';
const WebSocket = require('ws').WebSocket;
// import { storeUserInfo, authenticate } from './UsersDB.js';
const UsersDB = require('./UsersDB.js');

const app = express();
const map = new Map();

// TODO: change secret, and use environment vars
// TODO: store session info in a db, and store the map as well...?
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});

app.use(express.static('test-client'));

// for session cookies
app.use(sessionParser);

// for handling JSON POST data
app.use(express.json());






/////////////////////////////////////////////////////////////////////////////////////////
// HTTP APIs
/////////////////////////////////////////////////////////////////////////////////////////
app.post('/register', async function (req, res) {
    let uname = req.body.uname;
    let pass = req.body.pass;
    let confPass = req.body.confPass;
    console.log('[registration] ', uname, pass, confPass);
    await UsersDB.storeUserInfo(uname, pass, confPass).then(arg => {
        res.redirect('/login');
    }).catch(err => res.send(err));
});

app.post('/login', async function (req, res) {
    let uname = req.body.uname;
    let pass = req.body.pass;
    console.log('[login] ', uname, pass);
    /*
    let result = UsersDB.authenticate(uname, pass);
    if (result.type === 'error') {
        res.send(JSON.stringify(result.data));
    } else {
        // set a random UUID for authentication in ws upgrade
        // TODO: best way, for ws authentication...?
        // const id = uuid.v4();
        // console.log(`Updating session for user ${id}`);
        req.session.userInfo = result.data;
        res.send({ result: 'OK', message: 'Session updated' });
    }*/
    await UsersDB.authenticate(uname, pass).then(arg => {
        req.session.userInfo = arg.data;
        res.send({ result: 'OK', message: 'Session updated' });
    }).catch(arg => res.send(JSON.stringify(arg.data)));
});

app.delete('/logout', function (request, response) {
    const ws = map.get(request.session.userInfo);

    console.log('Destroying session');
    request.session.destroy(function () {
        if (ws) ws.close();

        response.send({ result: 'OK', message: 'Session destroyed' });
    });
});

const server = http.createServer(app);






/////////////////////////////////////////////////////////////////////////////////////////
// WS APIs
/////////////////////////////////////////////////////////////////////////////////////////
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');

    sessionParser(request, {}, () => {
        if (!request.session.userInfo) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        console.log('Session is parsed!');

        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    const userInfo = request.session.userInfo;

    ws.send(JSON.stringify({ "type": "result", "data": { "resultType": "success", "userInfo": userInfo } }));

    map.set(userInfo, ws);

    ws.on('message', function (message) {
        console.log(`Received message ${message} from ${userInfo}`);
    });

    ws.on('close', function () {
        map.delete(userId);
    });
});






/////////////////////////////////////////////////////////////////////////////////////////
// Internal communication (with other js files)
/////////////////////////////////////////////////////////////////////////////////////////
module.exports = function broadcastNewLog(log) {
    for (let ws of map.values()) {
        ws.send(JSON.stringify({ "type": "event", "data": { "eventName": "newLogEvent", "data": log } }));
    }
}





/////////////////////////////////////////////////////////////////////////////////////////
// start server
/////////////////////////////////////////////////////////////////////////////////////////
server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});
