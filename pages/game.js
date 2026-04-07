import { useState, useEffect, useRef } from 'react';
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
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 8 + 4,
      color: ['#EF9F27','#1D9E75','#D85A30','#f0efe9','#4CAF50'][Math.floor(Math.random()*5)],
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
    const t = setTimeout(() => cancelAnimationFrame(frame), 3000);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:999 }} />;
}

export default function Game() {
  const [pairs, setPairs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    const p = [];
    for (let i = 0; i < shuffled.length - 1; i += 2) p.push([shuffled[i], shuffled[i+1]]);
    setPairs(p);
    // Load leaderboard from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('rh_leaderboard') || '[]');
      setLeaderboard(saved);
    } catch(e) {}
  }, []);

  const submitScore = () => {
    if (!playerName.trim()) return;
    const entry = { name: playerName.trim(), score, total: current, date: new Date().toLocaleDateString() };
    const updated = [...leaderboard, entry].sort((a,b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updated);
    try { localStorage.setItem('rh_leaderboard', JSON.stringify(updated)); } catch(e) {}
    setSubmitted(true);
    setShowLeaderboard(true);
  };

  const shareScore = () => {
    const text = `I scored ${score}/${current} on RabbitHole's "Which Has More Views?" game! 🐇 Can you beat me? rabbitholevideo.com/game`;
    if (navigator.share) {
      navigator.share({ title: 'RabbitHole Game', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied! Share it with friends 🐇');
    }
  };

  if (!pairs.length) return null;

  if (gameOver || current >= pairs.length) {
    const pct = Math.round((score / current) * 100);
    return (
      <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center' }}>
        <Confetti active={true} />
        <Head><title>Game Over — RabbitHole</title></Head>
        <div style={{ fontSize:'64px', marginBottom:'8px' }}>🐇</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'52px', color:'#EF9F27', letterSpacing:'2px' }}>GAME OVER!</div>
        <div style={{ fontSize:'22px', margin:'12px 0' }}>
          You scored <strong style={{ color:'#1D9E75', fontSize:'32px' }}>{score}</strong> / {current}
        </div>
        <div style={{ fontSize:'15px', color:'#777672', marginBottom:'8px' }}>Accuracy: {pct}% · Best streak: 🔥 {bestStreak}</div>

        {!submitted ? (
          <div style={{ margin:'24px 0', width:'100%', maxWidth:'320px' }}>
            <div style={{ fontSize:'14px', color:'#777672', marginBottom:'8px' }}>Enter your name for the leaderboard:</div>
            <input
              type="text"
              placeholder="Your name..."
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitScore()}
              style={{ width:'100%', background:'#1a1a18', border:'1px solid #333331', borderRadius:'10px', padding:'10px 14px', color:'#f0efe9', fontSize:'15px', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box' }}
            />
            <button onClick={submitScore} style={{ marginTop:'10px', width:'100%', background:'#EF9F27', color:'#111110', border:'none', borderRadius:'20px', padding:'12px', fontSize:'15px', fontWeight:'600', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Submit to Leaderboard 🏆
            </button>
          </div>
        ) : (
          <div style={{ color:'#1D9E75', margin:'16px 0', fontSize:'15px' }}>✓ Score submitted!</div>
        )}

        {showLeaderboard && (
          <div style={{ width:'100%', maxWidth:'360px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', padding:'16px', margin:'16px 0', textAlign:'left' }}>
            <div style={{ fontSize:'14px', fontWeight:'600', color:'#EF9F27', marginBottom:'12px', textAlign:'center' }}>🏆 LEADERBOARD</div>
            {leaderboard.map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom: i < leaderboard.length-1 ? '1px solid #222' : 'none' }}>
                <span style={{ color: i===0?'#EF9F27': i===1?'#B4B2A9': i===2?'#D85A30':'#777672', fontWeight:'600' }}>#{i+1} {e.name}</span>
                <span style={{ color:'#1D9E75', fontWeight:'600' }}>{e.score}/{e.total}</span>
              </div>
            ))}
          </div>
        )}

        {!showLeaderboard && submitted && (
          <button onClick={() => setShowLeaderboard(true)} style={{ background:'transparent', color:'#EF9F27', border:'1px solid #EF9F27', borderRadius:'20px', padding:'10px 20px', fontSize:'13px', cursor:'pointer', fontFamily:'DM Sans, sans-serif', marginBottom:'12px' }}>
            🏆 View Leaderboard
          </button>
        )}

        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginTop:'16px' }}>
          <button onClick={shareScore} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            📤 Challenge a Friend
          </button>
          <button onClick={() => window.location.reload()} style={{ background:'transparent', color:'#f0efe9', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            🔄 Play Again
          </button>
          <Link href="/" style={{ background:'transparent', color:'#777672', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', textDecoration:'none' }}>
            Explore Topics
          </Link>
        </div>
      </div>
    );
  }

  const [a, b] = pairs[current];
  const aViews = formatViews(a.views);
  const bViews = formatViews(b.views);
  const correct = aViews > bViews ? 'a' : 'b';

  const handleChoice = (choice) => {
    if (answered) return;
    setChosen(choice);
    setAnswered(true);
    const isCorrect = choice === correct;
    if (isCorrect) {
      setScore(s => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100);
    } else {
      setStreak(0);
    }
  };

  const getCardStyle = (side) => {
    let bg = '#1a1a18', border = '1px solid #333331';
    if (answered) {
      if (side === correct) { bg = 'rgba(29,158,117,0.15)'; border = '2px solid #1D9E75'; }
      else if (side === chosen) { bg = 'rgba(216,90,48,0.15)'; border = '2px solid #D85A30'; }
    }
    return { background:bg, border, borderRadius:'16px', padding:'32px 20px', cursor:answered?'default':'pointer', transition:'all 0.3s', textAlign:'center', flex:1, minWidth:'130px' };
  };

  const progress = ((current) / pairs.length) * 100;

  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Confetti active={confetti} />
      <Head>
        <title>Which Has More Views? — RabbitHole Game</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'16px', fontSize:'13px', alignItems:'center' }}>
          <span>Score: <strong style={{ color:'#1D9E75' }}>{score}</strong></span>
          <span style={{ color:'#EF9F27' }}>🔥 {streak}</span>
          <span style={{ color:'#777672' }}>{current+1}/{pairs.length}</span>
        </div>
      </nav>

      <div style={{ height:'3px', background:'#222', position:'relative' }}>
        <div style={{ height:'100%', width:`${progress}%`, background:'#1D9E75', transition:'width 0.3s' }} />
      </div>

      <div style={{ maxWidth:'560px', margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', letterSpacing:'2px' }}>WHICH HAS MORE VIEWS?</div>
          <div style={{ fontSize:'12px', color:'#777672', marginTop:'4px' }}>Pick the topic with more combined YouTube views</div>
        </div>

        <div style={{ display:'flex', gap:'14px', marginBottom:'20px' }}>
          {[['a', a], ['b', b]].map(([side, topic]) => (
            <div key={side} style={getCardStyle(side)} onClick={() => handleChoice(side)}>
              <div style={{ fontSize:'44px', marginBottom:'10px' }}>{topic.emoji}</div>
              <div style={{ fontSize:'17px', fontWeight:'600', marginBottom:'6px' }}>{topic.name}</div>
              {answered && (
                <>
                  <div style={{ fontSize:'20px', fontWeight:'700', color: side===correct ? '#1D9E75' : '#555', marginTop:'8px' }}>{topic.views}</div>
                  <div style={{ fontSize:'11px', marginTop:'4px', color: side===correct ? '#1D9E75' : '#D85A30' }}>
                    {side===correct ? '✓ More views!' : chosen===side ? '✗ Wrong' : ''}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', minHeight:'60px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          {!answered && <div style={{ color:'#777672', fontSize:'13px' }}>👆 Tap to guess</div>}
          {answered && (
            <>
              <div style={{ fontSize:'18px', fontWeight:'600', color: chosen===correct ? '#1D9E75' : '#D85A30', marginBottom:'14px' }}>
                {chosen===correct ? `✓ Correct! 🔥 Streak: ${streak}` : '✗ Not quite!'}
              </div>
              <button onClick={() => { setAnswered(false); setChosen(null); if (current+1 >= pairs.length) setGameOver(true); else setCurrent(c => c+1); }}
                style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'11px 28px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                {current+1 >= pairs.length ? 'See Results 🏆' : 'Next →'}
              </button>
            </>
          )}
        </div>

        {streak >= 3 && !answered && (
          <div style={{ textAlign:'center', marginTop:'16px', fontSize:'13px', color:'#EF9F27' }}>
            🔥 {streak} in a row! Keep going!
          </div>
        )}
      </div>
    </div>
  );
}
