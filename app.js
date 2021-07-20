const express = require("express");
const app = express();
const port = 3000;
const producer = require("./carProducer");
const consumer = require("./carConsumer");
const data = require("./dataRetrieve");
const mongo = require("./mongoDB");

producer.runProducer();
consumer.runConsumer();

app.use(express.static("public"));
app.use(express.static("public-new"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	var cards = ["Daniel", "Is", "Just", "A Test"];
	res.render("./pages/index", { cards: cards });
});
app.get("/temp", (req, res) => {
	res.render("./pages/indexv2", {});
});

// For local running
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

// // For heroku running
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
