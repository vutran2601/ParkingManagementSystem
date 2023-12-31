const { MongoClient } = require("mongodb");

class Database {
    constructor() {
        if (Database.instance) {
            console.log("Parking Management System is exist");
            return Database.instance;
        }
        this.Db = process.env.ATLAS_URL;
        this.client = null;
        this.databaseName = "ParkingManagementSystem";
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
