const Types = {
	FAMILY: "family",
	TRUCK: "truck",
	MOTROCYCLE: "motorcycle",
	BUS: "bus",
    TAXI: "taxi",
}

const Day = {
	SUNDAY: "Sunday",
	MONDAY: "Monday",
	TUESDAY: "Tuesday",
	WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
}

const Event = {
	HOLIDAY: "holiday",
    VACATION: "vacation",
}

const Kafka = require('node-rdkafka');
const { configFromCli } = require('./config');

const ERR_TOPIC_ALREADY_EXISTS = 36;

function ensureTopicExists(config) {
  const adminClient = Kafka.AdminClient.create({
    'bootstrap.servers': config['bootstrap.servers'],
    'sasl.username': config['sasl.username'],
    'sasl.password': config['sasl.password'],
    'security.protocol': config['security.protocol'],
    'sasl.mechanisms': config['sasl.mechanisms']
  });

  return new Promise((resolve, reject) => {
    adminClient.createTopic({
      topic: config.topic,
      num_partitions: 1,
      replication_factor: 3
    }, (err) => {
      if (!err) {
        console.log(`Created topic ${config.topic}`);
        return resolve();
      }

      if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
        return resolve();
      }

      return reject(err);
    });
  });
}

function createProducer(config, onDeliveryReport) {
  const producer = new Kafka.Producer({
    'bootstrap.servers': config['bootstrap.servers'],
    'sasl.username': config['sasl.username'],
    'sasl.password': config['sasl.password'],
    'security.protocol': config['security.protocol'],
    'sasl.mechanisms': config['sasl.mechanisms'],
    'dr_msg_cb': true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

async function produceExample() {
  const config = await configFromCli();

  if (config.usage) {
    return console.log(config.usage);
  }

  await ensureTopicExists(config);

  const producer = await createProducer(config, (err, report) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const {topic, partition, value} = report;
      console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
    }
  });

  var i = 0;

    while(true)
    {
        i++;
        let key = "Car" + i;

        var randType = Math.floor(Math.random() * Object.keys(Types).length);
        var randTypesValue = Types[Object.keys(Types)[randType]];
        
        var randDay = Math.floor(Math.random() * Object.keys(Day).length);
        var randDayValue = Day[Object.keys(Day)[randDay]];

        var randEvent = Math.floor(Math.random() * Object.keys(Event).length);
        var randEventValue = Event[Object.keys(Event)[randEvent]];

        var enterValue = (Math.floor(Math.random() * 5) + 1);

        var exitValue = (Math.floor(Math.random() * 5) + 1);

        while (enterValue == exitValue)
        {
            exitValue = (Math.floor(Math.random() * 5) + 1);
        }

        let car = {
            type : randTypesValue,
            day  : randDayValue,
            event     : randEventValue,
            enter  : enterValue,
            exit  : exitValue
        };
        // const value = Buffer.from(JSON.stringify({ count: idx }));

        // console.log(`Producing record ${key}\t${value}`);
        console.log(`Producing record ${key}\t${car}`);

        producer.produce(config.topic, -1, car, key);
    }

  producer.flush(10000, () => {
    producer.disconnect();
  });
}

produceExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });
