const { MongoClient } = require("mongodb");

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        this.Db = process.env.ATLAS_URI;
        this.client = null;
        this.databaseName = "vehicleparking";
        if (!this.Db) {
            throw new Error("ATLAS_URI environment variable is not set.");
        }
        Database.instance = this;
    }

    async connect() {
        if (!this.client) {
            this.client = new MongoClient(this.Db, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await this.client.connect();
        }

        return this.client.db(this.databaseName);
    }
}

module.exports = new Database();
