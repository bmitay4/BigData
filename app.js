const express = require('express')
const MongoClient = require('mongodb').MongoClient;

// MongoDB Details
const uri = "mongodb+srv://dsi:ariel2021@cluster0.lkuyv.mongodb.net/vehicles?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const port = 3000
var myobj = { name: "rina cohen", address: "TLV" }


app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var cards=["Borrowed","Annual Profit","Lead Conversion","Average Income",];
  res.render("./pages/index",{cards:cards});
})

// Adding a single document to mongoDB
client.connect(err => {
  const collection = client.db("vehicles").collection("section_2");
  // perform actions on the collection object
  collection.insertOne(myobj, function(err, res) {
    if (err) throw err;
  console.log("1 document inserted");
  client.close();
  });
});

// // For heroku running
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

// For local running
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})