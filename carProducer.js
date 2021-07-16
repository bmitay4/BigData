const Kafka = require("node-rdkafka");

const kafkaConf = {
	"group.id": "cloudkarafka-example",
	"metadata.broker.list":
		"dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(
			","
		),
	"socket.keepalive.enable": true,
	"security.protocol": "SASL_SSL",
	"sasl.mechanisms": "SCRAM-SHA-256",
	"sasl.username": "xpb25gkb",
	"sasl.password": "67z9TtrS9KJdYb9oaQjr2TvBT9CTNOgw",
	debug: "generic,broker,security",
};

const prefix = "xpb25gkb-";
const topic = `${prefix}Cars`;
const producer = new Kafka.Producer(kafkaConf);
const maxMessages = 5;

// const Types = {
// 	FAMILY: "Family",
// 	TRUCK: "Truck",
// 	MOTROCYCLE: "Motorcycle",
// 	BUS: "Bus",
//     TAXI: "Taxi",
// }
// const Day = {
// 	SUNDAY: "Sunday",
// 	MONDAY: "Monday",
// 	TUESDAY: "Tuesday",
// 	WEDNESDAY: "Wednesday",
//     THURSDAY: "Thursday",
//     FRIDAY: "Friday",
//     SATURDAY: "Saturday",
// }
// const Event = {
//     REGULAR: "Regular",
// 	HOLIDAY: "Holiday",
//     VACATION: "Vacation",
// }

// const genMessage = i => Buffer.from(`Kafka example, message number ${i}`);

//Options for vehicle type

var Day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
var Type = ["Family", "Truck", "Motorcycle", "Bus", "Taxi"];
var Event = ["Regular", "Holiday", "Vacation"];
var Interchanges = [0, 1, 2, 3, 4, 5];

function generateVehicle(index) {
	var car = {
		Type: Type[Math.floor(Math.random() * Type.length)],
		Day: Day[Math.floor(Math.random() * Day.length)],
		Event: Event[Math.floor(Math.random() * Event.length)],
		EntranceInterchange:
			Interchanges[Math.floor(Math.random() * (Interchanges.length - 1))],
		ExitInterchange:
			Interchanges[Math.floor(Math.random() * Interchanges.length)],
		Date: new Date().toLocaleDateString(),
		Time: new Date().toLocaleTimeString(),
	};
	while (car.ExitInterchange <= car.EntranceInterchange)
		car["ExitInterchange"] =
			Interchanges[Math.floor(Math.random() * Interchanges.length)];

	return Buffer.from(JSON.stringify(car));
}
producer.on("ready", function (arg) {
	console.log(`Producer ${arg.name} ready.`);

	const timer = (ms) => new Promise((res) => setTimeout(res, ms));

	async function load() {
		for (var i = 1; ; i++) {
			producer.produce(topic, -1, generateVehicle(i), i);
			await timer(9000);
		}
	}
	load();
	//   setTimeout(() => producer.disconnect(), 0);
});

producer.on("disconnected", function (arg) {
	process.exit();
});

// producer.on('event.error', function(err) {
//   console.error(err);
//   process.exit(1);
// });
// producer.on('event.log', function(log) {
//   console.log(log);
// });
function runProducer() {
	producer.connect();
}
module.exports = { runProducer };
