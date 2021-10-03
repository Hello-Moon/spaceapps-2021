const { Sequelize, Model, DataTypes, JSON } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'luconDB.sqlite.db'
});

class User extends Model { }

// TODO: add limitations for name length, (same for other tables?) etc...?

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});

class Log extends Model { }

Log.init({
    // timestamp(not required, will be created by sequelize)
    // timestamp: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },

    // fromUser: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // fromUser is defined later, as a foreign key
    dataType: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    log: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Log'
});

// TODO: difference? (try in mysql/postgresql...)
// User.hasOne(Log, {
//     foreignKey: 'fromUser',
//     allowNull: false
// });

Log.belongsTo(User, {
    foreignKey: 'fromUser',
    allowNull: false
});

class DB {
    constructor() {
        this.testConnectionAndCreateTables();
    }

    async testConnectionAndCreateTables() {
        try {
            await sequelize.authenticate();
            console.log('[INFO] Connection has been established successfully.');
            await sequelize.sync({ force: true });
            console.log("[INFO] All models were synchronized(rather created) successfully.");
        } catch (error) {
            console.error('[ERROR] Unable to connect to the database:', error);
        }
    }

    async dumpDB() {
        const users = await User.findAll({ raw: true });
        console.log(users);

        const logs = await Log.findAll({ include: User, raw: true });
        console.log(logs);
    }
}

module.exports.DB = DB;
module.exports.User = User;
module.exports.Log = Log;