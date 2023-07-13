const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
// require("dotenv").config();

// const PORT = process.env.PORT;
// const URI = process.env.URI;

const server = express();

const URI = "mongodb+srv://Johnson228:Scb4l228@cluster0.ynja48t.mongodb.net/?retryWrites=true&w=majority";
const DATAB_NAME = 'pickleball_db';



MongoClient.connect(URI)
    .then(client => {
        console.log('MongoDB is connected')
        const db = client.db(DATAB_NAME)
        const playersCollection = db.collection('players');

        server.set('views', './src/views');
        server.set('view engine', 'ejs');
        
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false}));

        server.get("/", (req, res) => {
            db.collection('players').find().toArray()
            .then((players => {
                res.render('index', {playersData: players});
            }))
        })

        server.get('/api/player', (req,res) => {
            db.collection('players').find().toArray()
            .then((players => {
                res.json({playersData: players})
            }))
        })

        server.get('/register', (req, res) => {
            res.render('form')
        })

        server.post('/api/add-players', (req, res) => {
            playersCollection.insertOne(req.body)
            .then(result => {
                res.json({players: result});
            })
        })

 });


const PORT = 3000;


server.listen(PORT, () => {
    console.log(`listening on, ${PORT}`);
});