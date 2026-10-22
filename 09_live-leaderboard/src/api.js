import express from 'express'; 
import Redis from 'ioredis'; 

const app = express(); 
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// increment view count of a post 
app.post('/post/:id/view', async (req, res) => {
    const { id } = req.params;
    const view = await redis.incr(`post:{id}:views`);
    res.json({ success: true, postId: id, totalViews: view})
})

//add points to a user score
app.post('/leaderboard/score', async (req, res) => {
    const { userId, points } = req.body;
    const newScore = await redis.zincrby('leaderboard', points, userId);
    res.json({ success: true, userId, updatedScore: Number(newScore) });
});

//get top 10 leaders
app.get('/leaderboard', async (req, res) => {
    const rawData = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');

    const top10 = [];
    for (let i = 0; i < rawData.length; i+= 2){
        top10.push({
            rank: (1/2) + 1,
            userId: rawData[i],
            score: Number(rawData[i+1])
        });
    }
    res.json({ success: true, leaderboard: top10});
})

//get a rank of the user
app.get('/leaderboard/:userId/rank', async (req, res) => {
    const rank = await redis.zrevrank('leaderboard', userId);

    if( rank === null){
        return res.status(404).json({ success: false, message: 'User not found on leaderboard' });
    }

    res.json({ success: true, userId, rank: rank+1}) // 0-indexed ranl ko 1-based rank mein convert kiya
})

app.listen(3000, () => {
    console.log("learderboard API server running on http://localhost:3000");
    
})