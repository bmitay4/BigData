const express = require("express");
const app = express();
const port = 3000;
const producer = require("./carProducer");
const consumer = require("./carConsumer");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	var cards = ["This", "Is", "Just", "A Test"];
	res.render("./pages/index", { cards: cards });
});
app.get("/temp", (req, res) => {
	var cards = ["This", "Is", "Just", "A Test"];
	res.render("./pages/temp", { cards: cards });
});

producer.runProducer();

// For local running
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

// // For heroku running
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
