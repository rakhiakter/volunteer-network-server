const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const  ObjectId  = require("mongodb").ObjectId;
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nimyg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express(); 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




client.connect((err) => {
  const events = client.db(process.env.DB_NAME).collection("data");
  
console.log("database connected");
  app.post('/addEvent', (req, res) =>{

    const newEvent = req.body;
    events.insertOne(newEvent).then((result) => {
     res.send(result.insertedCount>0)
    });

  })
app.get('/getEvent', (req, res) => {
    events.find({email: req.headers.authorization})
    .toArray((err, documents) => {
        res.send(documents)
    })
})
  app.get("/getEvent/:email", (req, res) => {
    events
      .find({ email: req.params.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  })




 app.delete('/delete/:id', (req, res) => {
    events.deleteOne({_id: ObjectId(req.params.id)})
    .then( result => {
      res.send(result.deletedCount > 0)
    })

    
  })
});

app.get('/', (req, res) => {
    res.send('hello')
}) 


app.listen(port)









