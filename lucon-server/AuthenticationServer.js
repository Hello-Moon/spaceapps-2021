const { User } = require('./DB.js');

class AuthenticationServer {
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
            console.log('[check_user] ', uname, authCode, memberType);

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
                    res.json({
                        type: "success",
                        data: JSON.stringify(userInfo[0])
                    });
                });
            } else {
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
            // TODO: do the opposite, (key = ws, value = userInfo)
            // const ws = this.map.get(request.session.userInfo);

            console.log('Destroying session');
            request.session.destroy(function () {
                if (ws) ws.close();

                response.send({ result: 'OK', message: 'Session destroyed' });
            });
        }).bind(this));
    }
}

module.exports.AuthenticationServer = AuthenticationServer;
