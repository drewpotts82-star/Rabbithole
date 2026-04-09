import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import destinations from '../../data/destinations';
import travelVideoData from '../../data/travelVideoData';

export async function getStaticPaths() {
  const paths = destinations.map((d) => ({ params: { slug: d.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const destination = destinations.find((d) => d.slug === params.slug);
  if (!destination) return { notFound: true };
  const related = destinations.filter((d) => d && d.region === destination.region && d.slug !== destination.slug).slice(0, 6);
  const videos = (travelVideoData[params.slug] || []).slice(0, 10);
  return { props: { destination, related, videos } };
}

const fakeViews = ['892M views','741M views','624M views','580M views','498M views','441M views','389M views','312M views','267M views','198M views'];
const rankStyle = [
  { color: '#EF9F27', size: '42px', bg: 'rgba(239,159,39,0.1)' },
  { color: '#B4B2A9', size: '36px', bg: 'rgba(180,178,169,0.1)' },
  { color: '#D85A30', size: '32px', bg: 'rgba(216,90,48,0.1)' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
  { color: '#555553', size: '22px', bg: 'transparent' },
];

const TAG = 'rabbitholevid-20';
const AFF = (q) => `https://www.amazon.com.au/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

// Travel gear products shown between videos
const TRAVEL_PRODUCTS_EARLY = [
  { name: 'Osprey Farpoint 40L Travel Backpack', tag: 'Best seller', emoji: '🎒', link: AFF('osprey farpoint 40 travel backpack') },
  { name: 'Packing Cubes Set — 6 Piece', tag: 'Must have', emoji: '📦', link: AFF('packing cubes set travel organiser') },
];
const TRAVEL_PRODUCTS_MID = [
  { name: 'Sony ZV-1 Travel Camera', tag: 'Vloggers choice', emoji: '📷', link: AFF('sony zv-1 travel camera vlog') },
  { name: 'Anker 65W USB-C Travel Charger', tag: 'Universal', emoji: '🔌', link: AFF('anker 65w usb-c travel charger') },
];

function TravelGearCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={product.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display:'flex', flexDirection:'column', background:hovered?'#252523':'#1a1a18', border:`1px solid ${hovered?'rgba(255,255,255,0.18)':'#333331'}`, borderRadius:'12px', padding:'14px', textDecoration:'none', transition:'all 0.2s', transform:hovered?'translateY(-2px)':'none' }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
        <span style={{ fontSize:'20px' }}>{product.emoji}</span>
        <span style={{ fontSize:'9px', fontWeight:'700', padding:'3px 8px', borderRadius:'99px', background:'rgba(245,197,24,0.12)', color:'#f5c518', textTransform:'uppercase' }}>{product.tag}</span>
      </div>
      <p style={{ margin:'0 0 10px', fontSize:'12px', fontWeight:'500', color:'#f0efe9', lineHeight:1.4, flex:1 }}>{product.name}</p>
      <span style={{ fontSize:'10px', fontWeight:'700', padding:'5px 12px', borderRadius:'99px', background:'#D85A30', color:'#fff', textAlign:'center' }}>Shop on Amazon →</span>
    </a>
  );
}

function MidTravelGear({ destination: d, position }) {
  const products = position === 'early' ? TRAVEL_PRODUCTS_EARLY : TRAVEL_PRODUCTS_MID;
  const headline = position === 'early'
    ? `⚡ Pack like the world's best ${d.name} travel creators`
    : `🛒 Inspired? Here's what you need to visit ${d.name}`;
  return (
    <div style={{ margin:'4px 0 20px', padding:'14px', background:'#1e1e1c', borderRadius:'12px', border:'1px solid #333331' }}>
      <div style={{ fontSize:'12px', fontWeight:'600', color:'#f0efe9', marginBottom:'10px' }}>{headline}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'10px' }}>
        {products.map((p) => <TravelGearCard key={p.name} product={p} />)}
      </div>
      <a href={d.gearLink} target="_blank" rel="noopener noreferrer"
        style={{ display:'block', textAlign:'center', fontSize:'12px', color:'#1D9E75', textDecoration:'none', padding:'8px', border:'1px solid rgba(29,158,117,0.3)', borderRadius:'8px' }}>
        Shop all {d.name} travel gear on Amazon →
      </a>
    </div>
  );
}

export default function DestinationPage({ destination: d, related, videos }) {
  const [emailVal, setEmailVal] = useState('');
  const [emailDone, setEmailDone] = useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!emailVal) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal, topic: d.slug }),
      });
    } catch(e) {}
    setEmailDone(true);
  };

  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>{`Best ${d.name} Travel Videos — RabbitHole`}</title>
        <meta name="description" content={`The top 10 most viewed ${d.name} travel videos on YouTube. Plan your trip to ${d.name}, ${d.country} — book hotels, tours and experiences.`} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>
          RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span>
        </Link>
        <Link href="/travel" style={{ fontSize:'13px', color:'#777672', textDecoration:'none' }}>← All destinations</Link>
      </nav>

      <div style={{ display:'flex', alignItems:'center', gap:'20px', padding:'32px 24px', background:d.bg, borderBottom:'1px solid #333331' }}>
        <div style={{ fontSize:'72px' }}>{d.emoji}</div>
        <div>
          <div style={{ fontSize:'11px', color:'#777672', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'4px' }}>✈ {d.country}</div>
          <h1 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'44px', letterSpacing:'2px', color:'#f0efe9', lineHeight:1 }}>{d.name}</h1>
          <div style={{ fontSize:'15px', color:'#777672', marginTop:'4px', marginBottom:'10px' }}>{d.desc}</div>
          <div style={{ fontSize:'20px', fontWeight:'500', color:'#1D9E75' }}>{d.views} total views</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px', padding:'16px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331' }}>
        <a href={d.bookingLink} target="_blank" rel="noopener noreferrer" style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background:'#003580', borderRadius:'10px', textDecoration:'none', gap:'4px' }}>
          <span style={{ fontSize:'18px' }}>🏨</span>
          <span style={{ fontSize:'12px', fontWeight:'500', color:'#fff' }}>Book Hotels</span>
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.7)' }}>via Booking.com</span>
        </a>
        <a href={d.tourLink} target="_blank" rel="noopener noreferrer" style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background:'#1D9E75', borderRadius:'10px', textDecoration:'none', gap:'4px' }}>
          <span style={{ fontSize:'18px' }}>🎟</span>
          <span style={{ fontSize:'12px', fontWeight:'500', color:'#fff' }}>Book Tours</span>
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.7)' }}>via GetYourGuide</span>
        </a>
        <a href={d.gearLink} target="_blank" rel="noopener noreferrer" style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'12px', background:'#232F3E', borderRadius:'10px', textDecoration:'none', gap:'4px' }}>
          <span style={{ fontSize:'18px' }}>🎒</span>
          <span style={{ fontSize:'12px', fontWeight:'500', color:'#fff' }}>Travel Gear</span>
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.7)' }}>via Amazon</span>
        </a>
      </div>

      {/* Inspiration CTA */}
      <div style={{ margin:'16px 24px 0', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap', padding:'16px 20px', background:'rgba(29,158,117,0.07)', border:'1px solid rgba(29,158,117,0.22)', borderRadius:'12px' }}>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'500', color:'#f0efe9', marginBottom:'3px' }}>
              ✈ Planning a trip to {d.name}? Pack like the pros.
            </div>
            <div style={{ fontSize:'12px', color:'#777672' }}>Gear used by the world's most viewed {d.name} travel creators</div>
          </div>
          <a href={d.gearLink} target="_blank" rel="noopener noreferrer"
            style={{ flexShrink:0, padding:'9px 18px', background:'#1D9E75', color:'#fff', borderRadius:'99px', textDecoration:'none', fontSize:'13px', fontWeight:'500', whiteSpace:'nowrap' }}>
            Shop travel gear →
          </a>
        </div>
      </div>

      <div style={{ padding:'24px', maxWidth:'820px', margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', letterSpacing:'1px', color:'#777672', marginBottom:'20px' }}>
          Top 10 most viewed {d.name} travel videos — worldwide
        </h2>

        {videos.length > 0 ? videos.map((video, i) => (
          <div key={i}>
            <div style={{ marginBottom:'20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:rankStyle[i].size, color:rankStyle[i].color, background:rankStyle[i].bg, minWidth:'64px', textAlign:'center', padding:'4px 8px', borderRadius:'6px', lineHeight:1 }}>
                  #{i+1}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:i<3?'15px':'13px', fontWeight:'500', color:'#f0efe9', marginBottom:'4px' }}>{video.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'13px', color:'#1D9E75', fontWeight:'500' }}>{fakeViews[i]}</span>
                    <div style={{ flex:1, height:'4px', background:'#333331', borderRadius:'2px', maxWidth:'200px' }}>
                      <div style={{ width:`${100-i*9}%`, height:'4px', background:i<3?rankStyle[i].color:'#1D9E75', borderRadius:'2px' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ borderRadius:'10px', overflow:'hidden', background:'#1e1e1c', border:`1px solid ${i<3?rankStyle[i].color+'40':'#333331'}` }}>
                <div style={{ position:'relative', paddingBottom:'56.25%', height:0 }}>
                  <iframe src={`https://www.youtube.com/embed/${video.id}`} title={video.title} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }} allowFullScreen />
                </div>
                <div style={{ padding:'10px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:'500', color:'#f0efe9' }}>{video.title}</div>
                    <div style={{ fontSize:'11px', color:'#777672', marginTop:'2px' }}>YouTube · {d.name} travel</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel gear after video #1 */}
            {i === 0 && <MidTravelGear destination={d} position="early" />}

            {/* Travel gear after video #5 */}
            {i === 4 && <MidTravelGear destination={d} position="mid" />}
          </div>
        )) : (
          <div style={{ textAlign:'center', padding:'40px', color:'#777672' }}>
            <div style={{ fontSize:'48px', marginBottom:'12px' }}>{d.emoji}</div>
            <p>Videos coming soon for {d.name}!</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ margin:'0 24px 24px', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
        <div style={{ background:d.bg, border:'1px solid #333331', borderRadius:'12px', padding:'24px', textAlign:'center' }}>
          <div style={{ fontSize:'36px', marginBottom:'8px' }}>{d.emoji}</div>
          <h3 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', color:'#f0efe9', marginBottom:'6px' }}>Ready to visit {d.name}?</h3>
          <p style={{ fontSize:'13px', color:'#777672', marginBottom:'20px' }}>Book your hotels, tours and gear right now.</p>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href={d.bookingLink} target="_blank" rel="noopener noreferrer" style={{ background:'#003580', color:'#fff', padding:'10px 20px', borderRadius:'20px', fontSize:'13px', fontWeight:'500', textDecoration:'none' }}>🏨 Find hotels</a>
            <a href={d.tourLink} target="_blank" rel="noopener noreferrer" style={{ background:'#1D9E75', color:'#fff', padding:'10px 20px', borderRadius:'20px', fontSize:'13px', fontWeight:'500', textDecoration:'none' }}>🎟 Book tours</a>
            <a href={d.gearLink} target="_blank" rel="noopener noreferrer" style={{ background:'#232F3E', color:'#fff', padding:'10px 20px', borderRadius:'20px', fontSize:'13px', fontWeight:'500', textDecoration:'none' }}>🎒 Shop gear</a>
          </div>
        </div>
      </div>

      {/* Email capture */}
      <div style={{ margin:'0 24px 24px', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
        <div style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'14px', padding:'24px', textAlign:'center' }}>
          {emailDone ? (
            <>
              <div style={{ fontSize:'28px', marginBottom:'8px' }}>🎉</div>
              <div style={{ fontSize:'16px', fontWeight:'700', color:'#f0efe9' }}>You're in! Weekly travel guides incoming.</div>
            </>
          ) : (
            <>
              <div style={{ fontSize:'24px', marginBottom:'8px' }}>📬</div>
              <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'22px', letterSpacing:'1px', color:'#f0efe9', marginBottom:'6px' }}>Get the {d.name} packing guide — free</div>
              <div style={{ fontSize:'13px', color:'#777672', marginBottom:'16px' }}>Exactly what to pack for {d.name}. Join 2,847 subscribers.</div>
              <form onSubmit={handleEmail} style={{ display:'flex', gap:'8px', maxWidth:'380px', margin:'0 auto', flexWrap:'wrap', justifyContent:'center' }}>
                <input type="email" required value={emailVal} onChange={(e) => setEmailVal(e.target.value)} placeholder="your@email.com"
                  style={{ flex:1, minWidth:'200px', padding:'10px 16px', background:'#111110', border:'1px solid #333331', borderRadius:'99px', color:'#f0efe9', fontSize:'13px', fontFamily:'DM Sans, sans-serif', outline:'none' }} />
                <button type="submit" style={{ padding:'10px 20px', background:'#1D9E75', color:'#fff', border:'none', borderRadius:'99px', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                  Get free guide →
                </button>
              </form>
              <div style={{ fontSize:'10px', color:'#444441', marginTop:'8px' }}>No spam. Unsubscribe anytime.</div>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ padding:'0 24px 24px', maxWidth:'820px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', letterSpacing:'1px', color:'#f0efe9', marginBottom:'14px' }}>More {d.region} destinations</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:'8px' }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/destination/${r.slug}`} style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'10px', padding:'12px', textDecoration:'none', display:'block' }}>
                <div style={{ fontSize:'20px', marginBottom:'5px' }}>{r.emoji}</div>
                <div style={{ fontSize:'12px', fontWeight:'500', color:'#f0efe9', lineHeight:1.3 }}>{r.name}</div>
                <div style={{ fontSize:'11px', color:'#777672', marginTop:'2px' }}>{r.country}</div>
                <div style={{ fontSize:'10px', color:'#1D9E75', marginTop:'3px' }}>{r.views}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign:'center', padding:'16px 24px 32px' }}>
        <Link href="/travel" style={{ display:'inline-block', padding:'10px 24px', border:'1px solid #333331', borderRadius:'24px', color:'#777672', fontSize:'13px', textDecoration:'none' }}>← Back to all destinations</Link>
      </div>

      <footer style={{ borderTop:'1px solid #333331', padding:'24px', textAlign:'center' }}>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'22px', letterSpacing:'2px', color:'#D85A30', marginBottom:'6px' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize:'11px', color:'#777672' }}>100 destinations · most viewed travel videos worldwide</p>
      </footer>
    </div>
  );
}
