const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');



const port = 5000;


const app = express() 
app.use(cors()); 
app.use(bodyParser.json());



const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nimyg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  const bookings = client.db(process.env.DB_NAME).collection("data");
  
console.log("database connected");
  app.post('/addEvent', (req, res) =>{

    const newEvent = req.body;
    bookings.insertOne(newEvent)
    .then(result =>  {
        res.send(result.insertedCount > 0);
    })

  })
// app.get('/bookings', (req, res) => {
//     bookings.find({email: req.headers.authorization})
//     .toArray((err, documents) => {
//         res.send(documents)
//     })
// })

});

app.get('/', (req, res) => {
    res.send('hello')
}) 


app.listen(port)









