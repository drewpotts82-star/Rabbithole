import fs from 'fs';
import { readFileSync } from 'fs';

const envFile = readFileSync('.env.local', 'utf8');
const API_KEY = envFile.split('=')[1].trim();

const topics = [
  { slug: "fishing", query: "fishing world record catch" },
  { slug: "soccer", query: "soccer best goals ever" },
  { slug: "gym", query: "gym workout best ever" },
  { slug: "music-videos", query: "most viewed music video" },
  { slug: "perfume", query: "best perfume fragrance review" },
  { slug: "motorcycles", query: "motorcycle best moments" },
  { slug: "cooking", query: "best cooking video ever" },
  { slug: "golf", query: "golf best shots ever" },
  { slug: "gaming", query: "gaming best moments" },
  { slug: "car-reviews", query: "best car review ever" },
  { slug: "travel", query: "best travel vlog ever" },
  { slug: "home-renovation", query: "home renovation transformation" },
  { slug: "laptops", query: "best laptop review" },
  { slug: "smartphones", query: "best smartphone review" },
  { slug: "skincare", query: "skincare routine best" },
  { slug: "barbering", query: "best barber transformation" },
  { slug: "boxing-mma", query: "best boxing knockout ever" },
  { slug: "van-life", query: "van life build tour" },
  { slug: "guitar", query: "best guitar solo ever" },
  { slug: "surfing", query: "biggest wave surfing ever" },
];

async function fetchTopVideos(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=10&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) return [];
  return data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
  }));
}

async function main() {
  const results = {};
  for (const topic of topics) {
    console.log(`Fetching ${topic.slug}...`);
    const videos = await fetchTopVideos(topic.query);
    results[topic.slug] = videos;
    await new Promise(r => setTimeout(r, 500));
  }
  fs.writeFileSync('videoData.json', JSON.stringify(results, null, 2));
  console.log('Done! Check videoData.json');
}

main();