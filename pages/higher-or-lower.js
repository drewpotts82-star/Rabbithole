import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import topics from '../data/topics';

function formatViews(v) {
  const n = parseFloat(v);
  if (v.includes('B')) return n * 1000000000;
  if (v.includes('M')) return n * 1000000;
  return n;
}

function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const canvas = document.getElementById('hol-confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 8 + 4,
      color: ['#EF9F27','#1D9E75','#D85A30','#f0efe9'][Math.floor(Math.random()*4)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 10 - 5,
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
        ctx.restore();
        p.y += p.speed;
        p.angle += p.spin;
        if (p.y > canvas.height) p.y = -10;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(() => cancelAnimationFrame(frame), 2500);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, [active]);
  if (!active) return null;
  return <canvas id="hol-confetti" style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:999 }} />;
}



function ShareModal({ score, total, gameName, gameUrl, onClose }) {
  const [copied, setCopied] = React.useState(false);
  const text = encodeURIComponent('I scored ' + score + '/' + total + ' on RabbitHole\'s ' + gameName + '! Can you beat me?');
  const url = encodeURIComponent('https://rabbitholevideo.com/' + gameUrl);
  const fullText = encodeURIComponent('I scored ' + score + '/' + total + ' on RabbitHole\'s ' + gameName + '! Can you beat me? https://rabbitholevideo.com/' + gameUrl);

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }} onClick={onClose}>
      <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'20px', padding:'28px', maxWidth:'360px', width:'100%' }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:'center', marginBottom:'20px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#EF9F27' }}>SHARE YOUR SCORE</div>
          <div style={{ fontSize:'32px', fontWeight:'700', color:'#1D9E75', margin:'8px 0' }}>{score}/{total}</div>
          <div style={{ fontSize:'13px', color:'#777672' }}>{gameName}</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'16px' }}>
          <a href={'https://www.facebook.com/sharer/sharer.php?u=' + url + '&quote=' + text} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'12px', background:'#1877F2', color:'#fff', borderRadius:'12px', padding:'13px 18px', textDecoration:'none', fontSize:'14px', fontWeight:'500' }}>
            <span style={{ fontSize:'20px' }}>📘</span> Share on Facebook
          </a>
          <a href={'https://wa.me/?text=' + fullText} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'12px', background:'#25D366', color:'#fff', borderRadius:'12px', padding:'13px 18px', textDecoration:'none', fontSize:'14px', fontWeight:'500' }}>
            <span style={{ fontSize:'20px' }}>💬</span> Share on WhatsApp
          </a>
          <a href={'https://twitter.com/intent/tweet?text=' + fullText} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'12px', background:'#000', color:'#fff', borderRadius:'12px', padding:'13px 18px', textDecoration:'none', fontSize:'14px', fontWeight:'500' }}>
            <span style={{ fontSize:'20px' }}>🐦</span> Share on Twitter/X
          </a>
          <button onClick={() => { navigator.clipboard.writeText('https://rabbitholevideo.com/' + gameUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            style={{ display:'flex', alignItems:'center', gap:'12px', background: copied ? '#1D9E75' : '#333331', color:'#f0efe9', border:'none', borderRadius:'12px', padding:'13px 18px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif', width:'100%' }}>
            <span style={{ fontSize:'20px' }}>{copied ? '✓' : '🔗'}</span>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <button onClick={onClose} style={{ width:'100%', background:'transparent', color:'#777672', border:'1px solid #333331', borderRadius:'12px', padding:'11px', fontSize:'13px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function HigherOrLower() {
  const [shuffled, setShuffled] = useState([]);
  const [current, setCurrent] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    setShuffled([...topics].sort(() => 0.5 - Math.random()));
    fetch('/api/leaderboard?game=hol')
      .then(r => r.json())
      .then(d => { if (d.leaderboard) setLeaderboard(d.leaderboard); })
      .catch(() => {});
  }, []);

  if (!shuffled.length || current >= shuffled.length) return null;

  const prev = shuffled[current - 1];
  const next = shuffled[current];
  const prevViews = formatViews(prev.views);
  const nextViews = formatViews(next.views);

  const handleGuess = (guess) => {
    if (revealed) return;
    const isCorrect = guess === 'higher' ? nextViews >= prevViews : nextViews <= prevViews;
    setRevealed(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100);
    } else {
      setTimeout(() => setGameOver(true), 1800);
    }
  };

  const handleNext = () => {
    setRevealed(false);
    setCorrect(null);
    setCurrent(c => c + 1);
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    try {
      await fetch('/api/leaderboard?game=hol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName.trim(), score: streak, total: streak })
      });
      const r = await fetch('/api/leaderboard?game=hol');
      const d = await r.json();
      if (d.leaderboard) setLeaderboard(d.leaderboard);
    } catch(e) {}
    setSubmitted(true);
  };

  const shareScore = () => {
    const text = `I got a streak of ${bestStreak} on RabbitHole's Higher or Lower game! 🐇 Can you beat me? rabbitholevideo.com/higher-or-lower`;
    if (navigator.share) navigator.share({ title: 'RabbitHole', text });
    else { navigator.clipboard.writeText(text); alert('Copied! Share with friends 🐇'); }
  };

  const quickShare = () => {
    const text = `I'm playing Higher or Lower on RabbitHole 🐇 Can you beat my streak? rabbitholevideo.com/higher-or-lower`;
    if (navigator.share) navigator.share({ title: 'RabbitHole', text });
    else { navigator.clipboard.writeText('rabbitholevideo.com/higher-or-lower'); alert('Link copied! 🐇'); }
  };

  if (gameOver) {
    return (
      <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center' }}>
        <Confetti active={true} />
        <Head><title>Higher or Lower — RabbitHole</title></Head>
        <div style={{ fontSize:'64px' }}>💥</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', color:'#D85A30', letterSpacing:'2px', marginTop:'8px' }}>GAME OVER!</div>
        <div style={{ fontSize:'18px', margin:'12px 0', color:'#777672' }}>You got knocked out by</div>
        <div style={{ fontSize:'32px', margin:'4px 0' }}>{next.emoji} {next.name}</div>
        <div style={{ fontSize:'14px', color:'#777672', marginBottom:'24px' }}>({next.views} combined views)</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'36px', color:'#EF9F27', letterSpacing:'2px', marginBottom:'4px' }}>
          STREAK: {bestStreak} 🔥
        </div>

        {!submitted ? (
          <div style={{ margin:'20px 0', width:'100%', maxWidth:'300px' }}>
            <div style={{ fontSize:'13px', color:'#777672', marginBottom:'8px' }}>Enter your name for the leaderboard:</div>
            <input
              type="text"
              placeholder="Your name..."
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitScore()}
              style={{ width:'100%', background:'#1a1a18', border:'1px solid #333331', borderRadius:'10px', padding:'10px 14px', color:'#f0efe9', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box' }}
            />
            <button onClick={submitScore} style={{ marginTop:'8px', width:'100%', background:'#EF9F27', color:'#111110', border:'none', borderRadius:'20px', padding:'11px', fontSize:'14px', fontWeight:'600', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Submit to Leaderboard 🏆
            </button>
          </div>
        ) : (
          <div style={{ color:'#1D9E75', margin:'12px 0', fontSize:'14px' }}>✓ Score submitted!</div>
        )}

        {leaderboard.length > 0 && (
          <div style={{ width:'100%', maxWidth:'320px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', padding:'16px', margin:'12px 0', textAlign:'left' }}>
            <div style={{ fontSize:'13px', fontWeight:'600', color:'#EF9F27', marginBottom:'10px', textAlign:'center' }}>🏆 TOP STREAKS</div>
            {leaderboard.slice(0,10).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i < 9 ? '1px solid #222' : 'none', fontSize:'13px' }}>
                <span style={{ color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#777672' }}>#{i+1} {e.name}</span>
                <span style={{ color:'#1D9E75', fontWeight:'600' }}>🔥 {e.score}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginTop:'16px' }}>
          <button onClick={() => setShowShare(true)} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Share My Score</button>
          <button onClick={() => window.location.reload()} style={{ background:'transparent', color:'#f0efe9', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>🔄 Play Again</button>
          <Link href="/play" style={{ background:'transparent', color:'#EF9F27', border:'1px solid #EF9F27', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', textDecoration:'none' }}>🎮 All Games</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Confetti active={confetti} />
      <Head>
        <title>Higher or Lower — RabbitHole</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'8px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'12px', alignItems:'center', fontSize:'13px' }}>
          <span style={{ color:'#EF9F27', fontWeight:'600' }}>🔥 Streak: {streak}</span>
          <span style={{ color:'#777672' }}>Best: {bestStreak}</span>
          <button onClick={quickShare} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'16px', padding:'6px 14px', fontSize:'12px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Challenge a Friend</button>
        </div>
      </nav>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px', display:'grid', gridTemplateColumns:'1fr 260px', gap:'24px', alignItems:'start' }}>

        {/* Game area */}
        <div>
          <div style={{ textAlign:'center', marginBottom:'20px' }}>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', letterSpacing:'2px' }}>HIGHER OR LOWER?</div>
            <div style={{ fontSize:'12px', color:'#777672', marginTop:'4px' }}>Does the next topic have more or fewer combined YouTube views?</div>
          </div>

          {/* Previous card - revealed */}
          <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'16px', padding:'28px 24px', textAlign:'center', marginBottom:'16px' }}>
            <div style={{ fontSize:'11px', color:'#777672', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Current</div>
            <div style={{ fontSize:'48px', marginBottom:'10px' }}>{prev.emoji}</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'1px' }}>{prev.name}</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'36px', color:'#EF9F27', letterSpacing:'2px', marginTop:'8px' }}>{prev.views}</div>
            <div style={{ fontSize:'11px', color:'#777672', marginTop:'4px' }}>combined views</div>
          </div>

          {/* VS divider */}
          <div style={{ textAlign:'center', margin:'8px 0', fontFamily:'Bebas Neue, sans-serif', fontSize:'20px', color:'#555', letterSpacing:'2px' }}>VS</div>

          {/* Next card */}
          <div style={{ background: revealed ? (correct ? 'rgba(29,158,117,0.1)' : 'rgba(216,90,48,0.1)') : '#1a1a18', border: `1px solid ${revealed ? (correct ? '#1D9E75' : '#D85A30') : '#333331'}`, borderRadius:'16px', padding:'28px 24px', textAlign:'center', marginBottom:'20px', transition:'all 0.3s' }}>
            <div style={{ fontSize:'11px', color:'#777672', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Next up</div>
            <div style={{ fontSize:'48px', marginBottom:'10px' }}>{next.emoji}</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'1px' }}>{next.name}</div>
            {revealed ? (
              <>
                <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'36px', color: correct ? '#1D9E75' : '#D85A30', letterSpacing:'2px', marginTop:'8px' }}>{next.views}</div>
                <div style={{ fontSize:'14px', fontWeight:'600', color: correct ? '#1D9E75' : '#D85A30', marginTop:'8px' }}>
                  {correct ? '✓ Correct! 🔥' : '✗ Wrong!'}
                </div>
              </>
            ) : (
              <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'36px', color:'#444', letterSpacing:'2px', marginTop:'8px' }}>???</div>
            )}
          </div>

          {/* Buttons */}
          {!revealed ? (
            <div style={{ display:'flex', gap:'14px' }}>
              <button onClick={() => handleGuess('higher')} style={{ flex:1, background:'rgba(29,158,117,0.15)', border:'2px solid #1D9E75', color:'#1D9E75', borderRadius:'16px', padding:'16px', fontSize:'18px', fontWeight:'700', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                📈 Higher
              </button>
              <button onClick={() => handleGuess('lower')} style={{ flex:1, background:'rgba(216,90,48,0.15)', border:'2px solid #D85A30', color:'#D85A30', borderRadius:'16px', padding:'16px', fontSize:'18px', fontWeight:'700', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                📉 Lower
              </button>
            </div>
          ) : correct ? (
            <button onClick={handleNext} style={{ width:'100%', background:'#1D9E75', color:'#fff', border:'none', borderRadius:'16px', padding:'16px', fontSize:'16px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Next →
            </button>
          ) : null}
        </div>

        {/* Leaderboard sidebar */}
        <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'14px', padding:'16px', position:'sticky', top:'16px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'16px', letterSpacing:'2px', color:'#EF9F27', marginBottom:'14px', textAlign:'center' }}>🏆 TOP STREAKS</div>
          {leaderboard.length === 0 ? (
            <div style={{ color:'#555', fontSize:'12px', textAlign:'center', padding:'20px 0' }}>No scores yet!<br/>Be the first 🐇</div>
          ) : (
            leaderboard.slice(0,20).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i < leaderboard.length-1 ? '1px solid #222' : 'none', fontSize:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ fontWeight:'700', color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#555', width:'18px' }}>#{i+1}</span>
                  <span>{e.name}</span>
                </div>
                <span style={{ color:'#EF9F27', fontWeight:'600' }}>🔥 {e.score}</span>
              </div>
            ))
          )}
          <button onClick={quickShare} style={{ marginTop:'14px', width:'100%', background:'transparent', color:'#1D9E75', border:'1px solid #1D9E75', borderRadius:'16px', padding:'8px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            📤 Challenge a Friend
          </button>
        </div>
      </div>
    </div>
  );
}
