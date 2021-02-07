var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');


var dbConn = mongodb.MongoClient.connect('mongodb+srv://valerio:Sharingan93@cluster0.hercr.mongodb.net/Cluster0?retryWrites=true&w=majority')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));


app.post('/post-article', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.db("Cluster0").collection('article').insertOne(req.body);
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-article',  function(req, res) {
    dbConn.then(function(db) {
        db.db("Cluster0").collection('article').find({}).toArray().then(function(article) {
            res.status(200).json(article);
        });
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
