const { EventHubClient } = require("@azure/event-hubs");
const moment = require("moment");

// Define connection string and the name of the Event Hub
const connectionString = process.env.CONNECTION_STRING;
const eventHubsName = process.env.EVENT_HUB_NAME;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);

  while (true) {
    let body = {_t: moment(), _schema: "iot_1"}
    const eventData = {body: JSON.stringify(body)};
    console.log(`Sending message: ${eventData.body}`);
    await client.send(eventData);
    await sleep(5000);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});