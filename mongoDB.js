const MongoClient = require("mongodb").MongoClient;

// MongoDB Connection Details
const uri =
	"mongodb+srv://dsi:ariel2021@cluster0.lkuyv.mongodb.net/vehicles?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Adding a single document to mongoDB
function addCar(car) {
	client.connect((err) => {
		const collection = client.db("vehicles").collection("section_1");
		// perform actions on the collection object
		collection.insertOne(car, function (err, res) {
			if (err) throw err;
			console.log("Car Inserted\n" + JSON.stringify(car));
			// client.close();
		});
	});
}

module.exports = { addCar };
