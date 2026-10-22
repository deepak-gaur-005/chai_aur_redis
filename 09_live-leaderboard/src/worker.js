import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

console.log("Simulating live user updates....");

setInterval(async () => {
    const randomUser = `user_${Math.floor(Math.random() * 15) + 1}`; //Random User ID banao (user 1 se user 15 ke beech)
    const randomPoints = Math.floor(Math.random() * 50) + 10;  //Random Points generate karo (10 se 50 points ke beech)

    //Redis Sorted Set ('leaderboard') mein score update karega
    // ZINCRBY: Agar user pehle se hai toh points add honge, nahi toh naya user ban jayega
    const newScore = await redis.zincrby('leaderboard', randomPoints,randomUser);
    
    console.log(`[Worker] Updated ${randomUser} by ${randomPoints} pts -> Total: ${newScore}`); 
},3000);

