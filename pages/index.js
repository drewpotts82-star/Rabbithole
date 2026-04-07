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
const MINDLESS_VIDEOS = [
  // Day 0
  [
    { id:'BNiTVsAlzlc', title:'Funny clip — click to watch' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
  ],
  // Day 1
  [
    { id:'BNiTVsAlzlc', title:'Funny clip — click to watch' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
  ],
  // Day 2
  [
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'BNiTVsAlzlc', title:'Click to watch 🎬' },
  ],
  // Day 3
  [
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'BNiTVsAlzlc', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
  ],
  // Day 4
  [
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
    { id:'BNiTVsAlzlc', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
  ],
  // Day 5
  [
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'BNiTVsAlzlc', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
  ],
  // Day 6
  [
    { id:'0stEzx7LRLo', title:'Click to watch 🎬' },
    { id:'vuUTdevYRF4', title:'Click to watch 🎬' },
    { id:'aDBwEVLphdg', title:'Click to watch 🎬' },
    { id:'T1kdVaxHy4M', title:'Click to watch 🎬' },
    { id:'a1Y2hubh7S4', title:'Click to watch 🎬' },
    { id:'BNiTVsAlzlc', title:'Click to watch 🎬' },
    { id:'7TVTti7Aqw8', title:'Click to watch 🎬' },
    { id:'oKl8JoWyfSQ', title:'Click to watch 🎬' },
    { id:'JxdBVXIpwF8', title:'Click to watch 🎬' },
    { id:'ZwQqkuUS1Nk', title:'Click to watch 🎬' },
  ],
];

const tierDot = { gold: '#EF9F27', silver: '#B4B2A9', bronze: '#D85A30' };

// 30 days of mindless fun — 10 videos per day
const MINDLESS_VIDEOS = [
  // Day 0
  [
    { id:'9bZkp7q19f0', title:'PSY - Gangnam Style' },
    { id:'dQw4w9WgXcQ', title:'Rick Astley - Never Gonna Give You Up' },
    { id:'QH2-TGUlwu4', title:'Nyan Cat' },
    { id:'tLt5rBfNQmk', title:'Dramatic Chipmunk' },
    { id:'jofNR_WkoCE', title:'Sneezing Baby Panda' },
    { id:'GxBO_TgkMWI', title:'Dog Fails Bath Time' },
    { id:'hY7m5jjJ9mM', title:'Cat Fails Compilation' },
    { id:'suRGU72dYDc', title:'Goats Screaming Like Humans' },
    { id:'d-LVKX0aOio', title:'Baby Laughing Hysterically' },
    { id:'0Bmhjf0rKe8', title:'Cats vs Cucumbers' },
  ],
  // Day 1
  [
    { id:'MtN1YnoL46Q', title:'Ultimate Dog Tease' },
    { id:'n9pBEAXzJC8', title:'Dog Confused by Magic Trick' },
    { id:'pAwR6w2TgxY', title:'David After Dentist' },
    { id:'kffacxfA7G4', title:'Charlie Bit My Finger' },
    { id:'VrFf8TnVqxk', title:'Dogs Meeting Babies' },
    { id:'H8oMHcMHMG4', title:'Funny Dog Reactions' },
    { id:'PKffm2uI4dk', title:'Cats Being Weird' },
    { id:'tntOCGkgt98', title:'Animals Being Overdramatic' },
    { id:'9f3iDDSjCCA', title:'Dramatic Prairie Dog' },
    { id:'4LlJDNBRrBY', title:'Kids Say Funniest Things' },
  ],
  // Day 2
  [
    { id:'GDpmVUftzfg', title:'Pets vs Mirrors' },
    { id:'K8-DKPGQNX8', title:'People vs Technology' },
    { id:'yPYZpwSpKmA', title:'Dog vs Own Reflection' },
    { id:'jvRdTaRuFGU', title:'Funny News Bloopers' },
    { id:'P7pqXBDFhqM', title:'Ridiculous Sports Fails' },
    { id:'g5qUgCmFKaE', title:'Seagull Steals Camera' },
    { id:'FavUpD_IrlY', title:'Cats in Boxes' },
    { id:'6DGA6RBVZ6Q', title:'Parrots Say Unexpected Things' },
    { id:'yqMTKseMRvY', title:'Dog Hears Weird Noise' },
    { id:'QPiSE8VMp5E', title:'Instant Karma Compilation' },
  ],
  // Day 3
  [
    { id:'9bZkp7q19f0', title:'Gangnam Style Dance Challenge' },
    { id:'dQw4w9WgXcQ', title:'Greatest Rickroll Ever' },
    { id:'rD2d2Dco_L0', title:'Animals Stealing Food' },
    { id:'_OBlgSz8sSM', title:'Overly Dramatic Animals' },
    { id:'nda_OSWeyn8', title:'Nature Documentary Bloopers' },
    { id:'hQR7GSmRFWs', title:'Unexpected Animal Friendships' },
    { id:'8Gv6aWOhMqQ', title:'Things Going Perfectly Wrong' },
    { id:'VqB_WBs3a5I', title:'Satisfying Moments' },
    { id:'3GwjfUFyY6M', title:'World Record Fails' },
    { id:'4woSp8ITpHc', title:'Toddlers Negotiating' },
  ],
  // Day 4
  [
    { id:'QH2-TGUlwu4', title:'Nyan Cat Extended' },
    { id:'tLt5rBfNQmk', title:'Chipmunk Reacts' },
    { id:'jofNR_WkoCE', title:'Baby Animals Sneezing' },
    { id:'suRGU72dYDc', title:'Screaming Goats Remix' },
    { id:'d-LVKX0aOio', title:'Infectious Baby Laugh' },
    { id:'0Bmhjf0rKe8', title:'Cats Freaking Out' },
    { id:'MtN1YnoL46Q', title:'Dog Loves Food' },
    { id:'n9pBEAXzJC8', title:'Dog Magic Trick Reaction' },
    { id:'kffacxfA7G4', title:'Sibling Chaos' },
    { id:'VrFf8TnVqxk', title:'Baby Meets Dog First Time' },
  ],
  // Day 5
  [
    { id:'H8oMHcMHMG4', title:'Cats Being Liquid' },
    { id:'PKffm2uI4dk', title:'Cats Judge Everything' },
    { id:'tntOCGkgt98', title:'Animals Being Extra' },
    { id:'9f3iDDSjCCA', title:'Prairie Dog Meme Original' },
    { id:'4LlJDNBRrBY', title:'Kid Logic Is Flawless' },
    { id:'GDpmVUftzfg', title:'Pets Outsmart Mirrors' },
    { id:'K8-DKPGQNX8', title:'Technology Wins Nobody' },
    { id:'yPYZpwSpKmA', title:'Dog Fights Reflection' },
    { id:'jvRdTaRuFGU', title:'Live TV Goes Wrong' },
    { id:'P7pqXBDFhqM', title:'Sports Fail Compilation' },
  ],
  // Day 6
  [
    { id:'g5qUgCmFKaE', title:'Seagull POV Theft' },
    { id:'FavUpD_IrlY', title:'Cats Love Boxes' },
    { id:'6DGA6RBVZ6Q', title:'Parrots Cause Chaos' },
    { id:'yqMTKseMRvY', title:'Confused Dog Compilation' },
    { id:'QPiSE8VMp5E', title:'Karma Strikes Back' },
    { id:'rD2d2Dco_L0', title:'Food Theft Animals' },
    { id:'_OBlgSz8sSM', title:'Drama Queen Animals' },
    { id:'nda_OSWeyn8', title:'Behind The Scenes Nature' },
    { id:'hQR7GSmRFWs', title:'Animal Odd Couples' },
    { id:'8Gv6aWOhMqQ', title:'Perfect Timing Fails' },
  ],
];

// Educational videos — rotates daily
const EDU_VIDEOS = [
  [
    { id:'Uti2niW2BRA', title:'Why is the sky blue?', channel:'Veritasium' },
    { id:'9D05ej8u-gU', title:'The Zipf Mystery', channel:'Vsauce' },
    { id:'e-P5IFTqB98', title:'How do vaccines work?', channel:'Kurzgesagt' },
  ],
  [
    { id:'IFKnq9QM6_A', title:'The Banach-Tarski Paradox', channel:'Vsauce' },
    { id:'UjtYVSyJBSU', title:'Why Earth is a Prison', channel:'Kurzgesagt' },
    { id:'Qcfuet8Vd5E', title:'How big is the universe?', channel:'Veritasium' },
  ],
  [
    { id:'IJhgZBn-LHg', title:'The science of sleep', channel:'Kurzgesagt' },
    { id:'ZBjhp3hDxiA', title:'Is glass actually a liquid?', channel:'Veritasium' },
    { id:'lmT04FKoHl0', title:'Why don't we all have cancer?', channel:'Kurzgesagt' },
  ],
  [
    { id:'MBRqu0YOH14', title:'Mind-blowing ocean facts', channel:'Vsauce' },
    { id:'B1o-SnmkHoc', title:'How evolution works', channel:'Kurzgesagt' },
    { id:'GNhlqu0LIEI', title:'What is quantum mechanics?', channel:'Veritasium' },
  ],
  [
    { id:'9D05ej8u-gU', title:'The Fermi Paradox', channel:'Kurzgesagt' },
    { id:'IFKnq9QM6_A', title:'Why do we dream?', channel:'Vsauce' },
    { id:'Uti2niW2BRA', title:'How did language evolve?', channel:'Veritasium' },
  ],
  [
    { id:'UjtYVSyJBSU', title:'The origin of the universe', channel:'Kurzgesagt' },
    { id:'IJhgZBn-LHg', title:'Why do we get old?', channel:'Vsauce' },
    { id:'lmT04FKoHl0', title:'How do black holes form?', channel:'Veritasium' },
  ],
  [
    { id:'ZBjhp3hDxiA', title:'The science of getting rich', channel:'Veritasium' },
    { id:'MBRqu0YOH14', title:'What is dark matter?', channel:'Kurzgesagt' },
    { id:'B1o-SnmkHoc', title:'How memories are stored', channel:'Vsauce' },
  ],
];

// Motivational videos — rotates daily
const MOTIVATION_VIDEOS = [
  { id:'mgmVOuLgFB0', title:'Steve Jobs — Stay Hungry Stay Foolish', quote:'Stay hungry. Stay foolish.', author:'Steve Jobs' },
  { id:'_75eHOdFhMI', title:'Matthew McConaughey — This Is Why You\'re Not Happy', quote:'Life is not easy. It is not. And if you have any of those two things going for you, that\'s fine, embrace them.', author:'Matthew McConaughey' },
  { id:'pqFO3Vm6zLk', title:'Denzel Washington — Fall Forward', quote:'Fall forward. Every failed experiment is one step closer to success.', author:'Denzel Washington' },
  { id:'4vl6wCqFbVk', title:'Will Smith — Greatness', quote:'The separation of talent and skill is one of the greatest misunderstood concepts.', author:'Will Smith' },
  { id:'TQMbvJNRpLE', title:'Arnold Schwarzenegger — 6 Rules of Success', quote:'Work your butt off. No matter what you do in life, dig deep and work hard.', author:'Arnold Schwarzenegger' },
  { id:'ROwan_-sFaI', title:'David Goggins — You Are Not Done', quote:'We all have the ability to come from nothing and become something extraordinary.', author:'David Goggins' },
  { id:'lsSC2vx7zFQ', title:'Jim Carrey — Commencement Speech', quote:'You can fail at what you don\'t want, so you might as well take a chance on doing what you love.', author:'Jim Carrey' },
  { id:'BmSHgCMCW5A', title:'Kobe Bryant — Mamba Mentality', quote:'The most important thing is to try and inspire people so that they can be great in whatever they want to do.', author:'Kobe Bryant' },
  { id:'yBLa6mCaRSQ', title:'Shia LaBeouf — Just Do It', quote:'Yesterday you said tomorrow. Just do it.', author:'Shia LaBeouf' },
  { id:'qHnkjOo_VrA', title:'Admiral McRaven — Make Your Bed', quote:'If you want to change the world, start off by making your bed.', author:'Admiral McRaven' },
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
  const [thumbErr, setThumbErr] = useState(false);
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
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
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
  const [activeTab, setActiveTab] = useState('fun');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const featured = getWeeklyFeatured();
  const weekLabel = getWeekLabel();
  const dayIndex = getDayIndex();

  const todaysMindless = MINDLESS_VIDEOS[dayIndex % MINDLESS_VIDEOS.length];
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
        <title>RabbitHole — The World's Most Viewed Videos, By Topic</title>
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
              { id:'fun', label:'🤣 Fun', color:'#EF9F27' },
              { id:'learn', label:'🎓 Learn', color:'#1D9E75' },
              { id:'motivation', label:'💪 Motivation', color:'#D85A30' },
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
              <div style={{ fontSize:'12px', color:'#777672', marginBottom:'14px' }}>10 videos to waste your time beautifully — changes every day</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'10px' }}>
                {todaysMindless.map((v, i) => (
                  <div key={i} style={{ background:'#1a1a18', borderRadius:'10px', overflow:'hidden', border:'1px solid #2a2a28' }}>
                    <div style={{ position:'relative', paddingBottom:'56.25%' }}>
                      <LazyVideo id={v.id} title={v.title} />
                    </div>
                    <div style={{ padding:'8px', fontSize:'11px', color:'#777672', lineHeight:1.3 }}>{v.title}</div>
                  </div>
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
            <div style={{ display:'flex', gap:'24px', alignItems:'center', background:'#1a1a18', border:'1px solid #D85A30', borderRadius:'16px', padding:'24px', flexWrap:'wrap' }}>
              <div style={{ flexShrink:0, width:'300px', borderRadius:'12px', overflow:'hidden' }}>
                <div style={{ position:'relative', paddingBottom:'56.25%' }}>
                  <LazyVideo id={todaysMotivation.id} title={todaysMotivation.title} />
                </div>
              </div>
              <div style={{ flex:1, minWidth:'200px' }}>
                <div style={{ fontSize:'11px', color:'#D85A30', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'16px' }}>Today's Quote</div>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'32px', letterSpacing:'1px', color:'#f0efe9', lineHeight:1.2, marginBottom:'16px' }}>"{todaysMotivation.quote}"</div>
                <div style={{ fontSize:'14px', color:'#777672' }}>— {todaysMotivation.author}</div>
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
