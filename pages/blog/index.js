import Head from 'next/head';
import Link from 'next/link';

const POSTS = [
  { slug:'most-viewed-fishing-video', title:'The story behind the most viewed fishing video of all time', date:'7 Apr 2026', excerpt:'One fishing video has been watched over 500 million times. Here\'s why the world couldn\'t stop watching.', emoji:'🎣', readTime:'4 min read' },
  { slug:'why-golf-dominates-youtube', title:'Why golf dominates YouTube more than any other sport', date:'6 Apr 2026', excerpt:'The numbers are staggering. The top 10 golf videos have a combined view count bigger than most countries\' populations.', emoji:'⛳', readTime:'5 min read' },
  { slug:'untranslatable-words', title:'30 untranslatable words that every traveller needs to know', date:'5 Apr 2026', excerpt:'Schadenfreude. Hygge. Saudade. Words that capture feelings English simply can\'t.', emoji:'🗣️', readTime:'6 min read' },
  { slug:'most-viewed-travel-destinations', title:'The most viewed travel destination on YouTube might surprise you', date:'4 Apr 2026', excerpt:'We ranked 100 travel destinations by total YouTube views. The results were not what we expected.', emoji:'🌍', readTime:'4 min read' },
  { slug:'beekeeping-youtube-phenomenon', title:'Why beekeeping became one of YouTube\'s most watched topics', date:'3 Apr 2026', excerpt:'Nobody expected beekeeping to go viral. Then one video changed everything.', emoji:'🐝', readTime:'3 min read' },
  { slug:'van-life-most-viewed', title:'The van life video that started a global movement', date:'2 Apr 2026', excerpt:'How a simple video of two people living in a van inspired thousands to quit their jobs.', emoji:'🚐', readTime:'5 min read' },
];

export default function Blog() {
  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Head>
        <title>Blog — RabbitHole</title>
        <meta name="description" content="Stories behind the world's most viewed YouTube videos." />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'8px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'12px' }}>
          <Link href="/play" style={{ fontSize:'13px', color:'#EF9F27', textDecoration:'none', padding:'6px 14px', border:'1px solid #EF9F27', borderRadius:'16px' }}>🎮 Play</Link>
          <Link href="/travel" style={{ fontSize:'13px', color:'#1D9E75', textDecoration:'none', padding:'6px 14px', border:'1px solid #1D9E75', borderRadius:'16px' }}>✈ Travel</Link>
        </div>
      </nav>
      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'48px 24px' }}>
        <div style={{ marginBottom:'40px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', letterSpacing:'3px', color:'#f0efe9' }}>✍️ THE BLOG</div>
          <div style={{ fontSize:'15px', color:'#777672', marginTop:'8px' }}>Stories behind the world's most viewed videos</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {POSTS.map((post) => (
            <Link key={post.slug} href={'/blog/' + post.slug} style={{ textDecoration:'none', display:'block', background:'#1a1a18', border:'1px solid #2a2a28', borderRadius:'14px', padding:'24px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'16px' }}>
                <div style={{ fontSize:'40px', flexShrink:0 }}>{post.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:'12px', marginBottom:'8px' }}>
                    <span style={{ fontSize:'11px', color:'#777672' }}>{post.date}</span>
                    <span style={{ fontSize:'11px', color:'#555' }}>·</span>
                    <span style={{ fontSize:'11px', color:'#777672' }}>{post.readTime}</span>
                  </div>
                  <div style={{ fontSize:'18px', fontWeight:'600', color:'#f0efe9', marginBottom:'8px', lineHeight:1.3 }}>{post.title}</div>
                  <div style={{ fontSize:'14px', color:'#777672', lineHeight:1.6 }}>{post.excerpt}</div>
                  <div style={{ fontSize:'13px', color:'#1D9E75', marginTop:'12px' }}>Read more →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer style={{ borderTop:'1px solid #333331', padding:'24px', textAlign:'center', marginTop:'40px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'22px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <p style={{ fontSize:'11px', color:'#777672', marginTop:'8px' }}>The world's most viewed videos · 100 topics · updated daily</p>
      </footer>
    </div>
  );
}
