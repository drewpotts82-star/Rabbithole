import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import destinations from '../data/destinations';

function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const canvas = document.getElementById('flag-confetti');
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
  return <canvas id="flag-confetti" style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:999 }} />;
}

// Country flags mapped to destinations
const FLAG_DATA = [
  { slug:'bali', flag:'🇮🇩', country:'Indonesia', hint:'This archipelago nation has over 17,000 islands' },
  { slug:'tokyo', flag:'🇯🇵', country:'Japan', hint:'Land of the Rising Sun' },
  { slug:'paris', flag:'🇫🇷', country:'France', hint:'Home of the Eiffel Tower' },
  { slug:'new-york', flag:'🇺🇸', country:'USA', hint:'Stars and Stripes forever' },
  { slug:'london', flag:'🇬🇧', country:'UK', hint:'Union Jack flies here' },
  { slug:'sydney', flag:'🇦🇺', country:'Australia', hint:'Southern Cross constellation on this flag' },
  { slug:'barcelona', flag:'🇪🇸', country:'Spain', hint:'Ole! Red and yellow stripes' },
  { slug:'amsterdam', flag:'🇳🇱', country:'Netherlands', hint:'Red, white and blue horizontal stripes' },
  { slug:'dubai', flag:'🇦🇪', country:'UAE', hint:'Green, white, black and red' },
  { slug:'singapore', flag:'🇸🇬', country:'Singapore', hint:'Crescent moon and five stars' },
  { slug:'bangkok', flag:'🇹🇭', country:'Thailand', hint:'Red, white and blue stripes — Land of Smiles' },
  { slug:'istanbul', flag:'🇹🇷', country:'Turkey', hint:'Crescent moon and star on red' },
  { slug:'rome', flag:'🇮🇹', country:'Italy', hint:'Green, white and red vertical stripes' },
  { slug:'prague', flag:'🇨🇿', country:'Czech Republic', hint:'Blue triangle on white and red' },
  { slug:'vienna', flag:'🇦🇹', country:'Austria', hint:'Simple red-white-red horizontal bands' },
  { slug:'lisbon', flag:'🇵🇹', country:'Portugal', hint:'Green and red with an armillary sphere' },
  { slug:'athens', flag:'🇬🇷', country:'Greece', hint:'Blue and white stripes with a cross' },
  { slug:'cairo', flag:'🇪🇬', country:'Egypt', hint:'Eagle of Saladin on red, white and black' },
  { slug:'cape-town', flag:'🇿🇦', country:'South Africa', hint:'Rainbow nation — six colours' },
  { slug:'marrakech', flag:'🇲🇦', country:'Morocco', hint:'Green star on red background' },
  { slug:'iceland', flag:'🇮🇸', country:'Iceland', hint:'Red cross outlined in white on blue' },
  { slug:'norway', flag:'🇳🇴', country:'Norway', hint:'Blue cross outlined in white on red' },
  { slug:'maldives', flag:'🇲🇻', country:'Maldives', hint:'Green rectangle with white crescent on red' },
  { slug:'phuket', flag:'🇹🇭', country:'Thailand', hint:'Red, white and blue — Land of Smiles' },
  { slug:'kyoto', flag:'🇯🇵', country:'Japan', hint:'Red circle on white — Rising Sun' },
  { slug:'rio-de-janeiro', flag:'🇧🇷', country:'Brazil', hint:'Green and yellow with blue globe' },
  { slug:'buenos-aires', flag:'🇦🇷', country:'Argentina', hint:'Light blue and white stripes with sun' },
  { slug:'mexico-city', flag:'🇲🇽', country:'Mexico', hint:'Green, white, red with eagle and snake' },
  { slug:'toronto', flag:'🇨🇦', country:'Canada', hint:'Red maple leaf on white' },
  { slug:'vancouver', flag:'🇨🇦', country:'Canada', hint:'Red maple leaf — True North' },
  { slug:'new-zealand', flag:'🇳🇿', country:'New Zealand', hint:'Union Jack and Southern Cross on blue' },
  { slug:'queenstown-nz', flag:'🇳🇿', country:'New Zealand', hint:'Southern Cross stars on dark blue' },
  { slug:'delhi', flag:'🇮🇳', country:'India', hint:'Saffron, white and green with Ashoka Chakra' },
  { slug:'mumbai', flag:'🇮🇳', country:'India', hint:'The wheel of law on tricolour' },
  { slug:'beijing', flag:'🇨🇳', country:'China', hint:'Red with yellow stars' },
  { slug:'hong-kong', flag:'🇭🇰', country:'Hong Kong', hint:'White bauhinia flower on red' },
  { slug:'seoul', flag:'🇰🇷', country:'South Korea', hint:'Taegukgi — red, blue and black on white' },
  { slug:'kuala-lumpur', flag:'🇲🇾', country:'Malaysia', hint:'Stripes and crescent — Tiger nation' },
  { slug:'vietnam', flag:'🇻🇳', country:'Vietnam', hint:'Yellow star on red' },
  { slug:'colombo', flag:'🇱🇰', country:'Sri Lanka', hint:'Lion holding a sword on maroon' },
  { slug:'bora-bora', flag:'🇵🇫', country:'French Polynesia', hint:'Tricolour with traditional canoe motif' },
  { slug:'cook-islands', flag:'🇨🇰', country:'Cook Islands', hint:'Union Jack with 15 stars on blue' },
  { slug:'tulum', flag:'🇲🇽', country:'Mexico', hint:'Eagle devouring a snake — Aztec symbol' },
  { slug:'miami', flag:'🇺🇸', country:'USA', hint:'50 stars and 13 stripes' },
  { slug:'los-angeles', flag:'🇺🇸', country:'USA', hint:'Old Glory — red white and blue' },
  { slug:'scottish-highlands', flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', country:'Scotland', hint:'White diagonal cross on blue — St Andrews Cross' },
  { slug:'dublin', flag:'🇮🇪', country:'Ireland', hint:'Green, white and orange vertical stripes' },
  { slug:'budapest', flag:'🇭🇺', country:'Hungary', hint:'Red, white and green horizontal stripes' },
  { slug:'porto', flag:'🇵🇹', country:'Portugal', hint:'Green and red with coat of arms' },
  { slug:'lisbon-sintra', flag:'🇵🇹', country:'Portugal', hint:'Green and red — oldest European nation' },
];

function buildRound(pool, usedSlugs) {
  const available = pool.filter(d => !usedSlugs.has(d.slug));
  if (available.length < 4) return null;
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const correct = shuffled[0];
  const wrong = shuffled.slice(1, 4);
  const options = [...wrong, correct].sort(() => 0.5 - Math.random());
  return { correct, options };
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

export default function FlagGame() {
  const [pool, setPool] = useState([]);
  const [round, setRound] = useState(null);
  const [usedSlugs, setUsedSlugs] = useState(new Set());
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [chosen, setChosen] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const TOTAL = 15;

  useEffect(() => {
    // Match FLAG_DATA with actual destinations
    const matched = FLAG_DATA.filter(f =>
      destinations.find(d => d.slug === f.slug)
    ).map(f => ({
      ...f,
      ...destinations.find(d => d.slug === f.slug)
    }));
    setPool(matched);
    const firstRound = buildRound(matched, new Set());
    setRound(firstRound);

    fetch('/api/leaderboard?game=flag')
      .then(r => r.json())
      .then(d => { if (d.leaderboard) setLeaderboard(d.leaderboard); })
      .catch(() => {});
  }, []);

  const handleAnswer = (option) => {
    if (answered) return;
    setChosen(option.slug);
    setAnswered(true);
    const isCorrect = option.slug === round.correct.slug;
    if (isCorrect) {
      setScore(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100);
    }
  };

  const handleNext = () => {
    if (questionNum >= TOTAL) {
      setGameOver(true);
      return;
    }
    const newUsed = new Set([...usedSlugs, round.correct.slug]);
    setUsedSlugs(newUsed);
    const nextRound = buildRound(pool, newUsed);
    if (!nextRound) { setGameOver(true); return; }
    setRound(nextRound);
    setChosen(null);
    setAnswered(false);
    setQuestionNum(q => q + 1);
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    try {
      await fetch('/api/leaderboard?game=flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName.trim(), score, total: TOTAL })
      });
      const r = await fetch('/api/leaderboard?game=flag');
      const d = await r.json();
      if (d.leaderboard) setLeaderboard(d.leaderboard);
    } catch(e) {}
    setSubmitted(true);
  };

  const shareScore = () => {
    const text = `I scored ${score}/${TOTAL} on RabbitHole's Flag Game! 🌍🐇 Can you beat me? rabbitholevideo.com/flag-game`;
    if (navigator.share) navigator.share({ title: 'RabbitHole Flag Game', text });
    else { navigator.clipboard.writeText(text); alert('Copied! Share with friends 🐇'); }
  };

  const quickShare = () => {
    const text = `Testing my travel knowledge on RabbitHole 🌍 Can you beat me? rabbitholevideo.com/flag-game`;
    if (navigator.share) navigator.share({ title: 'RabbitHole', text });
    else { navigator.clipboard.writeText('rabbitholevideo.com/flag-game'); alert('Link copied! 🐇'); }
  };

  if (!round) return (
    <div style={{ background:'#111110', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      Loading...
    </div>
  );

  if (gameOver) {
    const pct = Math.round((score / TOTAL) * 100);
    const medal = score >= 13 ? '🥇' : score >= 10 ? '🥈' : score >= 7 ? '🥉' : '🌍';
    return (
      <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center' }}>
        <Confetti active={true} />
        <Head><title>Flag Game — RabbitHole</title></Head>
        <div style={{ fontSize:'64px' }}>{medal}</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', color:'#EF9F27', letterSpacing:'2px' }}>GAME OVER!</div>
        <div style={{ fontSize:'22px', margin:'12px 0' }}>
          You scored <strong style={{ color:'#1D9E75', fontSize:'32px' }}>{score}</strong> / {TOTAL}
        </div>
        <div style={{ fontSize:'14px', color:'#777672', marginBottom:'20px' }}>
          {pct >= 87 ? '🌍 Travel genius!' : pct >= 67 ? '✈️ Seasoned traveller!' : pct >= 47 ? '🗺️ Getting there!' : '📚 Time to travel more!'}
        </div>

        {!submitted ? (
          <div style={{ margin:'16px 0', width:'100%', maxWidth:'300px' }}>
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
        ) : <div style={{ color:'#1D9E75', margin:'12px 0' }}>✓ Score submitted!</div>}

        {leaderboard.length > 0 && (
          <div style={{ width:'100%', maxWidth:'320px', background:'#1a1a18', border:'1px solid #333331', borderRadius:'12px', padding:'16px', margin:'12px 0', textAlign:'left' }}>
            <div style={{ fontSize:'13px', fontWeight:'600', color:'#EF9F27', marginBottom:'10px', textAlign:'center' }}>🏆 GLOBAL LEADERBOARD</div>
            {leaderboard.slice(0,10).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i < 9 ? '1px solid #222' : 'none', fontSize:'13px' }}>
                <span style={{ color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#777672' }}>#{i+1} {e.name}</span>
                <span style={{ color:'#1D9E75' }}>{e.score}/{TOTAL}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginTop:'16px' }}>
          <button onClick={() => setShowShare(true)} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Share My Score</button>
          <button onClick={() => window.location.reload()} style={{ background:'transparent', color:'#f0efe9', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>🔄 Play Again</button>
          <Link href="/play" style={{ background:'transparent', color:'#EF9F27', border:'1px solid #EF9F27', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', textDecoration:'none' }}>🎮 All Games</Link>
          <Link href="/" style={{ background:'transparent', color:'#777672', border:'1px solid #333331', borderRadius:'20px', padding:'12px 24px', fontSize:'14px', textDecoration:'none' }}>🏠 Home</Link>
        </div>
      </div>
    );
  }

  const progress = ((questionNum - 1) / TOTAL) * 100;

  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Confetti active={confetti} />
      <Head>
        <title>Flag Game — RabbitHole Travel</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'8px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'12px', alignItems:'center', fontSize:'13px' }}>
          <span>Score: <strong style={{ color:'#1D9E75' }}>{score}</strong>/{questionNum - 1}</span>
          <span style={{ color:'#777672' }}>{questionNum}/{TOTAL}</span>
          <button onClick={quickShare} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'16px', padding:'6px 14px', fontSize:'12px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Challenge a Friend</button>
        </div>
      </nav>

      <div style={{ height:'3px', background:'#222' }}>
        <div style={{ height:'100%', width:`${progress}%`, background:'#EF9F27', transition:'width 0.3s' }} />
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px', display:'grid', gridTemplateColumns:'1fr 260px', gap:'24px', alignItems:'start' }}>

        {/* Game */}
        <div>
          <div style={{ textAlign:'center', marginBottom:'28px' }}>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', letterSpacing:'2px' }}>🌍 FLAG TO DESTINATION</div>
            <div style={{ fontSize:'12px', color:'#777672', marginTop:'4px' }}>Which destination does this flag belong to?</div>
          </div>

          {/* Flag display */}
          <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'16px', padding:'40px 24px', textAlign:'center', marginBottom:'24px' }}>
            <div style={{ fontSize:'120px', lineHeight:1, marginBottom:'16px' }}>{round.correct.flag}</div>
            <div style={{ fontSize:'13px', color:'#555', fontStyle:'italic' }}>"{round.correct.hint}"</div>
          </div>

          {/* Options */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
            {round.options.map((option) => {
              const isChosen = chosen === option.slug;
              const isCorrect = option.slug === round.correct.slug;
              let bg = '#1a1a18', border = '1px solid #333331', color = '#f0efe9';
              if (answered) {
                if (isCorrect) { bg = 'rgba(29,158,117,0.2)'; border = '2px solid #1D9E75'; color = '#1D9E75'; }
                else if (isChosen) { bg = 'rgba(216,90,48,0.2)'; border = '2px solid #D85A30'; color = '#D85A30'; }
              }
              return (
                <button
                  key={option.slug}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  style={{ background:bg, border, borderRadius:'12px', padding:'16px', cursor:answered?'default':'pointer', textAlign:'left', transition:'all 0.2s', fontFamily:'DM Sans, sans-serif' }}
                >
                  <div style={{ fontSize:'28px', marginBottom:'6px' }}>{option.emoji}</div>
                  <div style={{ fontSize:'15px', fontWeight:'600', color }}>{option.name}</div>
                  <div style={{ fontSize:'11px', color:'#777672', marginTop:'2px' }}>{option.country}</div>
                  {answered && isCorrect && <div style={{ fontSize:'11px', color:'#1D9E75', marginTop:'4px' }}>✓ Correct!</div>}
                  {answered && isChosen && !isCorrect && <div style={{ fontSize:'11px', color:'#D85A30', marginTop:'4px' }}>✗ Wrong!</div>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'18px', fontWeight:'600', marginBottom:'14px', color: chosen === round.correct.slug ? '#1D9E75' : '#D85A30' }}>
                {chosen === round.correct.slug ? '✓ Correct! Well travelled! 🌍' : `✗ It was ${round.correct.name}, ${round.correct.country}`}
              </div>
              {chosen === round.correct.slug && (
                <div style={{ fontSize:'13px', color:'#777672', marginBottom:'14px' }}>
                  Explore the most viewed {round.correct.name} videos →{' '}
                  <Link href={`/destination/${round.correct.slug}`} style={{ color:'#1D9E75' }}>rabbitholevideo.com/destination/{round.correct.slug}</Link>
                </div>
              )}
              <button onClick={handleNext} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 28px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                {questionNum >= TOTAL ? 'See Results 🏆' : 'Next Flag →'}
              </button>
            </div>
          )}

          {!answered && (
            <div style={{ textAlign:'center', color:'#555', fontSize:'13px' }}>👆 Tap the correct destination</div>
          )}
        </div>

        {/* Leaderboard */}
        <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'14px', padding:'16px', position:'sticky', top:'16px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'16px', letterSpacing:'2px', color:'#EF9F27', marginBottom:'14px', textAlign:'center' }}>🏆 TOP TRAVELLERS</div>
          {leaderboard.length === 0 ? (
            <div style={{ color:'#555', fontSize:'12px', textAlign:'center', padding:'20px 0' }}>No scores yet!<br/>Be the first 🌍</div>
          ) : (
            leaderboard.slice(0,20).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i < leaderboard.length-1 ? '1px solid #222' : 'none', fontSize:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ fontWeight:'700', color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#555', width:'18px' }}>#{i+1}</span>
                  <span>{e.name}</span>
                </div>
                <span style={{ color:'#1D9E75', fontWeight:'600' }}>{e.score}/15</span>
              </div>
            ))
          )}
          <button onClick={quickShare} style={{ marginTop:'14px', width:'100%', background:'transparent', color:'#EF9F27', border:'1px solid #EF9F27', borderRadius:'16px', padding:'8px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            📤 Challenge a Friend
          </button>
        </div>
      </div>
    </div>
  );
}
