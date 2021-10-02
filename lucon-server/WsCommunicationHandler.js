const { Log } = require("./DB");

function handleWS(ws, request, map) {
    if ((!request.session) || (!request.session.userInfo)) {
        console.log("user is not authenticated.");
        ws.send(JSON.stringify({
            type: "error",
            data: {
                errmsg: "user is not authenticated."
            }
        }));
        return;
    }
    const userInfo = request.session.userInfo;

    map.set(userInfo, ws);

    ws.on('message', function (message) {
        console.log(`Received message ${message}`);
        message = JSON.parse(message);

        // TODO: sanitize input, or try catch?
        if (message.type === "userInfo") {
            map.set(ws, message.data);
        } else if (message.type === "newLogEvent") {
            Log.create(message.data).then((result) => {
                broadcastNewLog(ws, result, map)
            });
        }
    });

    ws.on('close', function () {
        // TODO: userId isn't defined, (do the opposite, as ws=key, userInfo=value)
        // map.delete(userId);
    });
}

function broadcastNewLog(excludeWS, log, map) {
    for (let ws of map.keys()) {
        if (ws !== excludeWS) {
            ws.send(JSON.stringify({
                type: "newLogEvent",
                data: log
            }));
        }
    }
}


module.exports.handleWS = handleWS;
