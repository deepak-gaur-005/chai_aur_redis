import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose'

const app = express();

// 1\. Initialize Redis Client
const redis = new Redis(process.env.REDIS_URL || 'redis://local:6379'); // agar kisi aur file me bana rahe to export likh do

// Test Route: Ping-Pong Verification
app.get('/redis', async (req,res) => {
    const reply = await redis.ping();
    res.json({redis: reply });
})

// Test Route: MongoDB Connection
app.get('/mongo', async (req,res) => {
    const url = process.env.MONGO_URL || 'mongodb://LOCALHOST:27017/chai_aur_redis'
    
    if (mongoose.connection.readyState === 0){
        await mongoose.connect(url)
    }
    res.json({mongo: "connected", database: mongoose.connection.name})
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})