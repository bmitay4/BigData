const express = require("express");
const app = express();
const port = 3000;
const producer = require("./carProducer");
const consumer = require("./carConsumer");
const data = require("./dataRetrieve");
const mongo = require("./mongoDB");
const Rdis = require("./Redis");
const RdisRec = require("./redisRec");


var sec=[[],[],[],[],[]];
sec= RdisRec.redisrec();
	console.log("printttttt");

 producer.runProducer();
 consumer.runConsumer();

  

// Rdis.lis();

//----------------I do this when kafka does not work
// var Day = [
// 	"Sunday",
// 	"Monday",
// 	"Tuesday",
// 	"Wednesday",
// 	"Thursday",
// 	"Friday",
// 	"Saturday",
// ];
// var Type = ["Family", "Truck", "Motorcycle", "Bus", "Taxi"];
// var Event = ["Regular", "Holiday", "Vacation"];
// var Interchanges = [1, 2, 3, 4, 5];

// function generateVehicle(index) {
// 	var curretDate = new Date().toLocaleString("he-IL", {
// 		timeZone: "Asia/Jerusalem",
// 	});
// 	var car = {
// 		Type: Type[Math.floor(Math.random() * Type.length)],
// 		Day: Day[Math.floor(Math.random() * Day.length)],
// 		Event: Event[Math.floor(Math.random() * Event.length)],
// 		EntranceInterchange:
// 			Interchanges[Math.floor(Math.random() * (Interchanges.length - 1))],
// 		ExitInterchange:
// 			Interchanges[Math.floor(Math.random() * Interchanges.length)],
// 		// Date: new Date().toLocaleDateString(),
// 		Time: curretDate,
// 		Hour: new Date().getHours(),
// 		Mins: new Date().getMinutes(),
// 	};
// 	while (car.ExitInterchange <= car.EntranceInterchange)
// 		car["ExitInterchange"] =
// 			Interchanges[Math.floor(Math.random() * Interchanges.length)];

// 	return Buffer.from(JSON.stringify(car));
	
// }
// var counter=1;
// while(counter<50){
// //	console.log(JSON.parse(generateVehicle()));
// Rdis.addCar(JSON.parse(generateVehicle().toString()),counter);
// counter++;}
// console.log(counter);
// RdisRec.tr();
// }

// if(counter==50)
// process.exit();



// console.log("RdisRec.sec1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111");
// console.log(RdisRec.sec1);

app.use(express.static("public"));
app.use(express.static("public-new"));

app.set("view engine", "ejs");

app.get("/temp2", (req, res) => {
	var cards = ["Daniel", "Is", "Just", "A Test"];
	res.render("./pages/index", { cards: cards });
});
app.get("/temp", (req, res) => {
	res.render("./pages/indexv2", {});
});
app.get("/temp3", (req, res) => {
	
	
	var section1=sec[0];
	var section2=sec[1];
	var section3=sec[2];
	var section4=sec[3];


	res.render("./pages/table", {section1 : section1,section2 : section2,section3 : section3,section4 : section4} );
});

// For local running
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

// // For heroku running
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
