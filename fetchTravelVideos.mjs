import fs from 'fs';
const API_KEY = 'AIzaSyBXPoiKwJYapFo0wqTJ5w1xUUkgpTWXE_k';

const destinations = [
  { slug: "bali", query: "Bali Indonesia travel guide best" },
  { slug: "tokyo", query: "Tokyo Japan travel guide best" },
  { slug: "kyoto", query: "Kyoto Japan travel guide temples" },
  { slug: "bangkok", query: "Bangkok Thailand travel guide best" },
  { slug: "singapore", query: "Singapore travel guide best" },
  { slug: "vietnam", query: "Vietnam travel guide best" },
  { slug: "maldives", query: "Maldives travel guide best" },
  { slug: "nepal", query: "Nepal trek travel guide best" },
  { slug: "sri-lanka", query: "Sri Lanka travel guide best" },
  { slug: "hong-kong", query: "Hong Kong travel guide best" },
  { slug: "seoul", query: "Seoul South Korea travel guide best" },
  { slug: "taipei", query: "Taipei Taiwan travel guide best" },
  { slug: "rajasthan", query: "Rajasthan India travel guide best" },
  { slug: "philippines", query: "Philippines travel guide best" },
  { slug: "angkor-wat", query: "Angkor Wat Cambodia travel guide" },
  { slug: "halong-bay", query: "Ha Long Bay Vietnam cruise guide" },
  { slug: "paris", query: "Paris France travel guide best" },
  { slug: "rome", query: "Rome Italy travel guide best" },
  { slug: "barcelona", query: "Barcelona Spain travel guide best" },
  { slug: "amsterdam", query: "Amsterdam Netherlands travel guide" },
  { slug: "santorini", query: "Santorini Greece travel guide best" },
  { slug: "london", query: "London UK travel guide best" },
  { slug: "iceland", query: "Iceland travel guide best" },
  { slug: "amalfi-coast", query: "Amalfi Coast Italy travel guide" },
  { slug: "dubrovnik", query: "Dubrovnik Croatia travel guide best" },
  { slug: "prague", query: "Prague Czech Republic travel guide" },
  { slug: "lisbon", query: "Lisbon Portugal travel guide best" },
  { slug: "florence", query: "Florence Italy travel guide best" },
  { slug: "venice", query: "Venice Italy travel guide best" },
  { slug: "swiss-alps", query: "Swiss Alps Switzerland travel guide" },
  { slug: "budapest", query: "Budapest Hungary travel guide best" },
  { slug: "edinburgh", query: "Edinburgh Scotland travel guide best" },
  { slug: "scottish-highlands", query: "Scottish Highlands travel guide" },
  { slug: "tuscany", query: "Tuscany Italy travel guide best" },
  { slug: "vienna", query: "Vienna Austria travel guide best" },
  { slug: "porto", query: "Porto Portugal travel guide best" },
  { slug: "new-york", query: "New York City travel guide best" },
  { slug: "machu-picchu", query: "Machu Picchu Peru travel guide" },
  { slug: "rio-de-janeiro", query: "Rio de Janeiro Brazil travel guide" },
  { slug: "mexico-city", query: "Mexico City CDMX travel guide best" },
  { slug: "patagonia", query: "Patagonia Argentina Chile travel guide" },
  { slug: "costa-rica", query: "Costa Rica travel guide best" },
  { slug: "galapagos", query: "Galapagos Islands travel guide best" },
  { slug: "canadian-rockies", query: "Banff Canadian Rockies travel guide" },
  { slug: "hawaii", query: "Hawaii travel guide best islands" },
  { slug: "cartagena", query: "Cartagena Colombia travel guide best" },
  { slug: "medellin", query: "Medellin Colombia travel guide best" },
  { slug: "havana", query: "Havana Cuba travel guide best" },
  { slug: "san-francisco", query: "San Francisco travel guide best" },
  { slug: "miami", query: "Miami Florida travel guide best" },
  { slug: "new-orleans", query: "New Orleans travel guide best" },
  { slug: "kenya-safari", query: "Kenya safari Masai Mara travel guide" },
  { slug: "morocco", query: "Morocco Marrakech travel guide best" },
  { slug: "dubai", query: "Dubai UAE travel guide best" },
  { slug: "serengeti", query: "Serengeti Tanzania safari travel guide" },
  { slug: "egypt", query: "Egypt pyramids travel guide best" },
  { slug: "cape-town", query: "Cape Town South Africa travel guide" },
  { slug: "istanbul", query: "Istanbul Turkey travel guide best" },
  { slug: "cappadocia", query: "Cappadocia Turkey travel guide best" },
  { slug: "jordan", query: "Petra Jordan travel guide best" },
  { slug: "sydney", query: "Sydney Australia travel guide best" },
  { slug: "new-zealand", query: "New Zealand travel guide best" },
  { slug: "great-barrier-reef", query: "Great Barrier Reef Australia travel" },
  { slug: "fiji", query: "Fiji travel guide best islands" },
  { slug: "melbourne", query: "Melbourne Australia travel guide best" },
  { slug: "alaska", query: "Alaska travel guide best" },
  { slug: "phuket", query: "Phuket Thailand travel guide best" },
  { slug: "chiang-mai", query: "Chiang Mai Thailand travel guide best" },
  { slug: "penang", query: "Penang Malaysia travel food guide" },
  { slug: "lombok", query: "Lombok Indonesia travel guide best" },
  { slug: "bhutan", query: "Bhutan travel guide tigers nest" },
  { slug: "mekong-vietnam", query: "Mekong Delta Vietnam travel guide" },
  { slug: "cinque-terre", query: "Cinque Terre Italy travel guide best" },
  { slug: "bruges", query: "Bruges Belgium travel guide best" },
  { slug: "kotor", query: "Kotor Montenegro travel guide best" },
  { slug: "madeira", query: "Madeira Portugal travel guide best" },
  { slug: "azores", query: "Azores Portugal travel guide best" },
  { slug: "crete", query: "Crete Greece travel guide best" },
  { slug: "amalfi-positano", query: "Positano Amalfi coast travel guide" },
  { slug: "buenos-aires", query: "Buenos Aires Argentina travel guide" },
  { slug: "tulum", query: "Tulum Mexico travel guide cenotes" },
  { slug: "cancun", query: "Cancun Mexico travel guide best" },
  { slug: "vancouver", query: "Vancouver Canada travel guide best" },
  { slug: "sedona", query: "Sedona Arizona travel guide hiking" },
  { slug: "nashville", query: "Nashville Tennessee travel guide best" },
  { slug: "peru-cusco", query: "Cusco Peru travel guide best" },
  { slug: "zanzibar", query: "Zanzibar Tanzania travel guide best" },
  { slug: "rwanda", query: "Rwanda gorilla trekking travel guide" },
  { slug: "mauritius", query: "Mauritius travel guide best beaches" },
  { slug: "oman", query: "Oman travel guide best muscat" },
  { slug: "georgia-country", query: "Georgia Tbilisi travel guide best" },
  { slug: "abu-dhabi", query: "Abu Dhabi UAE travel guide best" },
  { slug: "gold-coast", query: "Gold Coast Australia travel guide" },
  { slug: "tasmania", query: "Tasmania Australia travel guide best" },
  { slug: "whitsundays", query: "Whitsundays Australia sailing guide" },
  { slug: "queenstown-nz", query: "Queenstown New Zealand travel guide" },
  { slug: "cook-islands", query: "Cook Islands travel guide best" },
  { slug: "bora-bora", query: "Bora Bora French Polynesia travel guide" },
  { slug: "colombo", query: "Colombo Sri Lanka travel guide" },
  { slug: "lisbon-sintra", query: "Sintra Portugal travel guide palaces" },
];

