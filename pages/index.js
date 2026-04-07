import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import topics from '../data/topics';
import styles from '../styles/Home.module.css';

const FILTERS = [
  { label: 'All 100', value: 'all' },
  { label: 'Sport', value: 'sport' },
  { label: 'Hobby', value: 'hobby' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Food', value: 'food' },
  { label: 'Music', value: 'music' },
  { label: 'Tech', value: 'tech' },
  { label: 'Nature', value: 'nature' },
  { label: 'Top earners', value: 'gold' },
];

const tierDot = { gold: '#EF9F27', silver: '#B4B2A9', bronze: '#D85A30' };

// 30 days of mindless fun — 10 videos per day
const VIRAL_FACTS = [
  { emoji:'🎵', fact:'Baby Shark has been watched over 13 billion times — making it the most viewed video in YouTube history', link:'https://www.youtube.com/watch?v=XqZsoesa55w', label:'Watch Baby Shark' },
  { emoji:'🎤', fact:'PSY\'s Gangnam Style was the first YouTube video to reach 1 billion views — in 2012', link:'https://www.youtube.com/watch?v=9bZkp7q19f0', label:'Watch Gangnam Style' },
  { emoji:'🐠', fact:'The most viewed fishing video has been watched over 500 million times by people who have never held a fishing rod', link:'/topic/fishing', label:'See fishing rankings' },
  { emoji:'⛳', fact:'Golf trick shot videos have accumulated more views than the entire population of North America has people', link:'/topic/golf', label:'See golf rankings' },
  { emoji:'🍳', fact:'Gordon Ramsay\'s most viewed cooking video has been watched more times than there are people in Europe', link:'/topic/cooking', label:'See cooking rankings' },
  { emoji:'🐝', fact:'Beekeeping videos get millions of views from people who are terrified of bees — it\'s one of YouTube\'s most relaxing genres', link:'/topic/beekeeping', label:'See beekeeping rankings' },
  { emoji:'🚐', fact:'Van life videos have inspired thousands of people to quit their jobs and live on the road — an entire movement born on YouTube', link:'/topic/van-life', label:'See van life rankings' },
  { emoji:'🎸', fact:'The most viewed guitar video has been watched by more people than live in Australia — over 30 million times', link:'/topic/guitar', label:'See guitar rankings' },
  { emoji:'🏋️', fact:'Gym motivation videos collectively have over 10 billion views — more people watch gym videos than actually go to the gym', link:'/topic/gym', label:'See gym rankings' },
  { emoji:'🌴', fact:'Bali travel videos have been watched over 8 billion times — making it the most viewed travel destination on YouTube', link:'/destination/bali', label:'See Bali videos' },
  { emoji:'🎮', fact:'Gaming is the single biggest category on YouTube — the top 10 gaming videos alone have over 50 billion combined views', link:'/topic/gaming', label:'See gaming rankings' },
  { emoji:'🐕', fact:'Dog training videos outsell cat videos 3 to 1 on YouTube — turns out people really want their dogs to behave', link:'/topic/dog-training', label:'See dog training rankings' },
  { emoji:'🎯', fact:'The most viewed darts video has more views than there are darts players in the entire world', link:'/topic/archery', label:'See archery rankings' },
  { emoji:'🌊', fact:'Surfing wipeout videos get 10x more views than perfect wave videos — humans love watching things go wrong', link:'/topic/surfing', label:'See surfing rankings' },
  { emoji:'🔥', fact:'BBQ videos peak in views every Friday afternoon worldwide — people plan their weekends around what they watch on YouTube', link:'/topic/bbq', label:'See BBQ rankings' },
  { emoji:'🎻', fact:'Classical violin videos get more views than most pop music videos — YouTube has made classical music cool again', link:'/topic/violin', label:'See violin rankings' },
  { emoji:'🧘', fact:'Yoga is one of the fastest growing topics on YouTube — the top 10 yoga videos have over 2 billion combined views', link:'/topic/yoga', label:'See yoga rankings' },
  { emoji:'📸', fact:'Photography tutorial videos have more combined views than the entire population of China has watched them', link:'/topic/photography', label:'See photography rankings' },
  { emoji:'🏔️', fact:'Iceland travel videos get more views per capita than any other country — 370,000 people inspire billions of views', link:'/destination/iceland', label:'See Iceland videos' },
  { emoji:'🗣️', fact:`The word "Schadenfreude" means pleasure derived from someone else\'s misfortune — Germans have a word for everything`, link:'/language-game', label:'Play the language game' },
  { emoji:'🌍', fact:'The flag game on RabbitHole reveals that most people can\'t identify the flags of countries they\'ve visited', link:'/flag-game', label:'Test your flag knowledge' },
  { emoji:'🎯', fact:'The average person scores 6/10 on the RabbitHole "Which Has More Views?" game — the results always surprise people', link:'/game', label:'Play the game' },
  { emoji:'🐇', fact:'RabbitHole has 100 topics covering over 500 billion combined YouTube views — enough video to watch for 40,000 years', link:'/', label:'Explore all topics' },
  { emoji:'✈️', fact:'Tokyo is the most searched travel destination on YouTube — more people want to visit Japan than any other country', link:'/destination/tokyo', label:'See Tokyo videos' },
  { emoji:'🍜', fact:'Street food videos from Thailand get more views than street food videos from France — pad thai beats croissants', link:'/topic/street-food', label:'See street food rankings' },
  { emoji:'🎪', fact:'Magic trick reveal videos get twice as many views as magic trick performance videos — people love knowing the secret', link:'/topic/magic', label:'See magic rankings' },
  { emoji:'🦅', fact:'Birdwatching videos are one of the fastest growing niches on YouTube — it\'s not just for retired people anymore', link:'/topic/birdwatching', label:'See birdwatching rankings' },
  { emoji:'🏊', fact:'Swimming tutorial videos peak every December in Australia and every June in the UK — seasonal YouTube is a real thing', link:'/topic/swimming', label:'See swimming rankings' },
  { emoji:'🎲', fact:'Board game review videos have more views than most Hollywood movie trailers — tabletop gaming is huge on YouTube', link:'/topic/board-games', label:'See board game rankings' },
  { emoji:'🔭', fact:'Astrophotography is one of the most visually stunning topics on YouTube — the night sky never gets old', link:'/topic/astrophotography', label:'See astrophotography rankings' },
];

// Educational videos — rotates daily
const EDU_VIDEOS = [
  // Day 0
  [
    { id:'isdLel273rQ', title:'The Paradox of an Infinite Universe', channel:'Kurzgesagt – In a Nutshell' },
    { id:'uhKPtJrbqUM', title:'Mind blowing fact about the movie interstellar you', channel:'Theos and Rem' },
    { id:'pjaN2WHAHVo', title:'14 Minutes of Mind-Blowing Space Facts! | With Ast', channel:'Astral Curiosity' },
  ],
  // Day 1
  [
    { id:'IVtG8NhY38A', title:'What’s gives fireworks their colors 🤔 #science #s', channel:'Imagination Station Toledo' },
    { id:'ipbsTRR-a3s', title:'Understanding Bernoullis Theorem Walter Lewin', channel:'Science Explained' },
    { id:'ORxKf1FN3ro', title:'The real science of black holes', channel:'Veritasium' },
  ],
  // Day 2
  [
    { id:'nfxeb9bI6eY', title:'Unseen Animals Amazing Facts #shorts Facts Cloud b', channel:'Akash Parihar' },
    { id:'jpAhyVvyM_o', title:'Mysterious Indian Mummy |  Keerthi History        ', channel:'Keerthi' },
    { id:'rpO652J2VnM', title:'Why Is The Mona Lisa So Famous? 😮 (EXPLAINED)', channel:'Zack D. Films' },
  ],
  // Day 3
  [
    { id:'-hzue8KIS9M', title:'Thermite Balls', channel:'Vsauce' },
    { id:'inG9yUZ5vY8', title:'the circle dot trick', channel:'Vsauce' },
    { id:'-UAUiSJP8tU', title:'Is A 2-Sided Polygon Possible?', channel:'Vsauce' },
  ],
  // Day 4
  [
    { id:'p0Bq55rfjZw', title:'The Biggest Planet In The Universe #space #planet ', channel:'AstroKobi' },
    { id:'bshzBEzk_sQ', title:'What Shape Is Our Universe?', channel:'Action Lab Shorts' },
    { id:'libKVRa01L8', title:'Solar System 101 | National Geographic', channel:'National Geographic' },
  ],
  // Day 5
  [
    { id:'9gzBj6UzRKk', title:'Mind Blowing Psychological Facts 🤯🧠 Amazing Fact', channel:'Hindi TV India' },
    { id:'yHVkFiG6S_Y', title:'Mind Blowing Psychological Facts 🤯🧠 Amazing Fact', channel:'Hindi TV India' },
    { id:'l4tWdTmYZoM', title:'19 Simple Psychological Tricks That Actually Work', channel:'BRIGHT SIDE' },
  ],
  // Day 6
  [
    { id:'JDTHyTLKAo0', title:'ये Animals दोबारा ज़िंदा हो सकतें हैं 😱 | Animals', channel:'Facts Mine' },
    { id:'nfxeb9bI6eY', title:'Unseen Animals Amazing Facts #shorts Facts Cloud b', channel:'Akash Parihar' },
    { id:'FeJKJ5MoCHY', title:'10 TOP Natural History Moments | BBC Earth', channel:'BBC Earth' },
  ],
];

// Motivational videos — rotates daily
const MOTIVATION_VIDEOS = [
  { id:'mgmVOuLgFB0', title:'Steve Jobs Stanford Commencement Speech', quote:'Stay hungry. Stay foolish.', author:'Steve Jobs' },
  { id:'pqFO3Vm6zLk', title:'Denzel Washington Fall Forward', quote:'Fall forward. Every failed experiment is one step closer to success.', author:'Denzel Washington' },
  { id:'4vl6wCqFbVk', title:'Will Smith on Greatness', quote:'The separation of talent and skill is one of the greatest misunderstood concepts.', author:'Will Smith' },
  { id:'TQMbvJNRpLE', title:'Arnold Schwarzenegger 6 Rules of Success', quote:'Work your butt off. No matter what you do in life, dig deep and work hard.', author:'Arnold Schwarzenegger' },
  { id:'lsSC2vx7zFQ', title:'Jim Carrey Commencement Speech', quote:'You can fail at what you dont want, so you might as well take a chance on doing what you love.', author:'Jim Carrey' },
  { id:'qHnkjOo_VrA', title:'Admiral McRaven Make Your Bed', quote:'If you want to change the world, start off by making your bed.', author:'Admiral McRaven' },
  { id:'ROwan_-sFaI', title:'David Goggins You Are Not Done', quote:'We all have the ability to come from nothing and become something extraordinary.', author:'David Goggins' },
  { id:'BmSHgCMCW5A', title:'Kobe Bryant Mamba Mentality', quote:'The most important thing is to try and inspire people so that they can be great.', author:'Kobe Bryant' },
  { id:'_75eHOdFhMI', title:'Matthew McConaughey This Is Why Youre Not Happy', quote:'Life is not easy. It is not. And if you have any of those two things going for you embrace them.', author:'Matthew McConaughey' },
  { id:'yBLa6mCaRSQ', title:'Shia LaBeouf Just Do It', quote:'Yesterday you said tomorrow. Just do it.', author:'Shia LaBeouf' },
];

// Blog posts — add new ones here
const BLOG_POSTS = [
  { slug:'most-viewed-fishing-video', title:'The story behind the most viewed fishing video of all time', date:'7 Apr 2026', excerpt:'One fishing video has been watched over 500 million times. Here\'s why the world couldn\'t stop watching.' },
  { slug:'why-golf-dominates-youtube', title:'Why golf dominates YouTube more than any other sport', date:'6 Apr 2026', excerpt:'The numbers are staggering. The top 10 golf videos have a combined view count bigger than most countries\' populations.' },
  { slug:'untranslatable-words', title:'30 untranslatable words that every traveller needs to know', date:'5 Apr 2026', excerpt:'Schadenfreude. Hygge. Saudade. Words that capture feelings English simply can\'t.' },
];

function getWeeklyFeatured() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return topics[weekNumber % topics.length];
}

