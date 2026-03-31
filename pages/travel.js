import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import destinations from '../data/destinations';

const FILTERS = [
  { label: 'All destinations', value: 'all' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Americas', value: 'americas' },
  { label: 'Africa', value: 'africa' },
  { label: 'Middle East', value: 'middleeast' },
  { label: 'Oceania', value: 'oceania' },
  { label: 'Top rated', value: 'gold' },
];

const tierDot = { gold: '#EF9F27', silver: '#B4B2A9', bronze: '#D85A30' };

export default function TravelPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = destinations.filter((d) => {
    const matchFilter = activeFilter === 'all' || activeFilter === d.region || activeFilter === d.tier;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const surprise = () => {
    const pick = destinations[Math.floor(Math.random() * destinations.length)];
    window.location.href = '/destination/' + pick.slug;
  };

  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>RabbitHole Travel — Most Viewed Travel Videos By Destination</title>
        <meta name="description" content="The most viewed travel videos for 100 destinations worldwide. Bali, Tokyo, Paris, New York and more — ranked by total YouTube views." />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: '#1e1e1c', borderBottom: '1px solid #333331', position: 'sticky', top: 0, zIndex: 50, flexWrap: 'wrap' }}>
        <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', letterSpacing: '2px', color: '#D85A30', textDecoration: 'none' }}>
          RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', background: '#111110', border: '1px solid #333331', borderRadius: '20px', padding: '6px 14px', flex: 1, minWidth: '140px' }}>
          <input style={{ background: 'none', border: 'none', color: '#f0efe9', fontSize: '13px', outline: 'none', width: '100%', fontFamily: 'DM Sans, sans-serif' }} type="text" placeholder="Search 100 destinations..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#777672', textDecoration: 'none', padding: '6px 12px', border: '1px solid #333331', borderRadius: '16px' }}>100 Topics</Link>
          <span style={{ fontSize: '12px', color: '#1D9E75', padding: '6px 12px', border: '1px solid #1D9E75', borderRadius: '16px' }}>✈ Travel</span>
        </div>
      </nav>

      <section style={{ padding: '48px 24px 24px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '12px', color: '#1D9E75', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>✈ Plan your next adventure</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '52px', letterSpacing: '3px', lineHeight: 1, color: '#f0efe9', marginBottom: '12px' }}>
          100 DESTINATIONS.<br /><span style={{ color: '#D85A30' }}>ENDLESS</span> INSPIRATION.
        </h1>
        <p style={{ fontSize: '15px', color: '#777672', lineHeight: 1.6, marginBottom: '24px' }}>
          The world's most viewed travel videos for every destination — ranked by total YouTube views. Book hotels, tours and experiences directly.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
          {[['100', 'destinations'], ['1,000', 'travel videos'], ['3', 'ways to book'], ['Free', 'forever']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', color: '#1D9E75' }}>{n}</div>
              <div style={{ fontSize: '11px', color: '#777672' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', gap: '8px', padding: '16px 24px', overflowX: 'auto', borderBottom: '1px solid #333331', scrollbarWidth: 'none' }}>
        {FILTERS.map((f) => (
          <button key={f.value} onClick={() => setActiveFilter(f.value)} style={{ padding: '6px 16px', borderRadius: '20px', border: `1px solid ${activeFilter === f.value ? '#D85A30' : '#333331'}`, color: activeFilter === f.value ? '#fff' : '#777672', background: activeFilter === f.value ? '#D85A30' : 'transparent', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div onClick={surprise} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 24px', background: '#1e1e1c', border: '1px solid #333331', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
        <span style={{ fontSize: '20px' }}>🎲</span>
        <div><strong style={{ fontSize: '14px', color: '#f0efe9' }}>Surprise me</strong><span style={{ fontSize: '12px', color: '#777672' }}> — take me somewhere random</span></div>
        <span style={{ marginLeft: 'auto', color: '#7F77DD', fontSize: '12px' }}>Feeling lucky? →</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', padding: '8px 24px 24px' }}>
        {filtered.map((d, i) => (
          <Link key={d.slug} href={`/destination/${d.slug}`} style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '12px', padding: '14px', cursor: 'pointer', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', background: tierDot[d.tier] }} />
            {i < 6 && <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'rgba(29,158,117,0.2)', color: '#1D9E75', fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: '500' }}>HOT</div>}
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{d.emoji}</div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#f0efe9', lineHeight: 1.3, marginBottom: '2px' }}>{d.name}</div>
            <div style={{ fontSize: '11px', color: '#777672' }}>{d.country}</div>
            <div style={{ fontSize: '11px', color: '#1D9E75', marginTop: '6px' }}>{d.views} views</div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
              <span style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(29,158,117,0.15)', color: '#1D9E75', borderRadius: '3px' }}>Hotels</span>
              <span style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(127,119,221,0.15)', color: '#7F77DD', borderRadius: '3px' }}>Tours</span>
            </div>
          </Link>
        ))}
      </div>

      <footer style={{ borderTop: '1px solid #333331', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: '#D85A30', marginBottom: '6px' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize: '11px', color: '#777672' }}>100 destinations · most viewed travel videos worldwide · updated weekly</p>
      </footer>
    </div>
  );
}
