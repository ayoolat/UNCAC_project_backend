const { MongoClient } = require('mongodb');
const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;

const provenDB_URI = 'mongodb://team-eclipse:dreamteam@team-eclipse.provendb.io/team-eclipse?ssl=true';


module.exports.databaseConnection = async() => {
    try {
        const mongoClient = await MongoClient.connect(provenDB_URI, {
            useNewUrlParser: true
        })
        
        const dbObject = mongoClient.db('team-eclipse');

        new ProvenDB(dbObject);
        return dbObject
    } catch (error) {
        console.log(error);
    }
}