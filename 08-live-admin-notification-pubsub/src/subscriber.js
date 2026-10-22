import Redis from "ioredis";

const subscriber = new Redis(process.env.Redis_URL || 'redis://localhost:6379');

subscriber.subscribe("notification", (err) => {
    if (err) {
        console.error("Failed to subscribe: %s", err.message);
        return;
    }
    console.log("Subscribed successfully!");
});

subscriber.on("message", (channel, message) => {
    console.log("Recevied on", channel, ":", JSON.parse(message));
});