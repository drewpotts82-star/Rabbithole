import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, score, total } = req.body;
    if (!name || score === undefined) return res.status(400).json({ error: 'Missing fields' });
    const entry = { name: name.slice(0, 20), score, total, date: new Date().toLocaleDateString('en-AU') };
    await redis.zadd(req.query.game === 'guess' ? 'leaderboard:guess' : 'leaderboard', { score, member: JSON.stringify(entry) });
    return res.status(200).json({ success: true });
  }
  if (req.method === 'GET') {
    const results = await redis.zrevrange(req.query.game === 'guess' ? 'leaderboard:guess' : 'leaderboard', 0, 19, { withScores: true });
    const entries = results.map(r => typeof r === 'string' ? JSON.parse(r) : r).filter(r => r.name);
    return res.status(200).json({ leaderboard: entries });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
