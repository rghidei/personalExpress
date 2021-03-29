const express = require('express')
const upload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://rodasghidei:willow@cluster0.oltxa.mongodb.net/flowers?retryWrites=true&w=majority";
const dbName = "flowers";

app.listen(3000, () => {
  console.log('love')
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(upload())

app.get('/', (req, res) => {

  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('index.ejs', {messages: result})
  })

})
app.post('/up', (req, res) => {
  console.log('hiiii')
  if(req.files){

    var file = req.files.file
    var fileName = file.name
    console.log(fileName)

    file.mv('public/uploads/'+fileName, function (err){
      if (err) {
        res.send(err)
      } else {

        res.redirect('/')
      }
    })
    db.collection('messages').insertOne({name: req.body.name, img: "/uploads/" + fileName, heart: 0}, (err, result) => {

      if (err) return console.log(err)
      console.log('saved to database')

    })
  }

})





app.put('/up', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      heart:req.body.heart + 1

    }

  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.put('/messagesTwo', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/up', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
