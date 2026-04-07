import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const canvas = document.getElementById('lang-confetti');
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
  return <canvas id="lang-confetti" style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:999 }} />;
}

const ALL_WORDS = [
  { word:'Hygge', lang:'Danish', flag:'🇩🇰', correct:'The cosy feeling of warmth, comfort and togetherness', options:['A type of Danish pastry','The cosy feeling of warmth, comfort and togetherness','A Scandinavian winter festival','A traditional Danish greeting'], fact:'Hygge is so central to Danish culture it was shortlisted for the Oxford word of the year in 2016.' },
  { word:'Schadenfreude', lang:'German', flag:'🇩🇪', correct:'Pleasure derived from someone else\'s misfortune', options:['A feeling of deep embarrassment','Pleasure derived from someone else\'s misfortune','The joy of unexpected good news','Guilt after eating too much'], fact:'Germans have a word for everything. Schadenfreude literally means "harm-joy".' },
  { word:'Saudade', lang:'Portuguese', flag:'🇵🇹', correct:'A deep longing for something or someone you love that is gone', options:['A type of Brazilian dance','Excitement about future travel','A deep longing for something or someone you love that is gone','The smell of rain on hot pavement'], fact:'Saudade is considered untranslatable — it\'s a core emotion in Portuguese and Brazilian culture.' },
  { word:'Wanderlust', lang:'German', flag:'🇩🇪', correct:'A strong desire to travel and explore the world', options:['Fear of getting lost','A strong desire to travel and explore the world','Homesickness while travelling','The wonder of new places'], fact:'Wanderlust is now used globally in English — one of the most successful German exports.' },
  { word:'Lagom', lang:'Swedish', flag:'🇸🇪', correct:'Not too much, not too little — just the right amount', options:['A Swedish holiday tradition','The concept of slowing down','Not too much, not too little — just the right amount','A feeling of contentment after hard work'], fact:'Lagom is considered the Swedish secret to happiness and work-life balance.' },
  { word:'Meraki', lang:'Greek', flag:'🇬🇷', correct:'Doing something with soul, creativity and love', options:['A Greek island celebration','The feeling after swimming in the sea','Doing something with soul, creativity and love','Pride in Greek heritage'], fact:'Meraki is what happens when you leave a piece of yourself in your work.' },
  { word:'Fernweh', lang:'German', flag:'🇩🇪', correct:'A longing for far-off places you\'ve never been', options:['Homesickness while abroad','A longing for far-off places you\'ve never been','The joy of returning home','Fear of flying'], fact:'Different from wanderlust — Fernweh is specifically about craving places you\'ve never visited.' },
  { word:'Mamihlapinatapai', lang:'Yaghan', flag:'🇦🇷', correct:'A look shared between two people both wishing the other would act first', options:['A tribal celebration dance','A look shared between two people both wishing the other would act first','The feeling of being understood without words','A shared meal between strangers'], fact:'From the nearly extinct Yaghan language of Tierra del Fuego — considered one of the hardest words to translate.' },
  { word:'Forelsket', lang:'Norwegian', flag:'🇳🇴', correct:'The euphoria of falling in love for the first time', options:['A Norwegian winter tradition','Sadness at the end of summer','The euphoria of falling in love for the first time','A feeling of peaceful solitude'], fact:'Norwegian captures this specific moment that English needs an entire sentence to describe.' },
  { word:'Hiraeth', lang:'Welsh', flag:'🏴󠁧󠁢󠁷󠁬󠁳󠁿', correct:'A homesickness for a home you can\'t return to or never had', options:['Pride in Welsh heritage','A homesickness for a home you can\'t return to or never had','The beauty of the Welsh countryside','A longing for simpler times'], fact:'Hiraeth is considered one of the most beautiful and untranslatable words in any language.' },
  { word:'Sobremesa', lang:'Spanish', flag:'🇪🇸', correct:'Time spent talking after a meal while still at the table', options:['An afternoon nap after lunch','Time spent talking after a meal while still at the table','A second helping of dessert','The tradition of long Sunday lunches'], fact:'In Spain, sobremesa can last hours — it\'s considered the best part of the meal.' },
  { word:'Gezellig', lang:'Dutch', flag:'🇳🇱', correct:'A warm, convivial atmosphere with good company', options:['A Dutch cycling tradition','A warm, convivial atmosphere with good company','The satisfaction of hard work','A cosy café setting'], fact:'Gezellig is the Dutch answer to hygge — central to Dutch social life.' },
  { word:'Dépaysement', lang:'French', flag:'🇫🇷', correct:'The feeling of being a foreigner or fish out of water', options:['The excitement of arriving in Paris','The feeling of being a foreigner or fish out of water','Nostalgia for French cuisine abroad','The joy of speaking a new language'], fact:'Uniquely French — it can be positive or negative depending on context.' },
  { word:'Wabi-Sabi', lang:'Japanese', flag:'🇯🇵', correct:'Finding beauty in imperfection and impermanence', options:['A traditional Japanese tea ceremony','A type of Japanese cuisine','Finding beauty in imperfection and impermanence','The art of Japanese minimalism'], fact:'Wabi-sabi is central to Japanese aesthetics — the crack in the pottery makes it more beautiful.' },
  { word:'Ikigai', lang:'Japanese', flag:'🇯🇵', correct:'Your reason for being — what makes life worth living', options:['A Japanese morning ritual','A type of meditation','Your reason for being — what makes life worth living','The joy of simple pleasures'], fact:'Finding your ikigai is believed to be the secret behind Okinawa\'s extraordinary number of centenarians.' },
  { word:'Ubuntu', lang:'Zulu', flag:'🇿🇦', correct:'I am because we are — humanity through others', options:['A South African celebration','A type of traditional music','I am because we are — humanity through others','The spirit of generosity'], fact:'Ubuntu is a Nguni Bantu philosophy that has influenced Nelson Mandela and global thinking on community.' },
  { word:'Tsundoku', lang:'Japanese', flag:'🇯🇵', correct:'Buying books and never reading them, letting them pile up', options:['The art of gift wrapping','A Japanese reading festival','Buying books and never reading them, letting them pile up','The joy of a well-organised bookshelf'], fact:'Most book lovers are guilty of tsundoku without knowing there\'s a word for it.' },
  { word:'Ausfahrt', lang:'German', flag:'🇩🇪', correct:'Exit (as in motorway exit)', options:['A German car brand','A type of sausage','Exit (as in motorway exit)','A farewell celebration'], fact:'One of the most laughed-at words by English speakers driving on German motorways.' },
  { word:'Toska', lang:'Russian', flag:'🇷🇺', correct:'A longing with nothing to long for — vague restlessness', options:['A Russian folk dance','A type of Russian tea','A longing with nothing to long for — vague restlessness','The feeling after a long Russian winter'], fact:'Vladimir Nabokov said no single word in English renders all the shades of toska.' },
  { word:'Gökotta', lang:'Swedish', flag:'🇸🇪', correct:'Waking up early to go outside and listen to birds sing', options:['A Swedish breakfast tradition','Waking up early to go outside and listen to birds sing','A midsummer celebration','The joy of the first snow'], fact:'Gökotta literally means "April fool\'s dawn" — it\'s a cherished Swedish nature ritual.' },
  { word:'Palegg', lang:'Norwegian', flag:'🇳🇴', correct:'Anything and everything you can put on a slice of bread', options:['A Norwegian fishing technique','Anything and everything you can put on a slice of bread','A type of Norwegian cheese','A traditional open sandwich'], fact:'Norwegians are so serious about their bread toppings they have a dedicated word for all of them.' },
  { word:'Jayus', lang:'Indonesian', flag:'🇮🇩', correct:'A joke so unfunny it becomes funny', options:['A type of Indonesian street food','A joke so unfunny it becomes funny','An awkward social situation','A children\'s game'], fact:'Indonesia gave the world a word for dad jokes before dad jokes were a thing.' },
  { word:'Kummerspeck', lang:'German', flag:'🇩🇪', correct:'Weight gained from emotional eating — literally grief bacon', options:['A type of smoked German sausage','A feeling of post-holiday sadness','Weight gained from emotional eating — literally grief bacon','Comfort food eaten in winter'], fact:'Kummerspeck literally translates as "grief bacon" — the Germans really do have a word for everything.' },
  { word:'Mamihlapinatapai', lang:'Yaghan', flag:'🇦🇷', correct:'A look shared between two people both wishing the other would act first', options:['A celebration feast','A look shared between two people both wishing the other would act first','The silence between old friends','A shared journey'], fact:'Listed in the Guinness Book of Records as the most succinct word.' },
  { word:'Cafuné', lang:'Brazilian Portuguese', flag:'🇧🇷', correct:'Tenderly running your fingers through someone\'s hair', options:['A Brazilian dance move','A type of coffee drink','Tenderly running your fingers through someone\'s hair','A warm embrace between friends'], fact:'Brazil has a word for one of the most intimate and comforting gestures between people.' },
  { word:'Shinrin-yoku', lang:'Japanese', flag:'🇯🇵', correct:'Forest bathing — the therapy of being in nature', options:['A Japanese hot spring ritual','Forest bathing — the therapy of being in nature','A type of Japanese meditation','The art of bonsai'], fact:'Japan officially prescribes shinrin-yoku as medicine — being in forests measurably reduces stress hormones.' },
  { word:'Friolero', lang:'Spanish', flag:'🇪🇸', correct:'A person who is always cold no matter how warm it is', options:['Someone who loves spicy food','A winter festival tradition','A person who is always cold no matter how warm it is','Someone who prefers cold climates'], fact:'Every group of friends has a friolero — now you have the word for them.' },
  { word:'Backpfeifengesicht', lang:'German', flag:'🇩🇪', correct:'A face badly in need of a slap', options:['A German comedy style','A face badly in need of a slap','A type of German mask','An unforgettable face'], fact:'Germans aren\'t afraid to tell it like it is — this word is extremely useful.' },
  { word:'Ya\'aburnee', lang:'Arabic', flag:'🇱🇧', correct:'May you bury me — I love you so much I hope I die first', options:['A traditional Arabic blessing','A farewell phrase','May you bury me — I love you so much I hope I die first','A prayer for long life'], fact:'One of the most beautiful expressions of love in any language — said to children and loved ones.' },
  { word:'Mangata', lang:'Swedish', flag:'🇸🇪', correct:'The glimmering road-like reflection of moonlight on water', options:['A Swedish coastal town','A type of Nordic light phenomenon','The glimmering road-like reflection of moonlight on water','The feeling of watching a sunset'], fact:'Swedes looked at the moon on water so often they needed their own word for it.' },
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

export default function LanguageGame() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const TOTAL = 10;

  useEffect(() => {
    const shuffled = [...ALL_WORDS].sort(() => 0.5 - Math.random()).slice(0, TOTAL);
    setQuestions(shuffled);
    fetch('/api/leaderboard?game=language')
      .then(r => r.json())
      .then(d => { if (d.leaderboard) setLeaderboard(d.leaderboard); })
      .catch(() => {});
  }, []);

  if (!questions.length) return (
    <div style={{ background:'#111110', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>Loading...</div>
  );

  const q = questions[current];

  const handleAnswer = (option) => {
    if (answered) return;
    setChosen(option);
    setAnswered(true);
    if (option === q.correct) {
      setScore(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 100);
    }
  };

  const handleNext = () => {
    if (current + 1 >= TOTAL) { setGameOver(true); return; }
    setCurrent(c => c + 1);
    setChosen(null);
    setAnswered(false);
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    try {
      await fetch('/api/leaderboard?game=language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName.trim(), score, total: TOTAL })
      });
      const r = await fetch('/api/leaderboard?game=language');
      const d = await r.json();
      if (d.leaderboard) setLeaderboard(d.leaderboard);
    } catch(e) {}
    setSubmitted(true);
  };

  const shareScore = () => {
    const text = `I scored ${score}/${TOTAL} on RabbitHole's Language game! 🗣️🐇 Can you beat me? rabbitholevideo.com/language-game`;
    if (navigator.share) navigator.share({ title: 'RabbitHole Language Game', text });
    else { navigator.clipboard.writeText(text); alert('Copied! Share with friends 🐇'); }
  };

  const quickShare = () => {
    if (navigator.share) navigator.share({ title: 'RabbitHole', text: 'Testing my language knowledge on RabbitHole 🗣️ rabbitholevideo.com/language-game' });
    else { navigator.clipboard.writeText('rabbitholevideo.com/language-game'); alert('Link copied! 🐇'); }
  };

  if (gameOver) {
    const pct = Math.round((score / TOTAL) * 100);
    const medal = score >= 9 ? '🥇' : score >= 7 ? '🥈' : score >= 5 ? '🥉' : '🗣️';
    const label = score >= 9 ? 'Linguistic genius!' : score >= 7 ? 'Well-travelled wordsmith!' : score >= 5 ? 'Getting there!' : 'Time to explore more!';
    return (
      <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center' }}>
        <Confetti active={true} />
        <Head><title>Language Game — RabbitHole</title></Head>
        <div style={{ fontSize:'64px' }}>{medal}</div>
        <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'48px', color:'#EF9F27', letterSpacing:'2px' }}>GAME OVER!</div>
        <div style={{ fontSize:'22px', margin:'12px 0' }}>
          You scored <strong style={{ color:'#1D9E75', fontSize:'32px' }}>{score}</strong> / {TOTAL}
        </div>
        <div style={{ fontSize:'14px', color:'#777672', marginBottom:'20px' }}>{label}</div>

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
        </div>
      </div>
    );
  }

  const progress = (current / TOTAL) * 100;

  return (
    <div style={{ background:'#111110', minHeight:'100vh', color:'#f0efe9', fontFamily:'DM Sans, sans-serif' }}>
      <Confetti active={confetti} />
      <Head>
        <title>Language Game — RabbitHole</title>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', background:'#1e1e1c', borderBottom:'1px solid #333331', flexWrap:'wrap', gap:'8px' }}>
        <Link href="/" style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'24px', letterSpacing:'2px', color:'#D85A30', textDecoration:'none' }}>RABBIT<span style={{ color:'#1D9E75' }}>HOLE</span></Link>
        <div style={{ display:'flex', gap:'12px', alignItems:'center', fontSize:'13px' }}>
          <span>Score: <strong style={{ color:'#1D9E75' }}>{score}</strong>/{current}</span>
          <span style={{ color:'#777672' }}>{current + 1}/{TOTAL}</span>
          <button onClick={quickShare} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'16px', padding:'6px 14px', fontSize:'12px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>📤 Challenge a Friend</button>
        </div>
      </nav>

      <div style={{ height:'3px', background:'#222' }}>
        <div style={{ height:'100%', width:`${progress}%`, background:'#1D9E75', transition:'width 0.3s' }} />
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'24px', display:'grid', gridTemplateColumns:'1fr 260px', gap:'24px', alignItems:'start' }}>

        {/* Game */}
        <div>
          <div style={{ textAlign:'center', marginBottom:'24px' }}>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'28px', letterSpacing:'2px' }}>🗣️ WHAT DOES THIS MEAN?</div>
            <div style={{ fontSize:'12px', color:'#777672', marginTop:'4px' }}>Untranslatable words from around the world</div>
          </div>

          {/* Word card */}
          <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'16px', padding:'40px 24px', textAlign:'center', marginBottom:'24px' }}>
            <div style={{ fontSize:'48px', marginBottom:'12px' }}>{q.flag}</div>
            <div style={{ fontSize:'11px', color:'#777672', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>{q.lang}</div>
            <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'52px', letterSpacing:'3px', color:'#EF9F27', lineHeight:1 }}>{q.word}</div>
            <div style={{ fontSize:'13px', color:'#555', marginTop:'12px', fontStyle:'italic' }}>What does this word mean?</div>

            {answered && (
              <div style={{ marginTop:'20px', padding:'16px', background:'rgba(29,158,117,0.1)', border:'1px solid #1D9E75', borderRadius:'10px', textAlign:'left' }}>
                <div style={{ fontSize:'11px', color:'#1D9E75', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px' }}>Fun fact</div>
                <div style={{ fontSize:'13px', color:'#f0efe9', lineHeight:1.5 }}>{q.fact}</div>
              </div>
            )}
          </div>

          {/* Options */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'20px' }}>
            {q.options.map((option, i) => {
              const isChosen = chosen === option;
              const isCorrect = option === q.correct;
              let bg = '#1a1a18', border = '1px solid #333331', color = '#f0efe9';
              if (answered) {
                if (isCorrect) { bg = 'rgba(29,158,117,0.15)'; border = '2px solid #1D9E75'; color = '#1D9E75'; }
                else if (isChosen) { bg = 'rgba(216,90,48,0.15)'; border = '2px solid #D85A30'; color = '#D85A30'; }
              } else if (isChosen) {
                bg = 'rgba(29,158,117,0.1)'; border = '2px solid #1D9E75';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  style={{ background:bg, border, borderRadius:'12px', padding:'14px 18px', cursor:answered?'default':'pointer', textAlign:'left', transition:'all 0.2s', fontFamily:'DM Sans, sans-serif', color, fontSize:'14px', lineHeight:1.4 }}
                >
                  <span style={{ color:'#555', marginRight:'10px', fontWeight:'600' }}>{String.fromCharCode(65+i)}.</span>
                  {option}
                  {answered && isCorrect && <span style={{ float:'right', color:'#1D9E75' }}>✓</span>}
                  {answered && isChosen && !isCorrect && <span style={{ float:'right', color:'#D85A30' }}>✗</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'18px', fontWeight:'600', marginBottom:'14px', color: chosen === q.correct ? '#1D9E75' : '#D85A30' }}>
                {chosen === q.correct ? '✓ Correct! 🎉' : `✗ The answer was: "${q.correct}"`}
              </div>
              <button onClick={handleNext} style={{ background:'#1D9E75', color:'#fff', border:'none', borderRadius:'20px', padding:'12px 28px', fontSize:'14px', fontWeight:'500', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                {current + 1 >= TOTAL ? 'See Results 🏆' : 'Next Word →'}
              </button>
            </div>
          )}

          {!answered && (
            <div style={{ textAlign:'center', color:'#555', fontSize:'13px' }}>👆 Pick the correct meaning</div>
          )}
        </div>

        {/* Leaderboard */}
        <div style={{ background:'#1a1a18', border:'1px solid #333331', borderRadius:'14px', padding:'16px', position:'sticky', top:'16px' }}>
          <div style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'16px', letterSpacing:'2px', color:'#EF9F27', marginBottom:'14px', textAlign:'center' }}>🏆 WORD MASTERS</div>
          {leaderboard.length === 0 ? (
            <div style={{ color:'#555', fontSize:'12px', textAlign:'center', padding:'20px 0' }}>No scores yet!<br/>Be the first 🗣️</div>
          ) : (
            leaderboard.slice(0,20).map((e, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i < leaderboard.length-1 ? '1px solid #222' : 'none', fontSize:'12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ fontWeight:'700', color: i===0?'#EF9F27':i===1?'#B4B2A9':i===2?'#D85A30':'#555', width:'18px' }}>#{i+1}</span>
                  <span>{e.name}</span>
                </div>
                <span style={{ color:'#1D9E75', fontWeight:'600' }}>{e.score}/10</span>
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
