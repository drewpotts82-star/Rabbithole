import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import topics from '../../data/topics';
import videoData from '../../data/videoData';

export async function getStaticPaths() {
  const paths = topics.map((t) => ({ params: { slug: t.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const topic = topics.find((t) => t.slug === params.slug);
  const related = topics.filter((t) => t.category === topic.category && t.slug !== topic.slug).slice(0, 6);
  const videos = videoData[params.slug] || [];
  return { props: { topic, related, videos } };
}

const tierColors = { gold: '#EF9F27', silver: '#B4B2A9', bronze: '#D85A30' };
const fakeViews = ['892M','741M','624M','580M','498M','441M','389M','312M','267M','198M'];
const fakeReacts = [247,189,156,134,98,87,72,61,43,29];
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

// ─── AFFILIATE PRODUCT DATA ───────────────────────────────────────────────────
// Replace YOUR_TAG with your Amazon Associates tag e.g. "rabbithole-21"
// Replace each /dp/XXXXXXXXXX with the real Amazon product ASIN
// To find an ASIN: search Amazon for the product, the ASIN is in the URL e.g. amazon.co.uk/dp/B08XYZ12AB

const TOPIC_PRODUCTS = {
  fishing: {
    inspiration: "Inspired by these fishing legends? Here's what you need to land your first big one:",
    products: [
      { name: 'Penn Battle IV Spinning Rod & Reel Combo', price: 'AUD $360', tag: 'Best seller', emoji: '🏆', link: 'https://amzn.to/4tEpl3V' },
      { name: 'Savage Gear Mixed Lure Kit — 35 Pieces', price: 'Shop now', tag: 'Top rated', emoji: '⭐', link: 'https://amzn.to/4vks1VT' },
      { name: 'Fishing Tackle Box & Storage', price: 'Shop now', tag: 'As seen in videos', emoji: '📦', link: 'https://amzn.to/48ygEQg' },
      { name: 'Beginner Fishing Rod Combo', price: 'Shop now', tag: 'Beginner pick', emoji: '🎯', link: 'https://amzn.to/4tzykTK' },
    ],
    blog: [
      { title: 'Best beginner fishing rods UK 2025', slug: 'best-beginner-fishing-rods-uk' },
      { title: 'Saltwater fishing gear for pier fishing', slug: 'saltwater-pier-fishing-gear' },
      { title: 'Top 10 fishing lures that actually work', slug: 'best-fishing-lures-uk' },
    ],
  },
  soccer: {
    inspiration: "Inspired? Get the gear to play like a pro — even in the back garden:",
    products: [
      { name: 'Nike Premier League Match Football', price: 'Shop now', tag: 'Official ball', emoji: '🏆', link: 'https://amzn.to/4cc3gT1' },
      { name: 'Adidas Football Boots', price: 'Shop now', tag: 'Classic choice', emoji: '⭐', link: 'https://amzn.to/4c1D0Mw' },
      { name: 'Football Rebounder Net', price: 'Shop now', tag: 'Practice at home', emoji: '🥅', link: 'https://amzn.to/48uVCSz' },
      { name: 'Football Training Cones Set', price: 'Shop now', tag: 'Train like a pro', emoji: '🎯', link: 'https://amzn.to/4cgHpKi' },
    ],
    blog: [
      { title: 'Best football boots for beginners UK 2025', slug: 'best-football-boots-beginners' },
      { title: 'How to set up a home football training area', slug: 'home-football-training-setup' },
      { title: 'Top football gear for kids and adults', slug: 'football-gear-uk' },
    ],
  },
  'gym-lifting': {
    inspiration: "Ready to start your own transformation? Here's what you actually need:",
    products: [
      { name: 'Adjustable Dumbbell Set', price: 'Shop now', tag: 'Home gym essential', emoji: '🏆', link: 'https://amzn.to/4mio9kf' },
      { name: 'Weightlifting Belt', price: 'Shop now', tag: 'As used by pros', emoji: '⭐', link: 'https://amzn.to/4viXFTz' },
      { name: 'Whey Protein Powder', price: 'Shop now', tag: 'Top rated protein', emoji: '💊', link: 'https://amzn.to/4tua2dQ' },
      { name: 'Lifting Straps & Gloves', price: 'Shop now', tag: 'Protect your hands', emoji: '🎯', link: 'https://amzn.to/4tG9Oka' },
    ],
    blog: [
      { title: 'Best home gym equipment UK under £200', slug: 'best-home-gym-equipment-uk' },
      { title: 'Beginner lifting gear — what you actually need', slug: 'beginner-gym-gear-guide' },
      { title: 'Best protein supplements ranked 2025', slug: 'best-protein-supplements-uk' },
    ],
  },
  'music-videos': {
    inspiration: "Love music this much? Here's how to start making your own:",
    products: [
      { name: 'Studio Headphones', price: 'Shop now', tag: 'Industry standard', emoji: '🏆', link: 'https://amzn.to/3OtA0iM' },
      { name: 'USB Audio Interface', price: 'Shop now', tag: 'Best starter kit', emoji: '⭐', link: 'https://amzn.to/41U0LzV' },
      { name: 'Bluetooth Speaker', price: 'Shop now', tag: 'Take music anywhere', emoji: '📻', link: 'https://amzn.to/4t5zPcA' },
      { name: 'Recording Microphone', price: 'Shop now', tag: 'Start recording', emoji: '🎙️', link: 'https://amzn.to/4ectdo1' },
    ],
    blog: [
      { title: 'Best headphones for music lovers UK 2025', slug: 'best-music-headphones-uk' },
      { title: 'How to start home recording on a budget', slug: 'home-recording-beginners-guide' },
      { title: 'Best Bluetooth speakers under £100', slug: 'best-bluetooth-speakers-uk' },
    ],
  },
  'perfume-reviews': {
    inspiration: "Discovered your next signature scent? Shop the most talked-about fragrances:",
    products: [
      { name: 'Dior Sauvage Perfume', price: 'Shop now', tag: 'Most viewed fragrance', emoji: '🏆', link: 'https://amzn.to/4miQG9f' },
      { name: 'Perfume Discovery Sampler Set', price: 'Shop now', tag: 'Try before you commit', emoji: '⭐', link: 'https://amzn.to/4mfMqHr' },
      { name: 'Versace Perfume Women', price: 'Shop now', tag: "Top rated women's", emoji: '🌸', link: 'https://amzn.to/3Q9CeUY' },
      { name: 'Fragrance Atomiser Travel Spray', price: 'Shop now', tag: 'Travel essential', emoji: '✈️', link: 'https://amzn.to/4dHt8Zz' },
    ],
    blog: [
      { title: "Best men's fragrances UK 2025 — ranked", slug: 'best-mens-fragrances-uk' },
      { title: "Best women's perfumes under £60 UK", slug: 'best-womens-perfumes-uk' },
      { title: 'Fragrance discovery sets — worth it?', slug: 'perfume-discovery-sets-review' },
    ],
  },
  motorcycles: {
    inspiration: "Ready to ride? Start with the right gear — safety first, style second:",
    products: [
      { name: 'Motorcycle Helmet', price: 'Shop now', tag: "Editor's choice", emoji: '🏆', link: 'https://amzn.to/4ttbHR0' },
      { name: 'Motorcycle Chain Lock', price: 'Shop now', tag: 'Essential security', emoji: '⭐', link: 'https://amzn.to/4cCEdJh' },
      { name: 'Motorcycle Riding Gloves', price: 'Shop now', tag: 'Top rated gloves', emoji: '🧤', link: 'https://amzn.to/4t36XBR' },
      { name: 'Motorcycle Maintenance Manual', price: 'Shop now', tag: 'Know your bike', emoji: '📖', link: 'https://amzn.to/4tzSRYk' },
    ],
    blog: [
      { title: 'Best motorcycle helmets UK 2025 — safety rated', slug: 'best-motorcycle-helmets-uk' },
      { title: 'Essential motorcycle gear for beginners', slug: 'beginner-motorcycle-gear-uk' },
      { title: 'Best motorcycle accessories under £50', slug: 'motorcycle-accessories-uk' },
    ],
  },
};

// ─── FIX 3: INSPIRATION CTA ───────────────────────────────────────────────────
function InspirationCTA({ topic }) {
  const data = TOPIC_PRODUCTS[topic.slug];
  if (!data) return null;
  return (
    <div style={{ margin:'0 24px 0', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap', padding:'16px 20px', background:'rgba(255,107,53,0.07)', border:'1px solid rgba(255,107,53,0.22)', borderRadius:'12px', marginBottom:'0' }}>
        <div>
          <div style={{ fontSize:'14px', fontWeight:'500', color:'#f0efe9', marginBottom:'3px' }}>{data.inspiration}</div>
          <div style={{ fontSize:'12px', color:'#777672' }}>Hand-picked gear used by the creators in these videos</div>
        </div>
        <a href={`#shop-${topic.slug}`} onClick={(e) => { e.preventDefault(); document.getElementById(`shop-${topic.slug}`)?.scrollIntoView({ behavior:'smooth' }); }} style={{ flexShrink:0, padding:'9px 18px', background:'#D85A30', color:'#fff', borderRadius:'99px', textDecoration:'none', fontSize:'13px', fontWeight:'500', whiteSpace:'nowrap' }}>
          Shop the gear ↓
        </a>
      </div>
    </div>
  );
}

// ─── FIX 1 + 2: PRODUCT CARDS ─────────────────────────────────────────────────
function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={product.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display:'flex', flexDirection:'column', background:hovered?'#252523':'#1a1a18', border:`1px solid ${hovered?'rgba(255,255,255,0.18)':'#333331'}`, borderRadius:'12px', padding:'14px', textDecoration:'none', transition:'all 0.2s ease', transform:hovered?'translateY(-2px)':'none', cursor:'pointer' }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
        <span style={{ fontSize:'20px' }}>{product.emoji}</span>
        <span style={{ fontSize:'9px', fontWeight:'700', padding:'3px 8px', borderRadius:'99px', background:'rgba(245,197,24,0.12)', color:'#f5c518', textTransform:'uppercase', letterSpacing:'0.04em' }}>{product.tag}</span>
      </div>
      <p style={{ margin:'0 0 10px', fontSize:'12px', fontWeight:'500', color:'#f0efe9', lineHeight:1.4, flex:1 }}>{product.name}</p>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:'16px', fontWeight:'700', color:'#1D9E75' }}>{product.price}</span>
        <span style={{ fontSize:'10px', fontWeight:'700', padding:'5px 12px', borderRadius:'99px', background:'#D85A30', color:'#fff' }}>View on Amazon →</span>
      </div>
    </a>
  );
}

// FIX 2: Mid-list placement (compact, 2 products)
function MidListProducts({ topic, position }) {
  const data = TOPIC_PRODUCTS[topic.slug];
  const headline = position === 'early' ? `⚡ Gear the #1 ${topic.name} creator actually uses` : `🛒 Halfway through — ready to try it yourself?`;
  if (data) {
    const products = position === 'early' ? data.products.slice(0, 2) : data.products.slice(2, 4);
    return (
      <div style={{ margin:'4px 0 20px', padding:'14px', background:'#1e1e1c', borderRadius:'12px', border:'1px solid #333331' }}>
        <div style={{ fontSize:'12px', fontWeight:'600', color:'#f0efe9', marginBottom:'10px' }}>{headline}</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {products.map((p) => <ProductCard key={p.link || p.asin} product={p} />)}
        </div>
      </div>
    );
  }
  if (position !== 'early') return null;
  return (
    <div style={{ margin:'4px 0 20px', padding:'14px', background:'#1e1e1c', borderRadius:'12px', border:'1px solid #333331' }}>
      <div style={{ fontSize:'12px', fontWeight:'600', color:'#f0efe9', marginBottom:'8px' }}>{headline}</div>
      <p style={{ fontSize:'12px', color:'#777672', margin:'0 0 12px' }}>Shop {topic.affText} — as used by the world\'s most viewed {topic.name} creators.</p>
      <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', background:'#D85A30', color:'#fff', padding:'10px 20px', borderRadius:'99px', fontSize:'13px', fontWeight:'600', textDecoration:'none' }}>
        Shop {topic.name} gear on Amazon →
      </a>
    </div>
  );
}

// FIX 1: Full product cards section
function FullProductCards({ topic }) {
  const data = TOPIC_PRODUCTS[topic.slug];
  return (
    <div id={`shop-${topic.slug}`} style={{ margin:'0 24px 24px', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
      <div style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'14px', padding:'20px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
          <span style={{ fontSize:'22px' }}>{topic.emoji}</span>
          <div>
            <div style={{ fontSize:'12px', color:'#777672', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:'600' }}>Shop gear from these videos</div>
            <div style={{ fontSize:'11px', color:'#444441' }}>{topic.name} gear — hand picked for beginners & enthusiasts</div>
          </div>
        </div>
        {data ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'10px' }}>
            {data.products.map((p) => <ProductCard key={p.link || p.asin} product={p} />)}
          </div>
        ) : (
          <div>
            <p style={{ fontSize:'13px', color:'#777672', margin:'0 0 14px', lineHeight:1.5 }}>
              Shop {topic.affText} — the exact gear used by the world\'s most viewed {topic.name} creators.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'14px' }}>
              <a href={topic.affLink} target="_blank" rel="noopener noreferrer" style={{ display:'flex', flexDirection:'column', background:'#111110', border:'1px solid #333331', borderRadius:'12px', padding:'14px', textDecoration:'none' }}>
                <span style={{ fontSize:'11px', color:'#777672', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Best sellers</span>
                <span style={{ fontSize:'13px', color:'#f0efe9', fontWeight:'500', marginBottom:'10px' }}>{topic.affText}</span>
                <span style={{ fontSize:'11px', fontWeight:'700', padding:'6px 14px', borderRadius:'99px', background:'#D85A30', color:'#fff', textAlign:'center', marginTop:'auto' }}>Shop on Amazon →</span>
              </a>
              <a href={topic.affLink + '+beginner'} target="_blank" rel="noopener noreferrer" style={{ display:'flex', flexDirection:'column', background:'#111110', border:'1px solid #333331', borderRadius:'12px', padding:'14px', textDecoration:'none' }}>
                <span style={{ fontSize:'11px', color:'#777672', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Beginner picks</span>
                <span style={{ fontSize:'13px', color:'#f0efe9', fontWeight:'500', marginBottom:'10px' }}>Starter {topic.name} gear</span>
                <span style={{ fontSize:'11px', fontWeight:'700', padding:'6px 14px', borderRadius:'99px', background:'#1D9E75', color:'#fff', textAlign:'center', marginTop:'auto' }}>Shop on Amazon →</span>
              </a>
            </div>
          </div>
        )}
        <p style={{ margin:'12px 0 0', fontSize:'10px', color:'#444441', textAlign:'center' }}>
          As an Amazon Associate we earn from qualifying purchases — at no extra cost to you.
        </p>
      </div>
    </div>
  );
}

// ─── FIX 6: BUYER BLOG LINKS ──────────────────────────────────────────────────
function BuyerBlogLinks({ topic }) {
  const data = TOPIC_PRODUCTS[topic.slug];
  if (!data) return null;
  return (
    <div style={{ margin:'0 24px 24px', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
      <div style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'12px', padding:'16px 20px' }}>
        <div style={{ fontSize:'11px', color:'#777672', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:'600', marginBottom:'10px' }}>📖 From the RabbitHole Blog</div>
        {data.blog.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 12px', background:'#111110', border:'1px solid #333331', borderRadius:'8px', marginBottom:'6px', textDecoration:'none', color:'#f0efe9', fontSize:'13px', transition:'border-color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor='#333331'}
          >
            <span>{post.title}</span>
            <span style={{ color:'#D85A30' }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── FIX 5: EMAIL CAPTURE ─────────────────────────────────────────────────────
function EmailCapture({ topic }) {
  const [emailVal, setEmailVal] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVal) return;
    try {
      // Reuses your existing /api/subscribe endpoint!
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal, topic: topic.slug }),
      });
    } catch(e) {}
    setDone(true);
  };

  return (
    <div style={{ margin:'0 24px 32px', maxWidth:'772px', marginLeft:'auto', marginRight:'auto' }}>
      <div style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'14px', padding:'24px', textAlign:'center' }}>
        {done ? (
          <>
            <div style={{ fontSize:'28px', marginBottom:'8px' }}>🎉</div>
            <div style={{ fontSize:'16px', fontWeight:'700', color:'#f0efe9', marginBottom:'4px' }}>You're in!</div>
            <div style={{ fontSize:'13px', color:'#777672' }}>We'll send you the new top 10 every week. Check your inbox!</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:'24px', marginBottom:'8px' }}>📬</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'1px', color:'#f0efe9', marginBottom:'6px' }}>New top 10 every week — free</div>
            <div style={{ fontSize:'13px', color:'#777672', marginBottom:'16px' }}>
              Get the most viewed {topic.name} videos delivered to your inbox. Join 2,847 subscribers.
            </div>
            <form onSubmit={handleSubmit} style={{ display:'flex', gap:'8px', maxWidth:'380px', margin:'0 auto', flexWrap:'wrap', justifyContent:'center' }}>
              <input
                type="email"
                required
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                placeholder="your@email.com"
                style={{ flex:1, minWidth:'200px', padding:'10px 16px', background:'#111110', border:'1px solid #333331', borderRadius:'99px', color:'#f0efe9', fontSize:'13px', fontFamily:'DM Sans, sans-serif', outline:'none' }}
              />
              <button type="submit" style={{ padding:'10px 20px', background:'#1D9E75', color:'#fff', border:'none', borderRadius:'99px', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                Subscribe free →
              </button>
            </form>
            <div style={{ fontSize:'10px', color:'#444441', marginTop:'8px' }}>No spam. Unsubscribe anytime.</div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── LAZY VIDEO (unchanged) ───────────────────────────────────────────────────
function LazyVideo({ id, title }) {
  const [playing, setPlaying] = React.useState(false);
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
    <div onClick={() => setPlaying(true)} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', cursor:'pointer', background:'#000' }}>
      <img
        src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
        alt={title}
        style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }}
      />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'64px', height:'64px', background:'rgba(255,0,0,0.9)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:0, height:0, borderTop:'12px solid transparent', borderBottom:'12px solid transparent', borderLeft:'20px solid white', marginLeft:'4px' }} />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TopicPage({ topic, related, videos }) {
  const [fired, setFired] = useState({});
  const [saved, setSaved] = useState({});
  const [showSaveBanner, setShowSaveBanner] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [toast, setToast] = useState('');

  const toggleFire = (i) => setFired(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleSave = (i) => {
    setSaved(prev => {
      const next = { ...prev, [i]: !prev[i] };
      setShowSaveBanner(Object.values(next).some(Boolean));
      return next;
    });
  };
  const copyLink = () => {
    navigator.clipboard.writeText(`https://www.rabbitholevideo.com/topic/${topic.slug}`).then(() => {
      setToast('Link copied!');
      setTimeout(() => setToast(''), 2000);
    });
  };
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.rabbitholevideo.com/topic/${topic.slug}`, '_blank');
  };
  const saveEmail = async () => {
    if (email) {
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, topic: topic.slug }),
        });
        setEmailSaved(true);
        setToast("You're in! We'll notify you when rankings change.");
        setTimeout(() => setToast(''), 3000);
      } catch(e) {
        setToast('Something went wrong. Please try again.');
        setTimeout(() => setToast(''), 3000);
      }
    }
  };

  return (
    <div style={{ background: '#111110', minHeight: '100vh', color: '#f0efe9', fontFamily: 'DM Sans, sans-serif' }}>
      <Head>
        <title>{`Most Viewed ${topic.name} Videos Of All Time — RabbitHole`}</title>
        <meta name="description" content={`The top 10 most viewed ${topic.name} videos on YouTube of all time, ranked by total worldwide views.`} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          .video-thumb { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .video-thumb:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
          .video-card:hover .rank-num { color: #1D9E75 !important; }
        `}</style>
      </Head>

      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>
          RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span>
        </Link>
        <Link href="/" style={{ fontSize:'13px', color:'#777672', textDecoration:'none' }}>← All 100 topics</Link>
      </nav>

      {/* HERO */}
      <div style={{ display:'flex', alignItems:'center', gap:'20px', padding:'32px 24px', background:topic.bg, borderBottom:'1px solid #333331' }}>
        <div style={{ fontSize:'64px' }}>{topic.emoji}</div>
        <div>
          <div style={{ fontSize:'11px', color:'#777672', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'4px' }}>🌍 Most viewed worldwide</div>
          <h1 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'44px', letterSpacing:'2px', color:'#f0efe9', lineHeight:1 }}>
            Top 10 {topic.name} Videos<br />Of All Time
          </h1>
          <div style={{ fontSize:'20px', fontWeight:'500', color:'#1D9E75', marginTop:'8px' }}>{topic.views} combined views</div>
        </div>
      </div>

      {/* QUICK TOPIC LINKS */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap', padding:'12px 24px', borderBottom:'1px solid #222220' }}>
        <span style={{ fontSize:'12px', color:'#777672' }}>Not into {topic.name}? Try:</span>
        {topics.filter(t => t.slug !== topic.slug).sort(() => 0.5 - Math.random()).slice(0, 4).map(t => (
          <Link key={t.slug} href={'/topic/' + t.slug} style={{ fontSize:'12px', color:'#1D9E75', textDecoration:'none', padding:'4px 10px', border:'1px solid #1D9E75', borderRadius:'12px' }}>
            {t.emoji} {t.name}
          </Link>
        ))}
        <Link href={'/'} style={{ fontSize:'12px', color:'#D85A30', textDecoration:'none', padding:'4px 10px', border:'1px solid #D85A30', borderRadius:'12px' }}>
          🎲 Surprise me
        </Link>
      </div>

      {/* SHARE BAR */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'10px' }}>
        <div>
          <div style={{ fontSize:'13px', fontWeight:'500', color:'#f0efe9' }}>Share the {topic.name} top 10</div>
          <div style={{ fontSize:'11px', color:'#777672' }}>Let your friends guess the rankings</div>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button onClick={shareToFacebook} style={{ background:'#1877F2', color:'#fff', border:'none', padding:'7px 14px', borderRadius:'16px', fontSize:'12px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            Share on Facebook
          </button>
          <button onClick={copyLink} style={{ background:'transparent', color:'#1D9E75', border:'1px solid #1D9E75', padding:'7px 14px', borderRadius:'16px', fontSize:'12px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            Copy link
          </button>
        </div>
      </div>

      {toast && <div style={{ textAlign:'center', padding:'8px', background:'#1D9E75', fontSize:'13px', color:'#fff' }}>{toast}</div>}

      {/* ── FIX 3: INSPIRATION CTA — sits above the video list ── */}
      <div style={{ padding:'16px 0 0' }}>
        <InspirationCTA topic={topic} />
      </div>

      {/* VIDEO LIST */}
      <div style={{ padding:'24px', maxWidth:'820px', margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', letterSpacing:'1px', color:'#777672', marginBottom:'20px' }}>
          Top 10 most viewed {topic.name} videos — worldwide rankings
        </h2>

        {videos.length > 0 ? videos.slice(0,10).map((video, i) => (
          <div key={i}>
            <div style={{ marginBottom:'20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:rankStyle[i].size, color:rankStyle[i].color, background:rankStyle[i].bg, minWidth:'64px', textAlign:'center', padding:'4px 8px', borderRadius:'6px', lineHeight:1 }}>
                  #{i+1}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:i<3?'15px':'13px', fontWeight:'500', color:'#f0efe9', marginBottom:'4px' }}>{video.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'13px', color:'#1D9E75', fontWeight:'500' }}>{fakeViews[i]} views</span>
                    <div style={{ flex:1, height:'4px', background:'#333331', borderRadius:'2px', maxWidth:'200px' }}>
                      <div style={{ width:`${100-i*9}%`, height:'4px', background:i<3?rankStyle[i].color:'#1D9E75', borderRadius:'2px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderRadius:'10px', overflow:'hidden', background:'#1e1e1c', border:`1px solid ${i<3?rankStyle[i].color+'40':'#333331'}` }}>
                <div style={{ position:'relative', paddingBottom:'56.25%', height:0 }}>
                  <LazyVideo id={video.id} title={video.title} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', borderTop:'1px solid #333331', background:'#161614' }}>
                  <button onClick={() => toggleFire(i)} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 12px', borderRadius:'20px', border:`1px solid ${fired[i]?'#EF9F27':'#333331'}`, background:fired[i]?'rgba(239,159,39,0.15)':'transparent', color:fired[i]?'#EF9F27':'#777672', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                    <span style={{ fontSize:'14px' }}>🔥</span><span>{fired[i]?'Lit':'Fire'}</span>
                  </button>
                  <button onClick={() => { toggleSave(i); setShowSaveBanner(true); }} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 12px', borderRadius:'20px', border:`1px solid ${saved[i]?'#1D9E75':'#333331'}`, background:saved[i]?'rgba(29,158,117,0.15)':'transparent', color:saved[i]?'#1D9E75':'#777672', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                    <span style={{ fontSize:'14px' }}>{saved[i]?'✓':'+'}</span><span>{saved[i]?'Following':'Follow'}</span>
                  </button>
                  <span style={{ marginLeft:'auto', fontSize:'11px', color:'#444441' }}>{(fakeReacts[i]+(fired[i]?1:0)).toLocaleString()} reactions</span>
                </div>
              </div>
            </div>

            {/* ── FIX 2: PRODUCT CARDS after video #1 ── */}
            {i === 0 && <MidListProducts topic={topic} position="early" />}

            {/* ── FIX 2: PRODUCT CARDS after video #5 ── */}
            {i === 4 && <MidListProducts topic={topic} position="mid" />}

          </div>
        )) : <p style={{ color:'#777672' }}>Videos coming soon!</p>}

        {/* Sticky email banner (existing) */}
        {showSaveBanner && !emailSaved && (
          <div style={{ position:'fixed', bottom:'0', left:'0', right:'0', background:'#0a2218', borderTop:'1px solid #1D9E75', padding:'16px 24px', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', flexWrap:'wrap' }}>
            <div style={{ fontSize:'14px', fontWeight:'500', color:'#f0efe9', whiteSpace:'nowrap' }}>🔖 Get weekly ranking updates</div>
            <div style={{ display:'flex', gap:'8px', flex:1, maxWidth:'400px' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex:1, background:'#111110', border:'1px solid #333331', borderRadius:'8px', padding:'8px 12px', color:'#f0efe9', fontSize:'13px', fontFamily:'DM Sans, sans-serif', outline:'none' }} />
              <button onClick={saveEmail} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 16px', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap' }}>Notify me →</button>
            </div>
          </div>
        )}
      </div>

      {/* ── FIX 1: FULL PRODUCT CARDS at bottom ── */}
      <FullProductCards topic={topic} />

      {/* ── FIX 6: BUYER BLOG LINKS ── */}
      <BuyerBlogLinks topic={topic} />

      {/* RELATED TOPICS */}
      {related.length > 0 && (
        <div style={{ padding:'0 24px 24px', maxWidth:'820px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', letterSpacing:'1px', color:'#f0efe9', marginBottom:'14px' }}>More {topic.category} rabbit holes</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:'8px' }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/topic/${r.slug}`} style={{ background:'#1e1e1c', border:'1px solid #333331', borderRadius:'10px', padding:'12px', textDecoration:'none', display:'block' }}>
                <div style={{ fontSize:'20px', marginBottom:'5px' }}>{r.emoji}</div>
                <div style={{ fontSize:'12px', fontWeight:'500', color:'#f0efe9', lineHeight:1.3 }}>{r.name}</div>
                <div style={{ fontSize:'10px', color:'#1D9E75', marginTop:'3px' }}>{r.views} views</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign:'center', padding:'16px 24px 32px' }}>
        <Link href="/" style={{ display:'inline-block', padding:'10px 24px', border:'1px solid #333331', borderRadius:'24px', color:'#777672', fontSize:'13px', textDecoration:'none' }}>← Back to all 100 topics</Link>
      </div>

      {/* YOU MIGHT ALSO LIKE */}
      <div style={{ padding:'0 24px 40px', maxWidth:'820px', margin:'0 auto' }}>
        <div style={{ fontSize:'13px', letterSpacing:'0.1em', color:'#777672', textTransform:'uppercase', marginBottom:'16px' }}>🐇 You might also like</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'12px' }}>
          {topics.filter(t => t.slug !== topic.slug).sort(() => 0.5 - Math.random()).slice(0, 6).map(t => (
            <Link key={t.slug} href={'/topic/' + t.slug} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'10px', textDecoration:'none', color:'#f0efe9' }}>
              <span style={{ fontSize:'20px' }}>{t.emoji}</span>
              <span style={{ fontSize:'13px', fontWeight:'500' }}>{t.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FIX 5: EMAIL CAPTURE ── */}
      <EmailCapture topic={topic} />

      <footer style={{ borderTop:'1px solid #333331', padding:'24px', textAlign:'center' }}>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'22px', letterSpacing:'2px', color:'#D85A30', marginBottom:'6px' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></div>
        <p style={{ fontSize:'11px', color:'#777672' }}>The world's most viewed videos · 100 topics · updated weekly</p>
      </footer>
    </div>
  );
}
