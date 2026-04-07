import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://caring-starfish-72412.upstash.io',
  token: 'gQAAAAAAARrcAAIncDJkNzc1MGJjNjk4Mzk0NmE4OGM2YmE5ZTcyYmVkMmNkZHAyNzI0MTI',
});

export default async function handler(req, res) {
  const game = req.query.game || 'default';
  const key = `leaderboard:${game}`;

  if (req.method === 'POST') {
    const { name, score, total } = req.body;
    if (!name || score === undefined) return res.status(400).json({ error: 'Missing fields' });
    const entry = JSON.stringify({ name: String(name).slice(0, 20), score: Number(score), total: Number(total), date: new Date().toLocaleDateString('en-AU') });
    await redis.zadd(key, { score: Number(score), member: entry });
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    try {
      const results = await redis.zrange(key, 0, 19, { rev: true });
      const leaderboard = results
        .map(r => { try { return typeof r === 'string' ? JSON.parse(r) : r; } catch(e) { return null; } })
        .filter(Boolean);
      return res.status(200).json({ leaderboard });
    } catch(e) {
      return res.status(200).json({ leaderboard: [] });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
