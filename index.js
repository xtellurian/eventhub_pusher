const { EventHubClient } = require("@azure/event-hubs");
const moment = require("moment");

// Define connection string and the name of the Event Hub
const connectionString = process.env.CONNECTION_STRING;
const eventHubsName = process.env.EVENT_HUB_NAME;

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const client = EventHubClient.createFromConnectionString(
    connectionString,
    eventHubsName
  );

  while (true) {
    var mmt = moment();
    // Your moment at midnight
    var mmtMidnight = mmt.clone().startOf("day");
    // Difference in minutes
    var m = mmt.diff(mmtMidnight, "minutes") / (24 * 60);

    const body = {
      t: moment()
        .utc()
        .format("YYYY-MM-dTHH:mm:ss"),
      sine: Math.sin(m),
      s: "sine"
    };
    const eventData = { body: body };
    console.log(`Sending message: ${JSON.stringify(eventData)}`);
    await client.send(eventData);
    await sleep(24000);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
