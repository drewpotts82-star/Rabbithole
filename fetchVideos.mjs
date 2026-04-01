import fs from 'fs';
const API_KEY = 'AIzaSyAopvOVfJzsuu9eQGQebtabvM61KgJ2wXA';

const topics = [
  { slug: "fishing", query: "fishing world record catch biggest fish" },
  { slug: "soccer", query: "soccer best goals ever all time" },
  { slug: "gym", query: "gym workout bodybuilding best ever" },
  { slug: "music-videos", query: "most viewed music video of all time" },
  { slug: "perfume", query: "best perfume fragrance review all time" },
  { slug: "motorcycles", query: "motorcycle best moments compilation" },
  { slug: "cooking", query: "best cooking video gordon ramsay" },
  { slug: "golf", query: "golf best shots ever tiger woods" },
  { slug: "gaming", query: "gaming best moments compilation" },
  { slug: "car-reviews", query: "best car review top gear ever" },
  { slug: "travel", query: "best travel vlog destinations" },
  { slug: "home-renovation", query: "home renovation transformation before after" },
  { slug: "laptops", query: "best laptop review 2024" },
  { slug: "smartphones", query: "best smartphone review iphone samsung" },
  { slug: "skincare", query: "skincare routine dermatologist best" },
  { slug: "barbering", query: "best barber transformation haircut" },
  { slug: "boxing-mma", query: "best boxing knockout compilation ever" },
  { slug: "van-life", query: "van life build tour conversion" },
  { slug: "guitar", query: "best guitar solo ever performance" },
  { slug: "surfing", query: "biggest wave surfing ever pipeline" },
  { slug: "yoga", query: "yoga full body flow beginner" },
  { slug: "camping", query: "solo camping bushcraft survival" },
  { slug: "woodworking", query: "woodworking build timelapse amazing" },
  { slug: "knife-making", query: "knife making forging from scratch" },
  { slug: "backpacking", query: "backpacking travel adventure solo" },
  { slug: "drawing", query: "hyperrealistic drawing art speed paint" },
  { slug: "photography", query: "photography tips techniques best shots" },
  { slug: "crossfit", query: "crossfit games workout best" },
  { slug: "cycling", query: "cycling tour de france mountain bike" },
  { slug: "gardening", query: "gardening grow food timelapse" },
  { slug: "dog-training", query: "dog training transformation obedience" },
  { slug: "street-food", query: "best street food world tour" },
  { slug: "rock-climbing", query: "rock climbing free solo best" },
  { slug: "archery", query: "archery trick shots fastest archer" },
  { slug: "coding", query: "learn coding programming tutorial best" },
  { slug: "bbq", query: "bbq smoking brisket best pitmaster" },
  { slug: "4wd", query: "4wd off road extreme trails" },
  { slug: "martial-arts", query: "martial arts best compilation bruce lee" },
  { slug: "hunting", query: "hunting deer elk best shot" },
  { slug: "chess", query: "chess magnus carlsen best games" },
  { slug: "wildlife", query: "wildlife nature bbc planet earth best" },
  { slug: "piano", query: "piano best performance classical" },
  { slug: "bass-guitar", query: "bass guitar best slap solo" },
  { slug: "wakeboarding", query: "wakeboarding best tricks cable park" },
  { slug: "violin", query: "violin best performance street" },
  { slug: "birdwatching", query: "bird watching rare birds best footage" },
  { slug: "fly-fishing", query: "fly fishing dry fly cast best" },
  { slug: "open-water-swimming", query: "open water swimming ocean cold" },
  { slug: "knitting", query: "knitting crochet best tutorial" },
  { slug: "aquariums", query: "aquarium reef tank build best" },
  { slug: "swimming", query: "swimming michael phelps technique best" },
  { slug: "home-brewing", query: "home brewing beer wine best" },
  { slug: "board-games", query: "board games best review 2024" },
  { slug: "kayaking", query: "kayaking whitewater best run" },
  { slug: "long-range-shooting", query: "long range shooting record mile" },
  { slug: "wine", query: "wine tasting sommelier best review" },
  { slug: "astrophotography", query: "astrophotography milky way best setup" },
  { slug: "house-plants", query: "house plants care guide best" },
  { slug: "whisky", query: "whisky bourbon best tasting review" },
  { slug: "lego", query: "lego build timelapse best set" },
  { slug: "podcasting", query: "podcast setup best microphone studio" },
  { slug: "homesteading", query: "homesteading off grid farm best" },
  { slug: "beekeeping", query: "beekeeping hive honey extraction best" },
  { slug: "science", query: "science experiment best explosion reaction" },
  { slug: "metal-detecting", query: "metal detecting best find treasure" },
  { slug: "magic", query: "magic tricks best david blaine street" },
  { slug: "kitesurfing", query: "kitesurfing best tricks big air" },
  { slug: "rc-vehicles", query: "rc car fastest best compilation" },
  { slug: "freediving", query: "freediving world record depth best" },
  { slug: "foraging", query: "foraging wild food mushroom best" },
  { slug: "roller-skating", query: "roller skating best tricks dance" },
  { slug: "horse-riding", query: "horse riding dressage show jumping best" },
  { slug: "scuba-diving", query: "scuba diving best dive sites reef" },
  { slug: "rowing", query: "rowing oxford cambridge boat race best" },
  { slug: "paintball", query: "paintball best competition pro" },
  { slug: "bouldering", query: "bouldering hardest problem best climber" },
  { slug: "powerlifting", query: "powerlifting world record best lifts" },
  { slug: "miniature-painting", query: "miniature painting best warhammer tutorial" },
  { slug: "snowboarding", query: "snowboarding best tricks shaun white" },
  { slug: "filmmaking", query: "filmmaking cinematic best techniques" },
  { slug: "cat-behaviour", query: "cat behaviour funny best compilation" },
  { slug: "history", query: "history battle documentary best" },
  { slug: "tiny-houses", query: "tiny house best build tour" },
  { slug: "comedy", query: "stand up comedy best special" },
];

async function fetchTopVideos(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=10&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) { console.log('  API error:', data.error?.message); return []; }
  return data.items.map(item => ({ id: item.id.videoId, title: item.snippet.title }));
}

async function main() {
  let existing = {};
  try { existing = JSON.parse(fs.readFileSync('videoData.json', 'utf8')); } catch(e) {}
  const results = { ...existing };
  let fetched = 0;
  for (const topic of topics) {
    if (existing[topic.slug] && existing[topic.slug].length > 0) {
      console.log(`✓ ${topic.slug}`);
      continue;
    }
    console.log(`Fetching ${topic.slug}...`);
    const videos = await fetchTopVideos(topic.query);
    results[topic.slug] = videos;
    fetched++;
    console.log(`  Got ${videos.length} videos`);
    if (fetched % 5 === 0) fs.writeFileSync('videoData.json', JSON.stringify(results, null, 2));
    await new Promise(r => setTimeout(r, 600));
  }
  fs.writeFileSync('videoData.json', JSON.stringify(results, null, 2));
  const output = 'const videoData = ' + JSON.stringify(results, null, 2) + ';\nexport default videoData;';
  fs.writeFileSync('data/videoData.js', output);
  console.log(`\nDone! ${Object.keys(results).length} topics total`);
}

main();
