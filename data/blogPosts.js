import Head from 'next/head';
import Link from 'next/link';

export const POSTS = {
  'most-viewed-fishing-video': {
    title: 'The story behind the most viewed fishing video of all time',
    date: '7 Apr 2026', emoji: '🎣', readTime: '4 min read',
    content: [
      { type:'intro', text:'One fishing video has been watched over 500 million times. It did not come from a major TV network or a celebrity angler. It came from an ordinary person with a camera, standing in the water, doing what they loved.' },
      { type:'h2', text:'How does a fishing video get 500 million views?' },
      { type:'p', text:'The answer is simpler than you would think. YouTube\'s algorithm rewards watch time above everything else. Fishing videos are uniquely well suited to this — they are calming, they build tension naturally, and the payoff of a catch creates a perfect emotional arc that keeps viewers watching to the end.' },
      { type:'p', text:'The top fishing channels discovered early that their audience was not just fishermen. People who had never held a rod were watching hours of fishing content simply because it was relaxing. The genre became a form of meditation for millions.' },
      { type:'h2', text:'The numbers behind fishing on YouTube' },
      { type:'p', text:'The top 10 most viewed fishing videos on YouTube have a combined view count that dwarfs most blockbuster movies. A topic most people would dismiss as niche consistently outperforms gaming, cooking and even music in total accumulated views.' },
      { type:'p', text:'Part of this is longevity. A great fishing video does not expire. The same video that went viral in 2015 is still accumulating views today because the content is timeless. A perfect cast, a monster catch, a breathtaking location — these things never get old.' },
      { type:'h2', text:'What makes a fishing video go viral?' },
      { type:'p', text:'Three things: location, species and size. Videos filmed in exotic or visually stunning locations perform significantly better than backyard pond footage. Catching a species most people have never seen — a massive grouper, an ancient sturgeon — generates instant fascination.' },
      { type:'p', text:'And then there is the record-breaking element. Humans are hardwired to be impressed by extremes. The biggest fish ever caught on camera. The longest cast. The most unexpected location. These videos spread because people feel compelled to share something that seems impossible.' },
      { type:'link', text:'See the full fishing rankings →', href:'/topic/fishing' },
    ],
  },
  'why-golf-dominates-youtube': {
    title: 'Why golf dominates YouTube more than any other sport',
    date: '6 Apr 2026', emoji: '⛳', readTime: '5 min read',
    content: [
      { type:'intro', text:'If you had to guess which sport generates the most YouTube views, you would probably say football or basketball. You would be wrong. Golf dominates YouTube in a way that defies all logic.' },
      { type:'h2', text:'The numbers do not lie' },
      { type:'p', text:'The top 10 most viewed golf videos on YouTube have a combined view count that exceeds the populations of most continents. A single Tiger Woods clip from 1997 has more views than entire seasons of other sports highlight packages.' },
      { type:'h2', text:'Why golf works so perfectly on video' },
      { type:'p', text:'Golf is a game of precision. And precision, when captured on camera, is uniquely satisfying to watch. A perfect drive that splits the fairway. A putt that drops from 40 feet. A chip shot that bounces twice and rolls straight into the hole.' },
      { type:'p', text:'These moments trigger the same neural response as watching a gymnast land perfectly. The human brain is wired to appreciate skill executed flawlessly, and golf provides these moments in concentrated doses.' },
      { type:'h2', text:'The trick shot phenomenon' },
      { type:'p', text:'A significant portion of golf\'s YouTube dominance comes from trick shot videos. Dude Perfect discovered that golf trick shots were the perfect format — visually spectacular, seemingly impossible, and rewarding repeated viewing.' },
      { type:'link', text:'Explore the most viewed golf videos →', href:'/topic/golf' },
    ],
  },
  'untranslatable-words': {
    title: '30 untranslatable words that every traveller needs to know',
    date: '5 Apr 2026', emoji: '🗣️', readTime: '6 min read',
    content: [
      { type:'intro', text:'Some languages have developed words for experiences so specific, so human, that no other language has found the need to name them. Until you hear these words, you might not even realise you have been feeling them.' },
      { type:'h2', text:'Words for feelings travellers know well' },
      { type:'p', text:'Fernweh (German) — a longing for far-off places you have never been. Different from wanderlust, fernweh is specifically about places unknown. The ache for somewhere you have only seen in photographs.' },
      { type:'p', text:'Dépaysement (French) — the feeling of being a foreigner, of being out of your element. Most serious travellers seek it deliberately.' },
      { type:'p', text:'Hiraeth (Welsh) — a homesickness for a home you cannot return to or that never existed. Travellers often feel this upon returning from a life-changing trip.' },
      { type:'h2', text:'Words for everyday moments' },
      { type:'p', text:'Sobremesa (Spanish) — the time spent talking after a meal, still at the table, when the food is gone but nobody wants to leave. In Spain this can last hours.' },
      { type:'p', text:'Hygge (Danish) — the cosy feeling of warmth, comfort and togetherness. Candles, blankets, good company, no agenda.' },
      { type:'p', text:'Kummerspeck (German) — weight gained from emotional eating. Literally translated as grief bacon.' },
      { type:'link', text:'Play the Language Game →', href:'/language-game' },
    ],
  },
  'most-viewed-travel-destinations': {
    title: 'The most viewed travel destination on YouTube might surprise you',
    date: '4 Apr 2026', emoji: '🌍', readTime: '4 min read',
    content: [
      { type:'intro', text:'We ranked 100 travel destinations by their combined YouTube view count. The most glamorous destinations did not win. The winner was determined purely by how much the world wants to watch videos about it.' },
      { type:'h2', text:'What the data reveals' },
      { type:'p', text:'The destinations that dominate YouTube are not necessarily the most visited. They are the most dreamed about. YouTube view counts are a measure of desire, not just tourism.' },
      { type:'h2', text:'The surprise winners' },
      { type:'p', text:'Iceland consistently outperforms destinations with ten times its annual tourist numbers. A country of 370,000 people generates billions of YouTube views because its landscapes are so visually extraordinary.' },
      { type:'p', text:'Patagonia, at the southern tip of South America, has a fraction of the accessibility of Paris or New York. Yet it generates views that would make major cities jealous. Wild places photograph beautifully. Beautiful photographs become viral videos.' },
      { type:'link', text:'Explore all 100 destinations →', href:'/travel' },
    ],
  },
  'beekeeping-youtube-phenomenon': {
    title: 'Why beekeeping became one of YouTube\'s most watched topics',
    date: '3 Apr 2026', emoji: '🐝', readTime: '3 min read',
    content: [
      { type:'intro', text:'Nobody saw it coming. In the mid-2010s, beekeeping videos started accumulating views at a rate that made no sense. People who had never considered keeping bees were watching hours of beekeeping content.' },
      { type:'h2', text:'The psychology of beekeeping videos' },
      { type:'p', text:'Beekeeping videos are deeply, inexplicably satisfying to watch. The methodical movements of an experienced beekeeper, the visible structure of the hive, the sound of thousands of bees working in organised chaos — it triggers something primal in the human brain.' },
      { type:'p', text:'Psychologists point to beekeeping videos as a perfect storm of satisfying elements: repetitive motion, natural sounds, visible order emerging from apparent chaos, and the quiet confidence of someone completely in their element.' },
      { type:'link', text:'Explore the beekeeping rankings →', href:'/topic/beekeeping' },
    ],
  },
  'van-life-most-viewed': {
    title: 'The van life video that started a global movement',
    date: '2 Apr 2026', emoji: '🚐', readTime: '5 min read',
    content: [
      { type:'intro', text:'In 2015 a video appeared on YouTube that changed the way millions of people thought about work, freedom and what a life could look like. Two people, a converted van, and no fixed address. It inspired one of the most significant lifestyle movements of the decade.' },
      { type:'h2', text:'What van life actually is' },
      { type:'p', text:'Van life is about something much bigger than accommodation choices. It is about rejecting the conventional life script: school, career, mortgage, retirement. The most viewed van life videos tap into a fantasy that resonates across demographics.' },
      { type:'h2', text:'The numbers behind the movement' },
      { type:'p', text:'Van life content has accumulated billions of views across YouTube. Channels dedicated entirely to life on the road have subscriber counts that rival major media companies. YouTube did not just document the van life movement. It created it.' },
      { type:'link', text:'See the most viewed van life videos →', href:'/topic/van-life' },
    ],
  },
};
