var Kafka = require("node-rdkafka");
const mongo = require("./mongoDB");
const Rdis = require("./Redis");
const RdisRec = require("./redisRec");


const kafkaConf = {
	"group.id": "cloudkarafka-example",
	"metadata.broker.list":
		"dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(	
		// "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(
			","
		),
	"socket.keepalive.enable": true,
	"security.protocol": "SASL_SSL",
	"sasl.mechanisms": "SCRAM-SHA-256",
	// "sasl.username": "unk5ajh7",
	// "sasl.password": "S5M-AR23q0mg4LDMnbxAFOpp_tAhnEfA",
	"sasl.username": "xpb25gkb",
	"sasl.password": "67z9TtrS9KJdYb9oaQjr2TvBT9CTNOgw",
	debug: "generic,broker,security",
};
// const kafkaConf = {
// 	"group.id": "cloudkarafka-example",
// 	"metadata.broker.list":
// 		"dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(
// 			","
// 		),
// 	"socket.keepalive.enable": true,
// 	"security.protocol": "SASL_SSL",
// 	"sasl.mechanisms": "SCRAM-SHA-256",
// 	"sasl.username": "xpb25gkb",
// 	"sasl.password": "67z9TtrS9KJdYb9oaQjr2TvBT9CTNOgw",
// 	debug: "generic,broker,security",
// };


const prefix = "xpb25gkb-";
// const prefix = "unk5ajh7-";
const topics = [`${prefix}Cars`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
	"auto.offset.reset": "beginning",
});
const numMessages = 5;
let counter = 0;
// consumer.on("error", function(err) {
//   console.error(err);
// });
consumer.on("ready", function (arg) {
	console.log(`Consumer ${arg.name} ready`);
	consumer.subscribe(topics);
	consumer.consume();
});
consumer.on("data", function (m) {
	counter++;
	//   if (counter % numMessages === 0) {
	//     console.log("calling commit");
	//     consumer.commit(m);
	//   }
	mongo.addCar(JSON.parse(m.value.toString()));
	Rdis.addCar(JSON.parse(m.value.toString()),counter);

//	console.log(counter);
});
consumer.on("disconnected", function (arg) {
	process.exit();
});
// consumer.on('event.error', function(err) {
//   console.error(err);
//   process.exit(1);
// });
// consumer.on('event.log', function(log) {
//   console.log(log);
// });

function runConsumer() {
	consumer.connect();
}

setTimeout(function () {
	consumer.disconnect();
}, 300000);

module.exports = { runConsumer };
