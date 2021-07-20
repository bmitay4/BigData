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
		const collection = client.db("vehicles").collection("section_2");
		// perform actions on the collection object
		collection.insertOne(car, function (err, res) {
			if (err) throw err;
			console.log("Car Inserted\n" + JSON.stringify(car));
			// client.close();
		});
	});
}

// Returns the total number of vehicles in the database
const getTotalDocuments = async function totalDocuments() {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		console.log(err);
	});
	if (!client) return;
	try {
		const collection = client.db("vehicles").collection("section_2");
		let res = await collection.countDocuments({});
		console.log(res);
	} catch (err) {
		console.log(err);
	}
};

// Returns the amount of vehicles that are public transport (buses or taxis)
const getPublicTransport = async function publicTransport() {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		console.log(err);
	});
	if (!client) return;
	try {
		const collection = client.db("vehicles").collection("section_2");
		let query = { $or: [{ Type: "Taxi" }, { Type: "Bus" }] };
		let res = await collection.countDocuments(query);
		console.log(res);
	} catch (err) {
		console.log(err);
	} finally {
		client.close();
	}
};

// Returns the amount of vehicles that are private vehicles (family car, motorcycle or truck)
const getPrivateVehicels = async function privateVehicles() {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		console.log(err);
	});
	if (!client) return;
	try {
		const collection = client.db("vehicles").collection("section_2");
		let query = {
			$or: [
				{ Type: "Family" },
				{ Type: "Truck" },
				{ Type: "Motorcycle" },
			],
		};
		let res = await collection.countDocuments(query);
		console.log(res);
	} catch (err) {
		console.log(err);
	} finally {
		client.close();
	}
};

// Returns the amount of vehicles that are private vehicles (family car, motorcycle or truck)
const getTimes = async function allTime(from, min, to) {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		console.log(err);
	});
	if (!client) return;
	try {
		const collection = client.db("vehicles").collection("section_2");
		let query = { Hour: { $gte: from, $lte: to }, Mins: { $gte: min } };
		let res = await collection.countDocuments(query);
		console.log(res);
	} catch (err) {
		console.log(err);
	} finally {
		client.close();
	}
};

// Start function
const start = async function () {
	// const total = await getTotalDocuments();
	// const publicCars = await getPublicTransport();
	// const privateCars = await getPrivateVehicels();
	// const bTime = await getBTime();
	// console.log(bTime);
	// return {
	// 	totalVehicles: total,
	// 	publicVehicels: publicCars,
	// 	privateVehicles: privateCars,
	// };
};

const startTimes = async function () {
	return [
		getTimes(0, 1, 3),
		getTimes(3, 1, 6),
		getTimes(6, 1, 9),
		getTimes(9, 1, 12),
		getTimes(12, 1, 15),
		getTimes(15, 1, 18),
		getTimes(18, 1, 21),
	];
	// return {
	// 	sectionA: "00:00-03:00 " + getTimes(0, 1, 3),
	// 	sectionB: "03:00-06:00 " + getTimes(3, 1, 6),
	// 	sectionC: "06:00-09:00 " + getTimes(6, 1, 9),
	// 	sectionD: "09:00-12:00 " + getTimes(9, 1, 12),
	// 	sectionE: "12:00-15:00 " + getTimes(12, 1, 15),
	// 	sectionF: "15:00-18:00 " + getTimes(15, 1, 18),
	// 	sectionG: "18:00-21:00 " + getTimes(18, 1, 21),
	// };
};

// Call start
// console.log(start());
// console.log(startTimes());
module.exports = { addCar, startTimes };
