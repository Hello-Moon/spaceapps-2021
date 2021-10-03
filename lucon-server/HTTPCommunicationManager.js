const { User } = require('./DB.js');
const { logger, LOG_FILE } = require('./Logging');
const Uploader = require('./Upload');

class HTTPCommunicationManager {
    constructor(app, map) {
        // express' app
        this.app = app;

        this.map = map;
    }

    initServer() {
        const uuid = require('uuid');

        const UsersDB = require('./UsersDB.js');

        this.app.post('/check_user', async function (req, res) {
            let uname = req.body.username;
            let authCode = req.body.auth_code;
            let memberType = req.body.member_type;
            logger.write(`[INFO] [CHECK_USER]  ${uname} ${authCode} ${memberType}\n`);

            // TODO: secure strings?
            if (authCode === "beepb33p") {
                const user = await User.findOrCreate({
                    where: {
                        username: uname,
                        designation: memberType
                    }
                }).then((userInfo) => {
                    // cookies are not working properly
                    // req.session.userInfo = userInfo;
                    const data = JSON.stringify(userInfo[0]);
                    logger.write(`[INFO] [LOGIN/REGISTER] ${data}\n`);
                    res.json({
                        type: "success",
                        data: data
                    });
                });
            } else {
                logger.write("[INFO] [LOGIN/REGISTER] wrong auth code.\n");
                res.json({
                    type: "error",
                    data: {
                        errmsg: "wrong auth code."
                    }
                });
            }
        });

        // TODO: logout unused
        this.app.delete('/logout', (function (request, response) {
            // TODO: put this event into the log file
            // TODO: do the opposite, (key = ws, value = userInfo)
            // const ws = this.map.get(request.session.userInfo);
            console.log('Destroying session');
            request.session.destroy(function () {
                if (ws) ws.close();

                response.send({ result: 'OK', message: 'Session destroyed' });
            });
        }).bind(this));

        this.app.post('/file', async (req, res) => {
            Uploader.Upload(req.files.FILE).then(arg => {
                // TODO: filename, for logging?
                logger.write(`[INFO] uploaded file to ${arg.webContentLink}\n`);
                res.send(arg);
            }).catch((err) => {
                logger.write(`[ERROR] ${err}\n`);
                res.send(err);
            });
        });

        this.app.get('/logs', (req, res) => {
            res.download(LOG_FILE);
        });
    }
}

module.exports.HTTPCommunicationManager = HTTPCommunicationManager;
