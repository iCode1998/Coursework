const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb+srv://Mike:Mike123@mobileapp.v0pfk.mongodb.net/MobileApp', (err, client) => {
db = client.db('MobileApp')
console.log("SUCCESSFULLY CONNECTED TO DATABASE.")
})

// logger middleware
app.use(function (req, res, next) {
    console.log( req.method+ " REQUEST " + "TO " + req.url + " SUCCESSFULL");
    console.log(res.statusCode);
    next();
  });

app.param('name_of_collection', (req, res, next, name_of_collection) => {
req.collection = db.collection(name_of_collection)
// let collection_ = ""+req.collection.namespace
if (name_of_collection === "Lessons" || name_of_collection == "Orders") {
    req.collection = db.collection(name_of_collection);
    return next();
  } else {
    res.status(500).send({ message: "Invalid collection" });
  }

// return next()
})

app.get('/', (req, res, next) => {
res.send('WELCOME TO THE BACKEND')
})

// GET URL FOR ALL LESSONS 
app.get('/collection/:name_of_collection', (req, res, next) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})

const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:name_of_collection/:id', (req, res, next) => {
req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
if (e) return next(e)

res.send(result)
})
})

// SEARCH FUNCTION
app.get('/collection/:name_of_collection/search/:topic', (req, res, next) => {
    var regex = new RegExp(req.params.topic, 'i'); //Search as you type
    req.collection.find({ topic: regex }).toArray((e, result) => { 
        if (e) return next(e)
        console.log("In comes a " + req.method + " to " + req.url + " GET request successfull")
        res.send(result)
        })
    })


app.post('/collection/:name_of_collection', (req, res, next) => {
req.collection.insertOne(req.body,(e,results) => {
if (e) return next (e)
res.send(req.body)
})
})

app.put('/collection/:name_of_collection/:id', (req, res, next) => {
    req.collection.updateOne(
    {_id: new ObjectID(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false},
    (e, result) => {
    if (e) return next(e)
    res.send(req.body) 
})
    })

app.use(function(req, res, next) {
    // Uses path.join to find the path where the file should be
    var filePath = path.join(__dirname,"static", req.url);
    // Built-in fs.stat gets info about a file
    fs.stat(filePath, function(err, fileInfo) {
    if (err) {
    next();
    return;
    }
    if (fileInfo.isFile()) {
    res.sendFile(filePath);
    console.log("FILE HAS BEEN FOUND")
    console.log(req.method + " REQUEST " + " TO " + req.url + " SUCCESSFUL")
    }
    else next();
    });
    });

    app.use((req, res, next) => {
    res.status(404);
    res.send("ERROR FILE NOT FOUND");
    console.log(req.method + " REQUEST " + " TO " + req.url + " SUCCESSFUL")
    console.log("FILE NOT FOUND")
    });

let port = process.env.PORT || 3000
// app.listen(3000);
app.listen(port, (_) => {
    console.log("SERVER HAS STARTED!");
  });