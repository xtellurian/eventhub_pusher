# eventhub_pusher

This project is for a container that sends a message to an event hub every 5 seconds.

The message consists of JSON with a single property: _t, which is the time.

```
docker pull xtellurian/eventhub-pusher:latest
docker run -e "CONNECTION_STRING=connection_string" -e "EVENT_HUB_NAME=name" xtellurian/eventhub-pusher:latest
```
