require("dotenv").config();
const { MongoClient } = require('mongodb');
const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;

module.exports.databaseConnection = async() => {
    try {
        const mongoClient = await MongoClient.connect(process.env.PROVENDB_URI, {
            useNewUrlParser: true
        })


        
        const dbObject = mongoClient.db('team-eclipse');

        new ProvenDB(dbObject);
        return dbObject
    } catch (error) {
        console.log(error);
    }
}