function getWeekLabel() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  return fmt(monday) + ' - ' + fmt(sunday);
}

function getDayIndex() {
  return Math.floor(Date.now() / 86400000);
}

function LazyVideo({ id, title }) {
  const [playing, setPlaying] = useState(false);
  const [thumbQuality, setThumbQuality] = useState(0);
  const thumbErr = thumbQuality >= 3;
  const thumbUrls = [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  ];
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
        allowFullScreen
        title={title}
      />
    );
  }
  return (
    <div onClick={() => setPlaying(true)} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', cursor:'pointer', background:'#1a1a18', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {!thumbErr ? (
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          onError={(e) => { e.target.style.display='none'; setThumbErr(true); }}
          style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }}
        />
      ) : (
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'linear-gradient(135deg, #111110 0%, #1a1a18 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:'32px' }}>▶️</span>
        </div>
      )}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'52px', height:'52px', background:'rgba(255,0,0,0.9)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
        <div style={{ width:0, height:0, borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderLeft:'18px solid white', marginLeft:'4px' }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('learn');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const featured = getWeeklyFeatured();
  const weekLabel = getWeekLabel();
  const dayIndex = getDayIndex();

  const todaysFacts = VIRAL_FACTS;
  const todaysEdu = EDU_VIDEOS[dayIndex % EDU_VIDEOS.length];
  const todaysMotivation = MOTIVATION_VIDEOS[dayIndex % MOTIVATION_VIDEOS.length];

  const filtered = topics.filter((t) => {
    const matchFilter = activeFilter === 'all' || activeFilter === t.tier || activeFilter === t.category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const displayedTopics = showAllTopics || search || activeFilter !== 'all'
    ? filtered
    : filtered.slice(0, 12);

  const surprise = () => {
    const pick = topics[Math.floor(Math.random() * topics.length)];
    window.location.href = '/topic/' + pick.slug;
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>RabbitHole — The Worlds Most Viewed Videos, By Topic</title>
        <meta name="description" content="See the most viewed YouTube videos of all time across 100 topics — fishing, gaming, cooking, golf and more. Ranked by total views worldwide." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>RABBIT<span>HOLE</span></div>
        <div className={styles.searchWrap}>
          <input className={styles.searchInput} type="text" placeholder="Search 100 topics..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Link href="/play" style={{ fontSize:'14px', fontWeight:'500', color:'#EF9F27', textDecoration:'none', padding:'8px 18px', border:'1px solid #EF9F27', borderRadius:'20px', flexShrink:0, marginRight:'8px' }}>🎮 Play</Link>
        <Link href="/travel" style={{ fontSize:'14px', fontWeight:'500', color:'#1D9E75', textDecoration:'none', padding:'8px 18px', border:'1px solid #1D9E75', borderRadius:'20px', flexShrink:0 }}>✈ Travel</Link>
        <Link href="/blog" style={{ fontSize:'14px', fontWeight:'500', color:'#f0efe9', textDecoration:'none', padding:'8px 18px', border:'1px solid #333331', borderRadius:'20px', flexShrink:0 }}>✍️ Blog</Link>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>🌍 The world's most viewed videos — ranked</div>
        <h1 className={styles.heroTitle}>100 TOPICS.<br /><em>BILLIONS</em> OF VIEWS.</h1>
        <p className={styles.heroSub}>
          What are the most watched fishing videos of all time? The most viewed cooking videos on earth?
          RabbitHole ranks the top 10 most viewed YouTube videos across 100 topics — updated weekly.
        </p>
        <div className={styles.statsRow}>
          <div className={styles.stat}><div className={styles.statN}>100</div><div className={styles.statL}>topics</div></div>
          <div className={styles.stat}><div className={styles.statN}>1,000</div><div className={styles.statL}>top videos</div></div>
          <div className={styles.stat}><div className={styles.statN}>500B+</div><div className={styles.statL}>combined views</div></div>
          <div className={styles.stat}><div className={styles.statN}>Daily</div><div className={styles.statL}>updated</div></div>
        </div>
      </section>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>

        {/* Daily Content Tabs */}
        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', gap:'0', overflowX:'auto', scrollbarWidth:'none', borderBottom:'1px solid #2a2a28', marginBottom:'20px' }}>
            {[
              // { id:'motivation', label:'💪 Motivation', color:'#D85A30' },
              { id:'learn', label:'🎓 Learn', color:'#1D9E75' },
              { id:'fun', label:'🤯 Viral Facts', color:'#EF9F27' },
              { id:'blog', label:'✍️ Blog', color:'#f0efe9' },
              { id:'games', label:'🎮 Games', color:'#EF9F27' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ background:'transparent', border:'none', borderBottom: activeTab===tab.id ? '2px solid '+tab.color : '2px solid transparent', color: activeTab===tab.id ? tab.color : '#a0a09a', padding:'12px 20px', fontSize:'16px', fontWeight:'600', cursor:'pointer', fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap', marginBottom:'-1px', transition:'all 0.2s' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'fun' && (
            <div>
              <div style={{ fontSize:'12px', color:'#777672', marginBottom:'16px' }}>Mind-blowing YouTube facts — did you know these? 🤯</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'12px' }}>
                {VIRAL_FACTS.slice(0, 3).map((fact, i) => (
                  <a key={i} href={fact.link} style={{ textDecoration:'none', display:'block', background:'#1a1a18', border:'1px solid #2a2a28', borderRadius:'12px', padding:'20px', transition:'border-color 0.2s' }}>
                    <div style={{ fontSize:'36px', marginBottom:'10px' }}>{fact.emoji}</div>
                    <div style={{ fontSize:'14px', color:'#f0efe9', lineHeight:1.5, marginBottom:'12px' }}>{fact.fact}</div>
                    <div style={{ fontSize:'12px', color:'#1D9E75' }}>{fact.label} →</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'learn' && (
            <div>
              <div style={{ fontSize:'12px', color:'#777672', marginBottom:'14px' }}>3 mind-blowing videos — science, history, nature and more</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'16px' }}>
                {todaysEdu.map((v, i) => (
                  <div key={i} style={{ background:'#1a1a18', borderRadius:'12px', overflow:'hidden', border:'1px solid #1D9E75' }}>
                    <div style={{ position:'relative', paddingBottom:'56.25%' }}>
                      <LazyVideo id={v.id} title={v.title} />
                    </div>
                    <div style={{ padding:'12px' }}>
                      <div style={{ fontSize:'10px', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'4px' }}>{v.channel}</div>
                      <div style={{ fontSize:'13px', color:'#f0efe9', fontWeight:'500', lineHeight:1.3 }}>{v.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'motivation' && (
            <div>
              <div style={{ fontSize:'12px', color:'#777672', marginBottom:'16px' }}>3 videos to fuel your day — changes every morning</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'16px', marginBottom:'20px' }}>
                {MOTIVATION_VIDEOS.slice(dayIndex % MOTIVATION_VIDEOS.length, (dayIndex % MOTIVATION_VIDEOS.length) + 3).map((v, i) => (
                  <div key={i} style={{ background:'#1a1a18', borderRadius:'12px', overflow:'hidden', border:'1px solid #D85A30' }}>
                    <div style={{ position:'relative', paddingBottom:'56.25%' }}>
                      <LazyVideo id={v.id} title={v.title} />
                    </div>
                    <div style={{ padding:'12px' }}>
                      <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'16px', letterSpacing:'1px', color:'#f0efe9', marginBottom:'6px' }}>"{v.quote}"</div>
                      <div style={{ fontSize:'12px', color:'#D85A30' }}>— {v.author}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                <div style={{ fontSize:'12px', color:'#777672' }}>Stories behind the world's most viewed videos</div>
                <Link href="/blog" style={{ fontSize:'12px', color:'#1D9E75', textDecoration:'none', border:'1px solid #1D9E75', padding:'4px 12px', borderRadius:'10px' }}>All posts →</Link>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'12px' }}>
                {BLOG_POSTS.map((post) => (
                  <Link key={post.slug} href={'/blog/'+post.slug} style={{ textDecoration:'none', display:'block', background:'#1a1a18', border:'1px solid #2a2a28', borderRadius:'12px', padding:'20px' }}>
                    <div style={{ fontSize:'11px', color:'#777672', marginBottom:'8px' }}>{post.date}</div>
                    <div style={{ fontSize:'15px', fontWeight:'600', color:'#f0efe9', marginBottom:'8px', lineHeight:1.3 }}>{post.title}</div>
                    <div style={{ fontSize:'13px', color:'#777672', lineHeight:1.5 }}>{post.excerpt}</div>
                    <div style={{ fontSize:'13px', color:'#1D9E75', marginTop:'12px' }}>Read more →</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div>
              <div style={{ fontSize:'12px', color:'#777672', marginBottom:'16px' }}>5 free games — test your YouTube knowledge</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'12px' }}>
                {[
                  { href:'/game', emoji:'⚔️', title:'Which Has More Views?', desc:'42 rounds · Global leaderboard', color:'#1D9E75' },
                  { href:'/guess', emoji:'🎯', title:'Guess The Views', desc:'10 rounds · Max 30 points', color:'#EF9F27' },
                  { href:'/higher-or-lower', emoji:'🔥', title:'Higher or Lower', desc:'Build your streak · One wrong = over', color:'#D85A30' },
                  { href:'/flag-game', emoji:'🌍', title:'Flag to Destination', desc:'15 rounds · Travel knowledge', color:'#1D9E75' },
                  { href:'/language-game', emoji:'🗣️', title:'What Does This Mean?', desc:'10 rounds · Untranslatable words', color:'#EF9F27' },
                ].map(game => (
                  <Link key={game.href} href={game.href} style={{ textDecoration:'none', background:'#1a1a18', border:'1px solid #2a2a28', borderRadius:'12px', padding:'20px', display:'block' }}>
                    <div style={{ fontSize:'32px', marginBottom:'10px' }}>{game.emoji}</div>
                    <div style={{ fontSize:'15px', fontWeight:'600', color:'#f0efe9', marginBottom:'6px' }}>{game.title}</div>
                    <div style={{ fontSize:'12px', color:'#777672', marginBottom:'14px' }}>{game.desc}</div>
                    <div style={{ display:'inline-block', background:game.color, color: game.color==='#EF9F27'?'#111110':'#fff', borderRadius:'16px', padding:'6px 16px', fontSize:'12px', fontWeight:'500' }}>Play now →</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

                {/* ⭐ Featured This Week */}
        <div style={{ marginBottom:'24px' }}>
          <Link href={'/topic/' + featured.slug} style={{ textDecoration:'none', display:'block' }}>
            <div style={{ background:'#1e1e1c', border:'1px solid #EF9F27', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }}>
              <div style={{ fontSize:'28px', flexShrink:0 }}>{featured.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'10px', color:'#EF9F27', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'2px' }}>⭐ Featured This Week · {weekLabel}</div>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', letterSpacing:'2px', color:'#f0efe9', lineHeight:1 }}>{featured.name}</div>
                <div style={{ fontSize:'12px', color:'#1D9E75', marginTop:'2px' }}>{featured.views} combined views</div>
              </div>
              <div style={{ background:'#EF9F27', color:'#412402', padding:'6px 14px', borderRadius:'16px', fontSize:'12px', fontWeight:'600', whiteSpace:'nowrap', flexShrink:0 }}>Explore →</div>
            </div>
          </Link>
        </div>

        {/* 📅 Topic of the Day */}
        {(() => {
          const tod = topics[(dayIndex + 1) % topics.length];
          return (
            <div style={{ margin:'0 0 24px 0', padding:'16px 20px', border:'1px solid #2a2a28', borderRadius:'12px', background:'#0d0d0b', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ fontSize:'22px' }}>{tod.emoji}</span>
                <div>
                  <div style={{ fontSize:'10px', letterSpacing:'0.1em', color:'#777672', textTransform:'uppercase', marginBottom:'2px' }}>📅 Topic of the Day</div>
                  <div style={{ fontSize:'16px', fontWeight:'600', color:'#f0efe9' }}>{tod.name}</div>
                </div>
              </div>
              <Link href={`/topic/${tod.slug}`} style={{ background:'#1D9E75', color:'#fff', textDecoration:'none', padding:'8px 18px', borderRadius:'20px', fontSize:'13px', fontWeight:'500', whiteSpace:'nowrap' }}>Watch today →</Link>
            </div>
          );
        })()}



        {/* Surprise Me */}
        <div className={styles.surpriseBtn} onClick={surprise}>
          <span>🎲</span>
          <div><strong>Surprise me</strong><span> — drop me into a random rabbit hole</span></div>
          <span className={styles.surpriseArrow}>Feeling lucky? →</span>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button key={f.value} className={styles.filterChip + (activeFilter === f.value ? ' ' + styles.filterChipOn : '')} onClick={() => setActiveFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Topic Grid */}
        <div className={styles.gridHeader}>
          <span className={styles.gridLabel}>{search || activeFilter !== 'all' ? `Showing ${filtered.length} topics` : showAllTopics ? 'Showing all 100 topics' : 'Showing top 12 topics'}</span>
          <span className={styles.gridCount}>{filtered.length} topics</span>
        </div>

        <div className={styles.grid}>
          {displayedTopics.map((t, i) => (
            <Link key={t.slug} href={'/topic/' + t.slug} className={styles.card}>
              <div className={styles.tierDot} style={{ background: tierDot[t.tier] }} />
              {t.slug === featured.slug && <div className={styles.hotBadge} style={{ background:'rgba(239,159,39,0.2)', color:'#EF9F27' }}>THIS WEEK</div>}
              {i < 6 && t.slug !== featured.slug && <div className={styles.hotBadge}>HOT</div>}
              <div className={styles.cardEmoji}>{t.emoji}</div>
              <div className={styles.cardName}>{t.name}</div>
              <div className={styles.cardCat}>{t.category}</div>
              <div className={styles.cardViews}>{t.views} total views</div>
            </Link>
          ))}
        </div>

        {!showAllTopics && !search && activeFilter === 'all' && (
          <div style={{ textAlign:'center', margin:'24px 0 40px' }}>
            <button onClick={() => setShowAllTopics(true)} style={{ background:'transparent', color:'#f0efe9', border:'1px solid #333331', borderRadius:'20px', padding:'12px 32px', fontSize:'14px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Show all 100 topics ↓
            </button>
          </div>
        )}

      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>RABBIT<span>HOLE</span></div>
        <p>The world's most viewed videos · 100 topics · updated daily</p>
      </footer>
    </div>
  );
}