async function fetchTopVideos(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=10&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) {
    console.log('  API error:', data.error?.message);
    return [];
  }
  return data.items.map(item => ({ id: item.id.videoId, title: item.snippet.title }));
}

async function main() {
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync('travelVideoData.json', 'utf8'));
    console.log(`Loaded ${Object.keys(existing).length} existing destinations`);
  } catch(e) {
    console.log('Starting fresh');
  }

  const results = { ...existing };
  let fetched = 0;

  for (const dest of destinations) {
    if (existing[dest.slug] && existing[dest.slug].length > 0) {
      console.log(`✓ ${dest.slug}`);
      continue;
    }
    console.log(`Fetching ${dest.slug}...`);
    const videos = await fetchTopVideos(dest.query);
    results[dest.slug] = videos;
    fetched++;
    console.log(`  Got ${videos.length} videos`);
    if (fetched % 5 === 0) {
      fs.writeFileSync('travelVideoData.json', JSON.stringify(results, null, 2));
      console.log(`Progress saved (${fetched} fetched)`);
    }
    await new Promise(r => setTimeout(r, 600));
  }

  fs.writeFileSync('travelVideoData.json', JSON.stringify(results, null, 2));

  const output = 'const travelVideoData = ' + JSON.stringify(results, null, 2) + ';\nexport default travelVideoData;';
  fs.writeFileSync('data/travelVideoData.js', output);

  console.log(`\nDone! ${Object.keys(results).length} destinations total`);
}

main();
