const { logger } = require("./Logging");
const { Log } = require("./DB");
const { User } = require('./DB');

function handleWS(ws, request, map) {
    // TODO: session cookies in react doesn't work properly
    // if ((!request.session) || (!request.session.userInfo)) {
    //     console.log("user is not authenticated.");
    //     ws.send(JSON.stringify({
    //         type: "error",
    //         data: {
    //             errmsg: "user is not authenticated."
    //         }
    //     }));
    //     return;
    // }
    // const userInfo = request.session.userInfo;

    // map.set(userInfo, ws);

    ws.on('message', function (message) {
        logger.write(`[INFO] received message from client ${message}\n`);
        message = JSON.parse(message);

        // TODO: sanitize input, or try catch?
        if (message.type === "userInfo") {
            map.set(ws, message.data);
        } else if (message.type === "newLogEvent") {
            Log.create(message.data)
                .then(() => {
                    Log.findOne({ where: message.data, include: User })
                        .then((log) => {
                            broadcastNewLog(log, map);
                        });
                })
        }
    });

    ws.on('close', function () {
        // TODO: userId isn't defined, (do the opposite, as ws=key, userInfo=value)
        // map.delete(userId);
    });
}

function broadcastNewLog(log, map) {
    const payload = JSON.stringify({
        type: "newLogEvent",
        data: log
    });
    logger.write(`[INFO] log created and broadcasting ${payload}\n`);
    for (let ws of map.keys()) {
        ws.send(payload);
    }
}

module.exports.handleWS = handleWS;