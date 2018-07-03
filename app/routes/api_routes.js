var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });


    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (id == 0) {
            db.collection('notes').find({}).toArray((err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } else {
            const details = {
                '_id': new ObjectID(id)
            };
            db.collection('notes').findOne(details, (err, item) => {
                if (err) {
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {
                    res.send(item);
                }
            });
        }
    });

    app.get('/', (req, res) => {
        console.log('object');
        res.send('Hello from NodeJS  at ' + new Date());
    });

    // app.get('/.well-known/acme-challenge/YPRLCQKbZq8czwTGWYhbEMD4_hmKDF7eIMBce2YMj4s', (req, res) => {
    //     res.send('YPRLCQKbZq8czwTGWYhbEMD4_hmKDF7eIMBce2YMj4s.iS-MWu4hRyjVSheqHWiMcc2CRg7rXTedXlXacrIqtV8');
    // });
};