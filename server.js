const https = require('https');
const fs = require("fs");
const read = fs.readFileSync;
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const app = express();
const port = 443;
// const ip = process.env.IP || 'localhost';

app.use(bodyParser.urlencoded({
    extended: true
}));

// HTTPS server
let certificate = read('./certs/domain-crt.crt', 'utf8');
let chainLines = read('./certs/domain-ca.crt', 'utf8').split("\n");
let cert = [];
let ca = [];
console.log(certificate);
console.log(chainLines);
chainLines.forEach(function (line) {
    cert.push(line);
    if (line.match(/-END CERTIFICATE-/)) {
        ca.push(cert.join("\n"));
        cert = [];
    }
});


console.log(ca);
let httpsOptions = {
    key: read('./certs/domain-key.key'),
    cert: certificate,
    ca: ca
};

if (env.error) {
    throw env.error;
}
MongoClient.connect(process.env.DB_URL, (err, database) => {
    if (err) throw err.error;
    mongDb = database.db("sample-api")
    require('./app/routes')(app, mongDb);
    secServer = https.createServer(httpsOptions, app);
    secServer.listen(port);
})