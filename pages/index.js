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

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = topics.filter((t) => {
    const matchFilter = activeFilter === 'all' || activeFilter === t.tier || activeFilter === t.category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

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

      <nav className={styles.nav}>
        <div className={styles.logo}>RABBIT<span>HOLE</span></div>
        <div className={styles.searchWrap}>
          <input className={styles.searchInput} type="text" placeholder="Search 100 topics..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
       <Link href="/travel" style={{fontSize:'12px',color:'#1D9E75',textDecoration:'none',padding:'6px 12px',border:'1px solid #1D9E75',borderRadius:'16px',marginRight:'8px',flexShrink:0}}>✈ Travel</Link>
<Link href="/pro" className={styles.proBadge}>Pro ✦</Link>
<div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
          <Link href="/travel" style={{fontSize:'12px',color:'#1D9E75',textDecoration:'none',padding:'6px 12px',border:'1px solid #1D9E75',borderRadius:'16px'}}>✈ Travel</Link>
          <Link href="/pro" className={styles.proBadge}>Pro ✦</Link>
        </div>
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
          <div className={styles.stat}><div className={styles.statN}>Weekly</div><div className={styles.statL}>updated</div></div>
        </div>
      </section>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button key={f.value} className={styles.filterChip + (activeFilter === f.value ? ' ' + styles.filterChipOn : '')} onClick={() => setActiveFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.surpriseBtn} onClick={surprise}>
        <span>🎲</span>
        <div><strong>Surprise me</strong><span> — drop me into a random rabbit hole</span></div>
        <span className={styles.surpriseArrow}>Feeling lucky? →</span>
      </div>

      <div className={styles.gridHeader}>
        <span className={styles.gridLabel}>{filtered.length === 100 ? 'All 100 topics — click any to see the world\'s most viewed videos' : `Showing ${filtered.length} topics`}</span>
        <span className={styles.gridCount}>{filtered.length} topics</span>
      </div>

      <div className={styles.grid}>
        {filtered.map((t, i) => (
          <Link key={t.slug} href={'/topic/' + t.slug} className={styles.card}>
            <div className={styles.tierDot} style={{ background: tierDot[t.tier] }} />
            {i < 6 && <div className={styles.hotBadge}>HOT</div>}
            <div className={styles.cardEmoji}>{t.emoji}</div>
            <div className={styles.cardName}>{t.name}</div>
            <div className={styles.cardCat}>{t.category}</div>
            <div className={styles.cardViews}>{t.views} total views</div>
          </Link>
        ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>RABBIT<span>HOLE</span></div>
        <p>The world's most viewed videos · 100 topics · updated weekly</p>
      </footer>
    </div>
  );
}
