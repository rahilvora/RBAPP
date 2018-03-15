const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'riverbed';

exports.connect = function(callback){
    MongoClient.connect(url, function(err, client){
        if (err) { throw new Error('Could not connect: '+err); }
        let db = client.db(dbName);
        callback(db);
    });
};

exports.createCollection = function(){

}

