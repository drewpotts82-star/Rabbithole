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

function displayViews(n) {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + 'B';
  if (n >= 1000000) return (n / 1000000).toFixed(0) + 'M';
  return n.toString();
}

function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const canvas = document.getElementById('confetti-canvas');
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
  return <canvas id="confetti-canvas" style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:999 }} />;
}

const LEVELS = [
  { label: '100M', value: 100000000 },
  { label: '250M', value: 250000000 },
  { label: '500M', value: 500000000 },
  { label: '750M', value: 750000000 },
  { label: '1B', value: 1000000000 },
  { label: '2B', value: 2000000000 },
  { label: '3B', value: 3000000000 },
  { label: '5B', value: 5000000000 },
  { label: '7B', value: 7000000000 },
  { label: '10B+', value: 10000000000 },
];



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

export default function GuessGame() {
  const [shuffled, setShuffled] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState(4);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    setShuffled([...topics].sort(() => 0.5 - Math.random()).slice(0, 10));
    fetch('/api/leaderboard?game=guess')
      .then(r => r.json())
      .then(d => { if (d.leaderboard) setLeaderboard(d.leaderboard); })
      .catch(() => {});
  }, []);

  if (!shuffled.length) return null;

  const topic = shuffled[current];
  const actual = formatViews(topic.views);
  const guessValue = LEVELS[guess].value;

  const getAccuracy = () => {
    const diff = Math.abs(actual - guessValue) / actual;
    if (diff <= 0.2) return { label: '🎯 Perfect!', points: 3, color: '#1D9E75' };
    if (diff <= 0.5) return { label: '🔥 Close!', points: 2, color: '#EF9F27' };
    if (diff <= 1.0) return { label: '😅 Not bad', points: 1, color: '#B4B2A9' };
    return { label: '😬 Way off!', points: 0, color: '#D85A30' };
  };

  const handleSubmit = () => {
    if (answered) return;
    const accuracy = getAccuracy();
    setAnswered(true);
    setScore(s => s + accuracy.points);
    setResults(r => [...r, { topic, guess: guessValue, actual, accuracy }]);
    if (accuracy.points >= 2) { setConfetti(true); setTimeout(() => setConfetti(false), 100); }
  };

  const handleNext = () => {
    setAnswered(false);
    setGuess(4);
    if (current + 1 >= shuffled.length) setGameOver(true);
    else setCurrent(c => c + 1);
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    try {
      await fetch('/api/leaderboard?game=guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName.trim(), score, total: 30 })
      });
      const r = await fetch('/api/leaderboard?game=guess');
      const d = await r.json();
      if (d.leaderboard) setLeaderboard(d.leaderboard);
    } catch(e) {}
    setSubmitted(true);
    setShowLeaderboard(true);
  };

  const shareScore = () => {
    const text = `I scored ${score}/30 on RabbitHole's "Guess The Views" game! 🐇 Can you beat me? rabbitholevideo.com/guess`;
    if (navigator.share) navigator.share({ title: 'RabbitHole', text });
    else { navigator.clipboard.writeText(text); alert('Copied! Share with friends 🐇'); }
  };

  if (gameOver) {
    const pct = Math.round((score / 30) * 100);
    const medal = score >= 25 ? '🥇' : score >= 18 ? '🥈' : score >= 10 ? '🥉' : '🐇';
    return (
      <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center' }}>
        <Confetti active={true} />
        <Head><title>Guess The Views — RabbitHole</title></Head>
        <div style={{ fontSize:'64px' }}>{medal}</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', color:'#EF9F27', letterSpacing:'2px', marginTop:'8px' }}>GAME OVER!</div>
        <div style={{ fontSize:'20px', margin:'12px 0' }}>Score: <strong style={{ color:'#1D9E75', fontSize:'32px' }}>{score}</strong> / 30</div>
        <div style={{ fontSize:'14px', color:'#777672', marginBottom:'24px' }}>Accuracy: {pct}%</div>
        <div style={{ width:'100%', maxWidth:'400px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', padding:'16px', marginBottom:'24px', textAlign:'left' }}>
          {results.map((r, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom: i < results.length-1 ? '1px solid #222' : 'none', fontSize:'13px' }}>
              <span>{r.topic.emoji} {r.topic.name}</span>
              <span style={{ color: r.accuracy.color }}>{r.accuracy.label} +{r.accuracy.points}</span>
            </div>
          ))}
        </div>
        {!submitted ? (
          <div style={{ margin:'16px 0', width:'100%', maxWidth:'320px' }}>
            <div style={{ fontSize:'13px', color:'#777672', marginBottom:'8px' }}>Enter your name for the leaderboard:</div>
            <input type="text" placeholder="Your name..." value={playerName} onChange={e => setPlayerName(e.target.value)} onKeyDown={e => e.key==='Enter' && submitScore()} style={{ width:'100%', background:'#1a1a18', border:'1px solid #333331', borderRadius:'10px', padding:'10px 14px', color:'#f0efe9', fontSize:'14px', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box' }} />
            <button onClick={submitScore} style={{ marginTop:'8px', width:'100%', background:'#EF9F27', color:'#111110', border:'none', borderRadius:'20px', padding:'11px', fontSize:'14px', fontWeight:'600', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>Submit to Leaderboard 🏆</button>
          </div>
        ) : <div style={{ color:'#1D9E75', margin:'8px 0', fontSize:'14px' }}>✓ Score submitted!</div>}
        {showLeaderboard && leaderboard.length > 0 && (
          <div style={{ width:'100%', maxWidth:'360px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', padding:'16px', margin:'8px 0', textAlign:'left' }}>
            <div style={{ fontSize:'13px', fontWeight:'600', color:'#EF9F27', marginBottom:'10px', textAlign:'center' }}>🏆 GLOBAL LEADERBOARD</div>
            {leaderboard.slice(0,10).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i < 9 ? '1px solid #222' : 'none', fontSize:'13px' }}>
                <span style={{ color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#777672' }}>#{i+1} {e.name}</span>
                <span style={{ color:'#1D9E75' }}>{e.score}/30</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
          <button onClick={() => setShowShare(true)} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Share My Score</button>
          <button onClick={() => window.location.reload()} style={{ background:'transparent', color:'#f0efe9', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>🔄 Play Again</button>
          <Link href="/game" style={{ background:'transparent', color:'#EF9F27', border:'1px solid #EF9F27', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', textDecoration:'none' }}>🎮 Other Game</Link>
        </div>
      </div>
    );
  }

  const accuracy = answered ? getAccuracy() : null;

  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Confetti active={confetti} />
      <Head>
        <title>Guess The Views — RabbitHole</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'16px', fontSize:'13px' }}>
          <span>Score: <strong style={{ color:'#1D9E75' }}>{score}</strong>/30</span>
          <span style={{ color:'#777672' }}>{current+1}/10</span>
        </div>
      </nav>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px', display:'grid', gridTemplateColumns:'1fr 240px', gap:'24px', alignItems:'start' }}>
        <div>
      <div style={{ height:'3px', background:'#222' }}>
        <div style={{ height:'100%', width:`${(current/10)*100}%`, background:'#EF9F27', transition:'width 0.3s' }} />
      </div>

      <div style={{ maxWidth:'520px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'26px', letterSpacing:'2px' }}>GUESS THE VIEWS</div>
          <div style={{ fontSize:'12px', color:'#777672', marginTop:'4px' }}>How many combined views do the top 10 {topic.name} videos have?</div>
        </div>

        <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'16px', padding:'32px 24px', textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>{topic.emoji}</div>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'32px', letterSpacing:'2px', color:'#f0efe9' }}>{topic.name}</div>
          <div style={{ fontSize:'13px', color:'#777672', marginTop:'6px' }}>Top 10 most viewed videos combined</div>
          {answered && (
            <div style={{ marginTop:'20px', padding:'16px', background:'rgba(0,0,0,0.3)', borderRadius:'10px' }}>
              <div style={{ fontSize:'13px', color:'#777672', marginBottom:'4px' }}>Actual views:</div>
              <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'42px', color:'#1D9E75', letterSpacing:'2px' }}>{topic.views}</div>
              <div style={{ fontSize:'18px', fontWeight:'600', color: accuracy.color, marginTop:'8px' }}>{accuracy.label} +{accuracy.points} pts</div>
            </div>
          )}
        </div>

        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
            <span style={{ fontSize:'13px', color:'#777672' }}>Your guess:</span>
            <span style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', color:'#EF9F27', letterSpacing:'1px' }}>{LEVELS[guess].label}</span>
          </div>
          <input
            type="range"
            min={0}
            max={9}
            value={guess}
            onChange={e => !answered && setGuess(Number(e.target.value))}
            disabled={answered}
            style={{ width:'100%', accentColor:'#EF9F27', cursor: answered ? 'default' : 'pointer' }}
          />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#555', marginTop:'4px' }}>
            <span>100M</span><span>250M</span><span>500M</span><span>750M</span><span>1B</span><span>2B</span><span>3B</span><span>5B</span><span>7B</span><span>10B+</span>
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          {!answered ? (
            <button onClick={handleSubmit} style={{ background:'#EF9F27', color:'#111110', border:'none', borderRadius:'20px', padding:'13px 36px', fontSize:'15px', fontWeight:'600', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Lock in my guess 🔒
            </button>
          ) : (
            <button onClick={handleNext} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'13px 36px', fontSize:'15px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              {current+1 >= shuffled.length ? 'See Results 🏆' : 'Next Topic →'}
            </button>
          )}
        
        </div>
        {/* Live Leaderboard Sidebar */}
        <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'14px', padding:'16px', position:'sticky', top:'16px', minWidth:'220px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'16px', letterSpacing:'2px', color:'#EF9F27', marginBottom:'14px', textAlign:'center' }}>🏆 TOP SCORES</div>
          {leaderboard.length === 0 ? (
            <div style={{ color:'#555', fontSize:'12px', textAlign:'center', padding:'20px 0' }}>No scores yet!<br/>Be the first 🐇</div>
          ) : (
            leaderboard.slice(0,20).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i < leaderboard.length-1 ? '1px solid #222' : 'none', fontSize:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ fontWeight:'700', color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#555', width:'18px' }}>#{i+1}</span>
                  <span style={{ color:'#f0efe9' }}>{e.name}</span>
                </div>
                <span style={{ color:'#1D9E75', fontWeight:'600' }}>{e.score}</span>
              </div>
            ))
          )}
          <Link href="/" style={{ display:'block', marginTop:'14px', textAlign:'center', fontSize:'12px', color:'#777672', textDecoration:'none', border:'1px solid #333331', borderRadius:'16px', padding:'8px' }}>🏠 Home</Link>
          <Link href="/play" style={{ display:'block', marginTop:'8px', textAlign:'center', fontSize:'12px', color:'#EF9F27', textDecoration:'none', border:'1px solid #EF9F27', borderRadius:'16px', padding:'8px' }}>🎮 All Games</Link>
        </div>
      </div></div>

        <div style={{ marginTop:'20px', display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap' }}>
          {[{l:'🎯 Perfect',p:'±20%',pts:3},{l:'🔥 Close',p:'±50%',pts:2},{l:'😅 Near',p:'±100%',pts:1},{l:'😬 Miss',p:'>100%',pts:0}].map(s => (
            <div key={s.l} style={{ fontSize:'11px', color:'#555', textAlign:'center', padding:'4px 8px', background:'#1a1a18', borderRadius:'8px' }}>
              {s.l} = {s.pts}pts
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
