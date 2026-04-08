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
const TAG = 'rabbitholevid-20';
const AFF = (q) => `https://www.amazon.com.au/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

// Travel gear — shown on the travel homepage
const TRAVEL_GEAR = [
  { name: 'Osprey Farpoint 40L Travel Backpack', price: 'Shop now', tag: 'Best seller', emoji: '🎒', link: AFF('osprey farpoint 40 travel backpack') },
  { name: 'Samsonite Spinner Carry-On Luggage', price: 'Shop now', tag: 'Top rated', emoji: '🧳', link: AFF('samsonite spinner carry on luggage') },
  { name: 'Packing Cubes Set — 6 Piece', price: 'Shop now', tag: 'Must have', emoji: '📦', link: AFF('packing cubes set travel organiser') },
  { name: 'Sony ZV-1 Travel Camera', price: 'Shop now', tag: 'Vloggers choice', emoji: '📷', link: AFF('sony zv-1 travel camera vlog') },
  { name: 'Anker 65W USB-C Travel Charger', price: 'Shop now', tag: 'Universal', emoji: '🔌', link: AFF('anker 65w usb-c travel charger') },
  { name: 'Travel Pillow Memory Foam', price: 'Shop now', tag: 'Flight essential', emoji: '😴', link: AFF('travel pillow memory foam neck') },
  { name: 'Pacsafe Anti-Theft Crossbody Bag', price: 'Shop now', tag: 'Stay safe', emoji: '🔒', link: AFF('pacsafe anti theft crossbody travel bag') },
  { name: 'Hydro Flask 32oz Wide Mouth Bottle', price: 'Shop now', tag: 'Eco pick', emoji: '💧', link: AFF('hydro flask 32oz wide mouth water bottle') },
];

function TravelProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display:'flex', flexDirection:'column', background:hovered?'#252523':'#1a1a18', border:`1px solid ${hovered?'rgba(255,255,255,0.18)':'#333331'}`, borderRadius:'12px', padding:'14px', textDecoration:'none', transition:'all 0.2s', transform:hovered?'translateY(-2px)':'none' }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
        <span style={{ fontSize:'20px' }}>{product.emoji}</span>
        <span style={{ fontSize:'9px', fontWeight:'700', padding:'3px 8px', borderRadius:'99px', background:'rgba(245,197,24,0.12)', color:'#f5c518', textTransform:'uppercase' }}>{product.tag}</span>
      </div>
      <p style={{ margin:'0 0 10px', fontSize:'12px', fontWeight:'500', color:'#f0efe9', lineHeight:1.4, flex:1 }}>{product.name}</p>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:'12px', fontWeight:'600', color:'#1D9E75' }}>{product.price}</span>
        <span style={{ fontSize:'10px', fontWeight:'700', padding:'5px 12px', borderRadius:'99px', background:'#D85A30', color:'#fff' }}>View →</span>
      </div>
    </a>
  );
}

export default function TravelPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [proEmail, setProEmail] = useState('');
  const [proDone, setProDone] = useState(false);

  const filtered = destinations.filter((d) => {
    const matchFilter = activeFilter === 'all' || activeFilter === d.region || activeFilter === d.tier;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const surprise = () => {
    const pick = destinations[Math.floor(Math.random() * destinations.length)];
    window.location.href = '/destination/' + pick.slug;
  };

  const handlePro = async (e) => {
    e.preventDefault();
    if (!proEmail) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: proEmail, topic: 'travel' }),
      });
    } catch(e) {}
    setProDone(true);
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
        <div style={{ fontSize: '12px', color: '#1D9E75', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>✈ Pack like the world's best travel creators</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '52px', letterSpacing: '3px', lineHeight: 1, color: '#f0efe9', marginBottom: '12px' }}>
          100 DESTINATIONS.<br /><span style={{ color: '#D85A30' }}>ENDLESS</span> INSPIRATION.
        </h1>
        <p style={{ fontSize: '15px', color: '#777672', lineHeight: 1.6, marginBottom: '24px' }}>
          Watch the world's most viewed travel videos — then pack the gear to go yourself.
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* PACK LIKE A PRO — Travel gear section */}
        <div style={{ margin: '0 0 28px', padding: '20px 24px', background: '#1e1e1c', border: '1px solid #333331', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#777672', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '2px' }}>✈ Pack like a pro</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#f0efe9' }}>Gear used by the world's most viewed travel creators</div>
            </div>
            <a href={AFF('travel gear essentials backpack luggage')} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#1D9E75', textDecoration: 'none', border: '1px solid #1D9E75', padding: '6px 14px', borderRadius: '99px' }}>
              Shop all travel gear →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {TRAVEL_GEAR.map((p) => <TravelProductCard key={p.name} product={p} />)}
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '10px', color: '#444441', textAlign: 'center' }}>
            As an Amazon Associate we earn from qualifying purchases — at no extra cost to you.
          </p>
        </div>

        {/* PRO BANNER */}
        <div style={{ margin: '0 0 24px', padding: '20px 24px', background: 'linear-gradient(135deg, rgba(29,158,117,0.08) 0%, rgba(239,159,39,0.08) 100%)', border: '1px solid rgba(29,158,117,0.25)', borderRadius: '16px' }}>
          {proDone ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>🎉</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#f0efe9' }}>You're in! Weekly travel gear guides incoming.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '2px', color: '#f0efe9' }}>RABBITHOLE TRAVEL</span>
                  <span style={{ background: 'linear-gradient(135deg, #1D9E75, #EF9F27)', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '99px' }}>PRO</span>
                </div>
                <div style={{ fontSize: '13px', color: '#777672' }}>Get a weekly packing guide for wherever is trending. Free forever.</div>
              </div>
              <form onSubmit={handlePro} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input type="email" required value={proEmail} onChange={(e) => setProEmail(e.target.value)} placeholder="your@email.com"
                  style={{ padding: '10px 16px', background: '#111110', border: '1px solid #333331', borderRadius: '99px', color: '#f0efe9', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', outline: 'none', minWidth: '180px' }} />
                <button type="submit" style={{ padding: '10px 20px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '99px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                  Get packing guides →
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Featured / Destination of Day */}
      {(() => {
        const weekIndex = Math.floor(Date.now() / (7 * 86400000)) % destinations.length;
        const featured = destinations[weekIndex % destinations.length];
        const todIndex = Math.floor(Date.now() / 86400000) % destinations.length;
        const tod = destinations[(todIndex + 1) % destinations.length];
        return (
          <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px 20px', border: '1px solid #EF9F27', borderRadius: '12px', background: 'rgba(239,159,39,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '22px' }}>{featured.emoji}</span>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#EF9F27', textTransform: 'uppercase', marginBottom: '2px' }}>⭐ Destination of the Week</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#f0efe9' }}>{featured.name}</div>
                    <div style={{ fontSize: '11px', color: '#777672' }}>Changes every Monday</div>
                  </div>
                </div>
                <Link href={`/destination/${featured.slug}`} style={{ background: '#EF9F27', color: '#111110', textDecoration: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>Explore →</Link>
              </div>
              <div style={{ padding: '16px 20px', border: '1px solid #2a2a28', borderRadius: '12px', background: '#0d0d0b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '22px' }}>{tod.emoji}</span>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#777672', textTransform: 'uppercase', marginBottom: '2px' }}>📅 Destination of the Day</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#f0efe9' }}>{tod.name}</div>
                    <div style={{ fontSize: '11px', color: '#777672' }}>Changes every day</div>
                  </div>
                </div>
                <Link href={`/destination/${tod.slug}`} style={{ background: '#1D9E75', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', whiteSpace: 'nowrap' }}>Visit today →</Link>
              </div>
            </div>
          </div>
        );
      })()}

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
          <div key={d.slug} style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href={`/destination/${d.slug}`} style={{ background: '#1e1e1c', border: '1px solid #333331', borderRadius: '12px 12px 0 0', padding: '14px', cursor: 'pointer', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', flex: 1 }}>
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
            <a href={AFF(d.name + ' travel gear packing')} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', padding: '6px', fontSize: '11px', fontWeight: '600', color: '#1D9E75', textDecoration: 'none', background: 'rgba(29,158,117,0.08)', borderRadius: '0 0 10px 10px', borderTop: '1px solid rgba(29,158,117,0.15)' }}>
              Pack for {d.name} →
            </a>
          </div>
        ))}
      </div>

      <footer style={{ borderTop: '1px solid #333331', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '2px', color: '#D85A30', marginBottom: '6px' }}>RABBIT<span style={{ color: '#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize: '11px', color: '#777672' }}>100 destinations · most viewed travel videos worldwide · updated weekly</p>
      </footer>
    </div>
  );
}
