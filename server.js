const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost';

app.use(bodyParser.urlencoded({
    extended: true
}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    // Make sure you add the database name and not the collection name
    mongDb = database.db("sample-api")
    require('./app/routes')(app, mongDb);
    app.listen(port, ip , () => {
        console.log('We are live on ' + port + ip);
    });
})