import Head from 'next/head';
import Link from 'next/link';

export default function Play() {
  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Head><title>Play — RabbitHole Games</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
      </nav>
      <div style={{ maxWidth:'560px', margin:'0 auto', padding:'48px 24px', textAlign:'center' }}>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', letterSpacing:'3px', color:'#EF9F27', marginBottom:'8px' }}>🎮 PLAY</div>
        <div style={{ fontSize:'14px', color:'#777672', marginBottom:'40px' }}>Test your YouTube knowledge</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <Link href="/game" style={{ background:'#1a1a18', border:'1px solid #1D9E75', borderRadius:'16px', padding:'28px 24px', textDecoration:'none', color:'#f0efe9', textAlign:'left', display:'block' }}>
            <div style={{ fontSize:'32px', marginBottom:'8px' }}>⚔️</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px', color:'#1D9E75' }}>WHICH HAS MORE VIEWS?</div>
            <div style={{ fontSize:'13px', color:'#777672', marginTop:'4px' }}>Pick which topic has more combined YouTube views — 42 rounds, global leaderboard</div>
            <div style={{ marginTop:'16px', display:'inline-block', background:'#1D9E75', color:'#fff', borderRadius:'20px', padding:'8px 20px', fontSize:'13px', fontWeight:'500' }}>Play now →</div>
          </Link>
          <Link href="/guess" style={{ background:'#1a1a18', border:'1px solid #EF9F27', borderRadius:'16px', padding:'28px 24px', textDecoration:'none', color:'#f0efe9', textAlign:'left', display:'block' }}>
            <div style={{ fontSize:'32px', marginBottom:'8px' }}>🎯</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px', color:'#EF9F27' }}>GUESS THE VIEWS</div>
            <div style={{ fontSize:'13px', color:'#777672', marginTop:'4px' }}>Slide to guess how many views each topic has — 10 rounds, max 30 points</div>
            <div style={{ marginTop:'16px', display:'inline-block', background:'#EF9F27', color:'#111110', borderRadius:'20px', padding:'8px 20px', fontSize:'13px', fontWeight:'600' }}>Play now →</div>
          </Link>
        </div>
        <Link href="/higher-or-lower" style={{ background:'#1a1a18', border:'1px solid #D85A30', borderRadius:'16px', padding:'28px 24px', textDecoration:'none', color:'#f0efe9', textAlign:'left', display:'block' }}>
            <div style={{ fontSize:'32px', marginBottom:'8px' }}>🔥</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px', color:'#D85A30' }}>HIGHER OR LOWER</div>
            <div style={{ fontSize:'13px', color:'#777672', marginTop:'4px' }}>Does the next topic have more or fewer views? Build your streak — one wrong answer and it's over!</div>
            <div style={{ marginTop:'16px', display:'inline-block', background:'#D85A30', color:'#fff', borderRadius:'20px', padding:'8px 20px', fontSize:'13px', fontWeight:'500' }}>Play now →</div>
          </Link>
          <Link href="/" style={{ display:'block', marginTop:'24px', fontSize:'13px', color:'#555', textDecoration:'none', textAlign:'center' }}>← Back to topics</Link>
      </div>
    </div>
  );
}
